'use server';

import { redirect } from 'next/navigation';

import { getSession } from '@/features/account/controllers/get-session';
import { createOrderNumber } from '@/libs/redsys/payment';
import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';

import { STORE_CURRENCY } from '../catalog';
import { isShippingCountry } from '../shipping-countries';
import type { CartItem } from '../types';
import {
  cartNeedsShipping,
  getCartSubtotalCents,
  getShippableSubtotalCents,
  getShippingOptions,
  resolveCart,
} from '../utils/resolve-cart';

export type StoreCheckoutDetails = {
  email: string;
  name: string;
  phone?: string;
  shippingOptionId?: string;
  line1?: string;
  line2?: string;
  city?: string;
  postalCode?: string;
  country?: string;
};

export type StoreCheckoutResult = { error: string };

/**
 * Registra el pedido como pendiente y lleva a la persona a la página que la envía a Redsys.
 *
 * Redsys es una pasarela por redirección: cobra un importe firmado y ya está. La dirección,
 * el envío y las líneas del carrito se recogen y se calculan aquí, en el servidor. El
 * navegador aporta slugs, tallas y cantidades; los precios salen siempre del catálogo.
 */
export async function createStoreCheckoutAction({
  items,
  details,
}: {
  items: CartItem[];
  details: StoreCheckoutDetails;
}): Promise<StoreCheckoutResult> {
  const resolvedItems = resolveCart(items);

  if (resolvedItems.length === 0) {
    return { error: 'Tu carrito está vacío.' };
  }

  const email = details.email?.trim();

  if (!email || !email.includes('@')) {
    return { error: 'Necesitamos un correo electrónico válido.' };
  }

  if (!details.name?.trim()) {
    return { error: 'Necesitamos un nombre.' };
  }

  const subtotalCents = getCartSubtotalCents(resolvedItems);
  const needsShipping = cartNeedsShipping(resolvedItems);

  let shippingCents = 0;
  let shippingDetails: Record<string, unknown> | null = null;

  if (needsShipping) {
    const country = details.country?.trim().toUpperCase();

    if (!country || !isShippingCountry(country)) {
      return { error: 'Elige un país al que lleguemos hoy.' };
    }

    if (!details.line1?.trim() || !details.city?.trim() || !details.postalCode?.trim()) {
      return { error: 'Completa la dirección de envío.' };
    }

    const options = getShippingOptions(getShippableSubtotalCents(resolvedItems));
    const option = options.find((candidate) => candidate.id === details.shippingOptionId) ?? options[0];

    shippingCents = option.amountCents;
    shippingDetails = {
      name: details.name.trim(),
      phone: details.phone?.trim() || null,
      address: {
        line1: details.line1.trim(),
        line2: details.line2?.trim() || null,
        city: details.city.trim(),
        postal_code: details.postalCode.trim(),
        country,
      },
      shipping_option: { id: option.id, label: option.label, amount_cents: option.amountCents },
    };
  }

  const totalCents = subtotalCents + shippingCents;
  const session = await getSession();
  const order = createOrderNumber();

  const { error } = await supabaseAdminClient.from('orders').insert({
    id: order,
    user_id: session?.user?.id ?? null,
    email,
    status: 'pending',
    currency: STORE_CURRENCY,
    amount_subtotal: subtotalCents,
    amount_shipping: shippingCents,
    amount_total: totalCents,
    items: resolvedItems.map((item) => ({
      slug: item.slug,
      size: item.size,
      color: item.color,
      name: `${item.product.name} - ${item.color} / ${item.size}`,
      quantity: item.quantity,
      unit_amount: item.product.priceCents,
      amount_total: item.lineTotalCents,
      fulfilment: item.product.fulfilment,
    })) as never,
    shipping_details: shippingDetails as never,
  });

  if (error) {
    console.error('No se pudo registrar el pedido', error);
    return { error: 'No pudimos abrir el pago. Inténtalo de nuevo.' };
  }

  redirect(`/store/pago/${order}`);
}
