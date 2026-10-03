-- Secret Key — Web + App unified onboarding, AI evaluation and one-way GHL sync.
-- TARGET: Supabase project `secret-key-eu` (source of truth). Applied to production 2026-10-03 with owner approval (applied in pieces; see also *_000100 and *_000200).
-- Principle: Web + App -> Supabase -> GHL. No GHL -> Supabase writes anywhere.

-- 1) Config-driven levels/rewards (editable with SQL/dashboard, no app rebuild) ---------------
create table if not exists public.onboarding_levels (
  slug text primary key,
  name text not null,
  min_score int not null,            -- AI composite score (0-100) required
  reward_title text,
  reward_payload jsonb not null default '{}'::jsonb,  -- e.g. {"llavecitas":1}
  ghl_tag text not null,
  sort_order int not null default 0,
  is_active boolean not null default true
);
alter table public.onboarding_levels enable row level security;
create policy "levels readable by everyone" on public.onboarding_levels for select using (true);

insert into public.onboarding_levels (slug,name,min_score,reward_title,reward_payload,ghl_tag,sort_order) values
 ('concierge-seeker','Concierge Seeker',0,'Welcome access','{}','sk-level-concierge-seeker',1),
 ('circle-contributor','Circle Contributor',50,'Priority calendar access','{}','sk-level-circle-contributor',2),
 ('keeper-candidate','Keeper Candidate',75,'Founding-circle recognition','{}','sk-level-keeper-candidate',3)
on conflict (slug) do nothing;

-- 2) Question set (editable) ------------------------------------------------------------------
create table if not exists public.onboarding_questions (
  key text primary key check (key in ('who_are_you','bring_to_circle','bring_to_environment')),
  prompt text not null,
  min_chars int not null default 120,
  sort_order int not null default 0
);
alter table public.onboarding_questions enable row level security;
create policy "questions readable by everyone" on public.onboarding_questions for select using (true);
insert into public.onboarding_questions (key,prompt,min_chars,sort_order) values
 ('who_are_you','WHO ARE YOU?',120,1),
 ('bring_to_circle','WHAT CAN YOU BRING TO THE CIRCLE?',120,2),
 ('bring_to_environment','WHAT CAN YOU BRING TO THE ENVIRONMENT?',120,3)
on conflict (key) do nothing;

-- 3) Answers: one row per user, same row for web and app ---------------------------------------
create table if not exists public.onboarding_responses (
  user_id uuid primary key references auth.users(id) on delete cascade,
  who_are_you text, bring_to_circle text, bring_to_environment text,
  source text not null default 'web' check (source in ('web','app')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now()
);
alter table public.onboarding_responses enable row level security;
create policy "own responses select" on public.onboarding_responses for select using (auth.uid() = user_id);
create policy "own responses insert" on public.onboarding_responses for insert with check (auth.uid() = user_id and completed_at is null);
create policy "own responses update" on public.onboarding_responses for update using (auth.uid() = user_id and completed_at is null) with check (auth.uid() = user_id and completed_at is null);
-- Completion is stamped server-side (evaluate-onboarding); users cannot set completed_at.

-- 4) AI evaluation result (written only by the edge function / service role) -------------------
create table if not exists public.ai_evaluations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  model text not null,
  prompt_version text not null,
  scores jsonb not null,             -- {values_affinity, contribution, depth, ...} 0-100
  composite_score int not null,
  profile_summary text,
  interests text[] not null default '{}',
  tags text[] not null default '{}',
  level_slug text references public.onboarding_levels(slug),
  needs_human_review boolean not null default false,  -- review later, never blocks onboarding
  raw jsonb,
  created_at timestamptz not null default now()
);
create index if not exists ai_evaluations_user_idx on public.ai_evaluations(user_id, created_at desc);
alter table public.ai_evaluations enable row level security;
create policy "own evaluation select" on public.ai_evaluations for select using (auth.uid() = user_id);
-- no insert/update policies: service role only.

