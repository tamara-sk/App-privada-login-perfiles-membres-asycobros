/**
 * PAGOS CON REDSYS (TPV Virtual de BBVA)
 *
 * Sustituye el modelo de Stripe de la plantilla (customers, products, prices,
 * subscriptions). Los precios viven en el código (`src/features/membership/plans.ts`) y
 * el banco solo confirma cobros, así que basta con dos tablas: los pagos y la entrada
 * vigente de cada persona.
 */

drop publication if exists supabase_realtime;

drop table if exists subscriptions;
drop table if exists prices;
drop table if exists products;
drop table if exists customers;
drop type if exists subscription_status;
drop type if exists pricing_plan_interval;
drop type if exists pricing_type;

alter table users drop column if exists payment_method;

/**
 * PAYMENTS
 * Un registro por número de pedido enviado a Redsys. Se crea en `pending` antes de
 * redirigir al banco y solo la notificación firmada lo pasa a `paid` o `failed`.
 */
create type payment_status as enum ('pending', 'paid', 'failed');

create table payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  -- Número de pedido de Redsys. Único: el banco rechaza pedidos repetidos.
  "order" text not null unique check (char_length("order") between 4 and 12),
  -- Slug del plan pagado, p. ej. member_secret_key.
  plan text not null,
  -- Importe en céntimos, fijado por el servidor.
  amount integer not null check (amount > 0),
  currency text not null default '978',
  status payment_status not null default 'pending',
  -- Código de respuesta del banco (Ds_Response) y de autorización.
  response_code text,
  authorisation_code text,
  -- Referencia para cobros posteriores (pago por referencia), si el banco la devuelve.
  redsys_identifier text,
  redsys_cof_txnid text,
  -- Notificación completa, para auditoría.
  raw_notification jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table payments enable row level security;
create policy "Can view own payments." on payments for select using (auth.uid() = user_id);

/**
 * MEMBERSHIPS
 * La entrada al Círculo vigente de cada persona. Una fila por persona.
 */
create type membership_status as enum ('active', 'expired', 'canceled');

create table memberships (
  user_id uuid references auth.users not null primary key,
  plan text not null,
  status membership_status not null default 'active',
  current_period_start timestamp with time zone not null,
  current_period_end timestamp with time zone not null,
  -- La persona pidió que la entrada termine al final del periodo actual.
  cancel_at_period_end boolean not null default false,
  -- Referencia de Redsys para renovar sin volver a pedir la tarjeta.
  redsys_identifier text,
  redsys_cof_txnid text,
  last_payment_id uuid references payments,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table memberships enable row level security;
create policy "Can view own membership." on memberships for select using (auth.uid() = user_id);
