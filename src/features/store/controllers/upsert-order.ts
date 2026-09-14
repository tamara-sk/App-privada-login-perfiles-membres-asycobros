import Stripe from 'stripe';

import { stripeAdmin } from '@/libs/stripe/stripe-admin';
import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';

/**
 * Persists a completed shop checkout.
 *
 * The Checkout Session id is the primary key, so Stripe replaying a webhook
 * simply overwrites the same row instead of duplicating the order.
 */
export async function upsertOrder(checkoutSession: Stripe.Checkout.Session) {
  const session = await stripeAdmin.checkout.sessions.retrieve(checkoutSession.id, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  const items = (session.line_items?.data ?? []).map((lineItem) => {
    const product = lineItem.price?.product as Stripe.Product | undefined;

    return {
      slug: product?.metadata?.slug ?? null,
      size: product?.metadata?.size ?? null,
      color: product?.metadata?.color ?? null,
      name: lineItem.description,
      quantity: lineItem.quantity ?? 1,
      unit_amount: lineItem.price?.unit_amount ?? 0,
      amount_total: lineItem.amount_total ?? 0,
    };
  });

  const userId = session.metadata?.user_id || (await getUserIdForCustomer(session.customer));

  const { error } = await supabaseAdminClient.from('orders').upsert({
    id: session.id,
    user_id: userId,
    payment_intent_id: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id,
    email: session.customer_details?.email ?? null,
    status: 'paid',
    currency: session.currency ?? 'eur',
    amount_subtotal: session.amount_subtotal,
    amount_shipping: session.shipping_cost?.amount_total ?? 0,
    amount_total: session.amount_total ?? 0,
    items,
    shipping_details: (session.customer_details?.address
      ? { name: session.customer_details.name, address: session.customer_details.address }
      : null) as never,
  });

  if (error) throw error;
}

async function getUserIdForCustomer(customer: Stripe.Checkout.Session['customer']) {
  const customerId = typeof customer === 'string' ? customer : customer?.id;
  if (!customerId) return null;

  const { data } = await supabaseAdminClient
    .from('customers')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .maybeSingle();

  return data?.id ?? null;
}