-- 5) Outbox: the ONLY bridge Supabase -> GHL ---------------------------------------------------
create table if not exists public.event_outbox (
  id bigint generated always as identity primary key,
  event_type text not null check (event_type in (
    'user_registered','onboarding_started','onboarding_completed','ai_profile_completed',
    'membership_created','booking_created','payment_success','payment_failed',
    'booking_cancelled','transaction_created')),
  user_id uuid not null,
  dedupe_key text not null unique,   -- idempotency: same business event is never sent twice
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending','sent','failed','dead')),
  attempts int not null default 0,
  last_error text,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);
create index if not exists event_outbox_pending_idx on public.event_outbox(status, id) where status in ('pending','failed');
alter table public.event_outbox enable row level security;  -- no policies: service role only

-- One GHL contact per Supabase user (mapping only; never read back into the app as truth)
create table if not exists public.ghl_contacts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  ghl_contact_id text not null,
  last_synced_at timestamptz not null default now()
);
alter table public.ghl_contacts enable row level security;

create or replace function public.enqueue_event(p_type text, p_user uuid, p_key text, p_payload jsonb default '{}')
returns void language plpgsql security definer set search_path = public as $$
begin
  insert into public.event_outbox(event_type,user_id,dedupe_key,payload)
  values (p_type,p_user,p_key,coalesce(p_payload,'{}')) on conflict (dedupe_key) do nothing;
exception when others then
  -- CRM sync must NEVER break signup, booking or payment flows.
  raise warning 'enqueue_event failed: %', sqlerrm;
end $$;
revoke all on function public.enqueue_event(text,uuid,text,jsonb) from public, anon, authenticated;

-- 6) Event triggers (only CRM-relevant events) -------------------------------------------------
create or replace function public.trg_evt_user_registered() returns trigger language plpgsql security definer set search_path = public as $$
begin
  perform public.enqueue_event('user_registered', new.id, 'user_registered:'||new.id,
    jsonb_build_object('email', new.email, 'full_name', new.raw_user_meta_data->>'full_name',
                       'source', coalesce(new.raw_user_meta_data->>'source','web')));
  return new;
end $$;
drop trigger if exists evt_user_registered on auth.users;
create trigger evt_user_registered after insert on auth.users for each row execute function public.trg_evt_user_registered();

create or replace function public.trg_evt_onboarding() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    perform public.enqueue_event('onboarding_started', new.user_id, 'onboarding_started:'||new.user_id, jsonb_build_object('source', new.source));
  elsif new.completed_at is not null and old.completed_at is null then
    perform public.enqueue_event('onboarding_completed', new.user_id, 'onboarding_completed:'||new.user_id, '{}');
  end if;
  return new;
end $$;
drop trigger if exists evt_onboarding on public.onboarding_responses;
create trigger evt_onboarding after insert or update on public.onboarding_responses for each row execute function public.trg_evt_onboarding();

create or replace function public.trg_evt_ai_profile() returns trigger language plpgsql security definer set search_path = public as $$
begin
  perform public.enqueue_event('ai_profile_completed', new.user_id, 'ai_profile_completed:'||new.id,
    jsonb_build_object('level_slug', new.level_slug, 'composite_score', new.composite_score,
                       'tags', new.tags, 'interests', new.interests, 'summary', new.profile_summary));
  return new;
end $$;
drop trigger if exists evt_ai_profile on public.ai_evaluations;
create trigger evt_ai_profile after insert on public.ai_evaluations for each row execute function public.trg_evt_ai_profile();

-- (membership / booking / payment triggers: see 20261003000200_ghl_events_redsys.sql — Redsys + Bizum only)

-- 7) Public, blurred-safe calendar for the web (no member-only fields leave the database) ------
create or replace view public.public_experiences as
  select id, title, start_date, location, chapter, sigil_category, image_url,
         left(coalesce(description,''), 160) as teaser
  from public.experiences where is_active and start_date >= now();
grant select on public.public_experiences to anon, authenticated;
