/**
* MEMBERSHIP APPLICATIONS
* Access to the private area requires an approved application.
* Users can submit and read their own application; only the service role
* (or the Supabase dashboard) can change its status.
*/
create type application_status as enum ('pending', 'approved', 'rejected');

create table membership_applications (
  user_id uuid primary key references auth.users on delete cascade,
  -- Who they are in essence, regardless of title or location.
  essence text not null check (char_length(btrim(essence)) between 20 and 1500),
  -- What they can contribute to the group.
  contribution text not null check (char_length(btrim(contribution)) between 20 and 1500),
  -- Optional: who invited them.
  invited_by text check (invited_by is null or char_length(invited_by) <= 300),
  status application_status not null default 'pending',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);
alter table membership_applications enable row level security;

create policy "Can view own application." on membership_applications
  for select using (auth.uid() = user_id);
create policy "Can submit own application." on membership_applications
  for insert with check (auth.uid() = user_id and status = 'pending');
-- No update or delete policies: users cannot change the status of their application.

-- Column-level guard: users can only set the answers themselves.
revoke insert, update, delete on membership_applications from anon, authenticated;
grant insert (user_id, essence, contribution, invited_by) on membership_applications to authenticated;
grant select on membership_applications to authenticated;
