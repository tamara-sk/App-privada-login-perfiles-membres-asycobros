/**
 * SOLICITUDES AL CÍRCULO
 * Antes de pagar, cada persona responde tres preguntas: quién es (cargo o ubicación),
 * qué aporta al Círculo y qué aporta a la naturaleza. La aprobación automática la hace
 * el workflow de GHL; un rechazo lo decide una persona y se puede volver a intentar.
 * `vetoed` es el veto de Secret Key, del board o de miembros del Círculo, a personas o
 * empresas: cierra la solicitud y no admite reintento.
 */
create type application_status as enum ('pending', 'approved', 'rejected', 'vetoed');

create table applications (
  user_id uuid references auth.users not null primary key,
  email text not null,
  who_you_are text not null,
  circle_contribution text not null,
  nature_contribution text not null,
  status application_status not null default 'pending',
  decided_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index applications_email_idx on applications (lower(email));
alter table applications enable row level security;
create policy "Can view own application." on applications for select using (auth.uid() = user_id);
