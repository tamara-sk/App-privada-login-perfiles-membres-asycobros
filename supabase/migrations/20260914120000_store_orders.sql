/**
* ORDERS
* One row per completed Secret Key shop checkout. Written by the Stripe webhook
* with the service role key; members can read their own orders only.
*/
create table orders (
  -- Stripe Checkout Session id. Natural primary key, so a replayed webhook is idempotent.
  id text primary key,
  -- The member who placed the order, when they were signed in. Guest checkouts stay null.
  user_id uuid references auth.users,
  -- Stripe PaymentIntent id, for refunds and reconciliation.
  payment_intent_id text,
  email text,
  -- paid | fulfilled | refunded | cancelled
  status text not null default 'paid',
  currency text not null,
  amount_subtotal bigint,
  amount_shipping bigint,
  amount_total bigint not null,
  -- Line items as bought: [{ slug, name, quantity, unit_amount, amount_total }]
  items jsonb not null default '[]'::jsonb,
  -- Shipping name and address as collected by Stripe Checkout.
  shipping_details jsonb,
  created timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table orders enable row level security;
create policy "Can view own orders." on orders for select using (auth.uid() = user_id);

create index orders_user_id_created_idx on orders (user_id, created desc);
