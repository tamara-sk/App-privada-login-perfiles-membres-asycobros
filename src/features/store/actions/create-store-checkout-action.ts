'use server';

import { getOrCreateCustomer } from '@/features/account/controllers/get-or-create-customer';
import { getSession } from '@/features/account/controllers/get-session';
import { stripeAdmin } from '@/libs/stripe/stripe-admin';
import { getURL } from '@/utils/get-url';

import { STORE_CURRENCY } from '../catalog';
import type { CartItem } from '../types';
import {
  cartNeedsShipping,
  getCartSubtotalCents,
  getShippableSubtotalCents,
  getShippingOptions,
  resolveCart,
} from '../utils/resolve-cart';

/** Countries we ship to today. Extend as fulfilment coverage grows. */
const SHIPPING_COUNTRIES = [
  'ES',
  'PT',
  'FR',
  'IT',
  'DE',
  'NL',
  'BE',
  'LU',
  'IE',
  'AT',
  'DK',
  'SE',
  'FI',
  'PL',
  'CZ',
  'GB',
  'CH',
  'US',
  'CA',
  'MX',
  'AE',
] as const;

export type StoreCheckoutResult = { url: string; error?: never } | { url?: never; error: string };

export async function createStoreCheckoutAction({ items }: { items: CartItem[] }): Promise<StoreCheckoutResult> {
  // 1. Rebuild the basket from the catalog. Client input only contributes slugs,
  //    variants and quantities - never prices.
  const resolvedItems = resolveCart(items);

  if (resolvedItems.length === 0) {
    return { error: 'Your cart is empty.' };
  }

  const subtotalCents = getCartSubtotalCents(resolvedItems);
  // Experience packs are emailed, so an all-digital basket skips the address
  // step entirely. A mixed basket still ships, priced on its physical part.
  const needsShipping = cartNeedsShipping(resolvedItems);

  // 2. Attach the Stripe customer when the shopper is a signed-in member, so
  //    merch orders and membership live under one customer record.
  let customerId: string | undefined;
  const session = await getSession();

  if (session?.user?.email) {
    try {
      customerId = await getOrCreateCustomer({ userId: session.user.id, email: session.user.email });
    } catch (error) {
      console.error('Could not resolve Stripe customer for merch checkout', error);
    }
  }

  try {
    const checkoutSession = await stripeAdmin.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      ...(customerId
        ? { customer: customerId, customer_update: { address: 'auto', shipping: 'auto', name: 'auto' } }
        : {}),
      ...(needsShipping
        ? {
            shipping_address_collection: { allowed_countries: [...SHIPPING_COUNTRIES] },
            shipping_options: getShippingOptions(getShippableSubtotalCents(resolvedItems)).map((option) => ({
              shipping_rate_data: {
                type: 'fixed_amount' as const,
                fixed_amount: { amount: option.amountCents, currency: STORE_CURRENCY },
                display_name: option.label,
                delivery_estimate: {
                  minimum: { unit: 'business_day' as const, value: option.minBusinessDays },
                  maximum: { unit: 'business_day' as const, value: option.maxBusinessDays },
                },
              },
            })),
          }
        : {}),
      line_items: resolvedItems.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: STORE_CURRENCY,
          unit_amount: item.product.priceCents,
          product_data: {
            name: `${item.product.name} - ${item.color} / ${item.size}`,
            description: item.product.backPhrase,
            metadata: { slug: item.slug, size: item.size, color: item.color },
          },
        },
      })),
      metadata: {
        order_type: needsShipping ? 'merch' : 'experience',
        user_id: session?.user?.id ?? '',
        // Stripe caps metadata values at 500 characters, so keep this compact.
        items: resolvedItems
          .map((item) => `${item.slug}:${item.size}:${item.color}x${item.quantity}`)
          .join('|')
          .slice(0, 500),
      },
      success_url: `${getURL()}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getURL()}/store/cart`,
    });

    if (!checkoutSession.url) {
      return { error: 'Stripe did not return a checkout url.' };
    }

    return { url: checkoutSession.url };
  } catch (error) {
    console.error('Merch checkout failed', error);
    return { error: 'We could not open checkout. Please try again.' };
  }
}
