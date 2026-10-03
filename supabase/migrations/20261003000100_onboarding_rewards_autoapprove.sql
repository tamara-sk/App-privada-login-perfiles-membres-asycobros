-- Rewards: >250 words in EACH answer => 1 llavecita; more effort + AI quality => chance of the
-- "Amazing Intro" sigil. Auto-approval by AI level. All thresholds are data (no app rebuild).

alter table public.onboarding_levels add column if not exists auto_approve boolean not null default false;
update public.onboarding_levels set auto_approve = true where slug in ('circle-contributor','keeper-candidate');

create table if not exists public.onboarding_reward_config (
  id boolean primary key default true check (id),
  words_per_answer int not null default 250,        -- each answer must EXCEED this
  llavecitas_amount int not null default 1,
  min_depth_score int not null default 40,          -- AI depth_sincerity floor (anti-filler/paste)
  sigil_code text not null default 'amazing-intro',
  sigil_min_composite int not null default 60,      -- below this, no sigil roll
  sigil_base_chance numeric not null default 0.10,
  sigil_score_weight numeric not null default 0.50, -- added at composite=100
  sigil_words_weight numeric not null default 0.30, -- added when avg words reaches 2x threshold
  sigil_max_chance numeric not null default 0.90
);
insert into public.onboarding_reward_config default values on conflict do nothing;
alter table public.onboarding_reward_config enable row level security;
create policy "reward rules readable" on public.onboarding_reward_config for select using (true);

insert into public.sigils (id,name,description,icon,sort_order,grant_type,pillar,code)
values ('00000000-0000-0000-0001-000000000015','Amazing Intro',
        'Awarded for an exceptional, generous introduction to the circle.','sparkles',15,'automatic','contribution','amazing-intro')
on conflict do nothing;

alter table public.ai_evaluations add column if not exists reward jsonb;

create or replace function public.wc(t text) returns int language sql immutable as $$
  select coalesce(array_length(regexp_split_to_array(btrim(coalesce(t,'')), '\s+'), 1), 0) * (btrim(coalesce(t,'')) <> '')::int
$$;

-- Service-role only. Idempotent per user. Words are counted here, never trusted from the client.
create or replace function public.apply_onboarding_outcome(p_user uuid, p_eval uuid)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  r public.onboarding_responses; e public.ai_evaluations; c public.onboarding_reward_config; lv public.onboarding_levels;
  w1 int; w2 int; w3 int; avgw numeric; pid uuid; depth numeric;
  out jsonb := jsonb_build_object('llavecitas',0,'sigil',null,'approved',false,'words',null);
  chance numeric; roll numeric; sig uuid;
begin
  select * into r from onboarding_responses where user_id = p_user;
  select * into e from ai_evaluations where id = p_eval and user_id = p_user;
  select * into c from onboarding_reward_config limit 1;
  select * into lv from onboarding_levels where slug = e.level_slug;
  select id into pid from profiles where user_id = p_user;
  if r.user_id is null or e.id is null or pid is null then return out; end if;
  if e.reward is not null then return e.reward; end if;   -- already applied: never double-pay or re-roll

  w1 := wc(r.who_are_you); w2 := wc(r.bring_to_circle); w3 := wc(r.bring_to_environment);
  avgw := (w1+w2+w3)/3.0; depth := coalesce((e.scores->>'depth_sincerity')::numeric, 0);
  out := jsonb_set(out,'{words}', jsonb_build_object('who',w1,'circle',w2,'environment',w3));

  if w1 > c.words_per_answer and w2 > c.words_per_answer and w3 > c.words_per_answer and depth >= c.min_depth_score then
    insert into llavecitas_ledger(profile_id,amount,reason,reference_type,reference_id,metadata)
    values (pid, c.llavecitas_amount, 'contribution_reward', 'onboarding', p_eval,
            jsonb_build_object('source','onboarding','words',out->'words'));
    out := jsonb_set(out,'{llavecitas}', to_jsonb(c.llavecitas_amount));

    if e.composite_score >= c.sigil_min_composite then
      chance := least(c.sigil_max_chance, c.sigil_base_chance
                + c.sigil_score_weight * ((e.composite_score - c.sigil_min_composite)::numeric / greatest(100 - c.sigil_min_composite,1))
                + c.sigil_words_weight * least(1, greatest(0, (avgw - c.words_per_answer) / c.words_per_answer)));
      roll := random();
      out := out || jsonb_build_object('sigil_chance', round(chance,3));
      select id into sig from sigils where code = c.sigil_code;
      if roll < chance and sig is not null then
        insert into member_sigils(profile_id,sigil_id,grant_type) values (pid,sig,'automatic') on conflict do nothing;
        out := jsonb_set(out,'{sigil}', to_jsonb(c.sigil_code));
      end if;
    end if;
  end if;

  -- AI auto-approval (never overrides a declined/inactive profile; never blocks if AI says review)
  if lv.auto_approve and not e.needs_human_review then
    update profiles set approved = true where id = pid and coalesce(is_active,true) and approved is distinct from true;
    out := jsonb_set(out,'{approved}', 'true');
  end if;

  update ai_evaluations set reward = out where id = p_eval;
  return out;
end $$;
revoke all on function public.apply_onboarding_outcome(uuid,uuid) from public, anon, authenticated;

-- Fire ai_profile_completed AFTER the outcome (reward/approval) is stored, so GHL gets it all at once.
drop trigger if exists evt_ai_profile on public.ai_evaluations;
create or replace function public.trg_evt_ai_profile() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.reward is not null and old.reward is null then
    perform public.enqueue_event('ai_profile_completed', new.user_id, 'ai_profile_completed:'||new.id,
      jsonb_build_object('level_slug', new.level_slug, 'composite_score', new.composite_score,
                         'tags', new.tags, 'interests', new.interests, 'summary', new.profile_summary,
                         'llavecitas', new.reward->'llavecitas', 'sigil', new.reward->'sigil',
                         'approved', new.reward->'approved', 'needs_human_review', new.needs_human_review));
  end if;
  return new;
end $$;
create trigger evt_ai_profile after update of reward on public.ai_evaluations for each row execute function public.trg_evt_ai_profile();
