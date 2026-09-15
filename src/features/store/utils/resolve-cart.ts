import { FREE_SHIPPING_THRESHOLD_CENTS, getProductBySlug, SHIPPING_OPTIONS } from '../catalog';
import type { CartItem, ResolvedCartItem } from '../types';

export const MAX_QUANTITY_PER_LINE = 10;

/**
 * Re-reads every cart line against the catalog. The browser sends slugs and
 * quantities only - names, prices and variants are always resolved here, so a
 * tampered localStorage cart cannot change what Stripe charges.
 */
export function resolveCart(items: CartItem[]): ResolvedCartItem[] {
  const resolved: ResolvedCartItem[] = [];

  for (const item of items) {
    const product = getProductBySlug(item.slug);
    if (!product) continue;

    const size = product.sizes.includes(item.size) ? item.size : product.sizes[0];
    const color = product.colors.some((option) => option.name === item.color) ? item.color : product.colors[0].name;
    const quantity = Math.min(Math.max(Math.trunc(item.quantity) || 1, 1), MAX_QUANTITY_PER_LINE);

    resolved.push({
      slug: product.slug,
      size,
      color,
      quantity,
      product,
      lineTotalCents: product.priceCents * quantity,
    });
  }

  return resolved;
}

export function getCartSubtotalCents(items: ResolvedCartItem[]) {
  return items.reduce((total, item) => total + item.lineTotalCents, 0);
}

export function getCartItemCount(items: { quantity: number }[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

/** A basket of experience packs arrives by email, so it needs no address. */
export function cartNeedsShipping(items: ResolvedCartItem[]) {
  return items.some((item) => item.product.fulfilment === 'shipped');
}

/** Shipping is only charged on the physical part of a mixed basket. */
export function getShippableSubtotalCents(items: ResolvedCartItem[]) {
  return items
    .filter((item) => item.product.fulfilment === 'shipped')
    .reduce((total, item) => total + item.lineTotalCents, 0);
}

export function qualifiesForFreeShipping(subtotalCents: number) {
  return subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS;
}

/** Shipping rates offered at checkout, discounted to zero once the basket earns it. */
export function getShippingOptions(subtotalCents: number) {
  if (!qualifiesForFreeShipping(subtotalCents)) return SHIPPING_OPTIONS;

  return SHIPPING_OPTIONS.map((option) =>
    option.id === 'standard' ? { ...option, amountCents: 0, description: 'Free over 90 euro' } : option
  );
}

export function cartLineId(item: Pick<CartItem, 'slug' | 'size' | 'color'>) {
  return `${item.slug}__${item.size}__${item.color}`;
}
