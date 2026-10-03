-- GHL event triggers for bookings, memberships and payments. Payments are Redsys TPV + Bizum only
-- (Bizum is processed through Redsys). Both resolve in `redsys-notification`, which calls
-- finalize_booking_payment / finalize_membership_payment, so we hook the resulting state changes.
-- Applied to production 2026-10-03. enqueue_event() swallows its own errors: CRM sync can never
-- break signup, booking or payment.

create or replace function public.trg_evt_reservation() returns trigger language plpgsql security definer set search_path = public as $$
declare uid uuid;
begin
  select user_id into uid from public.profiles where id = new.profile_id;
  if uid is null then return new; end if;
  if tg_op = 'INSERT' then
    perform public.enqueue_event('booking_created', uid, 'booking_created:'||new.id,
      jsonb_build_object('reservation_id', new.id, 'experience_id', new.experience_id, 'starts_at', new.starts_at, 'amount_cents', new.amount_cents, 'currency', new.currency));
  else
    if new.status = 'confirmed' and old.status is distinct from 'confirmed' and coalesce(new.amount_cents,0) > 0 then
      perform public.enqueue_event('payment_success', uid, 'payment_success:booking:'||new.id, jsonb_build_object('kind','booking','reservation_id', new.id, 'amount_cents', new.amount_cents, 'currency', new.currency));
      perform public.enqueue_event('transaction_created', uid, 'transaction:booking:'||new.id, jsonb_build_object('kind','booking','reservation_id', new.id, 'amount_cents', new.amount_cents, 'currency', new.currency));
    end if;
    if new.cancelled_at is not null and old.cancelled_at is null then
      perform public.enqueue_event('booking_cancelled', uid, 'booking_cancelled:'||new.id, jsonb_build_object('reservation_id', new.id, 'reason', new.cancel_reason, 'refund_type', new.refund_type));
    end if;
  end if;
  return new;
end $$;

create or replace function public.trg_evt_membership_profile() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.user_id is null then return new; end if;
  if new.membership_status = 'active' and old.membership_status is distinct from 'active' then
    perform public.enqueue_event('membership_created', new.user_id, 'membership_created:'||new.id||':'||coalesce(new.membership_started_at::text,'x'), jsonb_build_object('tier', new.membership_type, 'valid_until', new.membership_expires_at));
    perform public.enqueue_event('payment_success', new.user_id, 'payment_success:membership:'||new.id||':'||coalesce(new.membership_expires_at::text,'x'), jsonb_build_object('kind','membership','valid_until', new.membership_expires_at));
    perform public.enqueue_event('transaction_created', new.user_id, 'transaction:membership:'||new.id||':'||coalesce(new.membership_expires_at::text,'x'), jsonb_build_object('kind','membership','valid_until', new.membership_expires_at));
  elsif new.membership_status = 'active' and old.membership_status = 'active'
        and new.membership_expires_at is distinct from old.membership_expires_at
        and new.membership_expires_at > coalesce(old.membership_expires_at, '-infinity') then
    perform public.enqueue_event('payment_success', new.user_id, 'payment_success:membership:'||new.id||':'||new.membership_expires_at::text, jsonb_build_object('kind','membership_renewal','valid_until', new.membership_expires_at));
    perform public.enqueue_event('transaction_created', new.user_id, 'transaction:membership:'||new.id||':'||new.membership_expires_at::text, jsonb_build_object('kind','membership_renewal','valid_until', new.membership_expires_at));
  end if;
  return new;
end $$;

create or replace function public.trg_evt_redsys_failed() returns trigger language plpgsql security definer set search_path = public as $$
declare uid uuid; n int;
begin
  begin n := new.ds_response::int; exception when others then n := 999; end;
  if n between 0 and 99 then return new; end if;
  if left(new.ds_order,1) = '9' then
    select user_id into uid from public.profiles where redsys_membership_order_id = new.ds_order;
  else
    select p.user_id into uid from public.reservations r join public.profiles p on p.id = r.profile_id where r.redsys_order_id = new.ds_order;
  end if;
  if uid is not null then
    perform public.enqueue_event('payment_failed', uid, 'payment_failed:'||new.id, jsonb_build_object('order', new.ds_order, 'ds_response', new.ds_response));
  end if;
  return new;
end $$;

create trigger evt_reservation after insert or update on public.reservations for each row execute function public.trg_evt_reservation();
create trigger evt_membership_profile after update of membership_status, membership_expires_at on public.profiles for each row execute function public.trg_evt_membership_profile();
create trigger evt_redsys_failed after insert on public.redsys_events for each row execute function public.trg_evt_redsys_failed();
create trigger evt_user_registered after insert on auth.users for each row execute function public.trg_evt_user_registered();
