'use client';

/**
 * Typed wrappers around the GTM `dataLayer`.
 *
 * Everything funnels through `pushToDataLayer` so a single container (GTM) can
 * fan events out to GA4, Meta, Google Ads or anything else without another code
 * deploy. Event names follow the GA4 recommended e-commerce schema, which is
 * what GTM's built-in GA4 tags expect out of the box.
 */

export type AnalyticsItem = {
  item_id: string;
  item_name: string;
  item_category?: string;
  item_variant?: string;
  price: number;
  quantity: number;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function pushToDataLayer(payload: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

/** GA4 requires clearing the previous ecommerce object before each new event. */
function pushEcommerce(event: string, ecommerce: Record<string, unknown>) {
  pushToDataLayer({ ecommerce: null });
  pushToDataLayer({ event, ecommerce });
}

function trackMeta(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  window.fbq('track', event, params);
}

export function trackPageView({ url, title }: { url: string; title?: string }) {
  pushToDataLayer({
    event: 'page_view',
    page_path: url,
    page_location: typeof window !== 'undefined' ? window.location.href : url,
    page_title: title ?? (typeof document !== 'undefined' ? document.title : undefined),
  });
  trackMeta('PageView');
}

export function trackViewItemList({ listName, items }: { listName: string; items: AnalyticsItem[] }) {
  pushEcommerce('view_item_list', { item_list_id: listName, item_list_name: listName, items });
}

export function trackViewItem({ item, currency = 'EUR' }: { item: AnalyticsItem; currency?: string }) {
  pushEcommerce('view_item', { currency, value: item.price * item.quantity, items: [item] });
  trackMeta('ViewContent', { content_ids: [item.item_id], content_type: 'product', value: item.price, currency });
}

export function trackAddToCart({ item, currency = 'EUR' }: { item: AnalyticsItem; currency?: string }) {
  pushEcommerce('add_to_cart', { currency, value: item.price * item.quantity, items: [item] });
  trackMeta('AddToCart', {
    content_ids: [item.item_id],
    content_type: 'product',
    value: item.price * item.quantity,
    currency,
  });
}

export function trackRemoveFromCart({ item, currency = 'EUR' }: { item: AnalyticsItem; currency?: string }) {
  pushEcommerce('remove_from_cart', { currency, value: item.price * item.quantity, items: [item] });
}

export function trackViewCart({
  items,
  value,
  currency = 'EUR',
}: {
  items: AnalyticsItem[];
  value: number;
  currency?: string;
}) {
  pushEcommerce('view_cart', { currency, value, items });
}

export function trackBeginCheckout({
  items,
  value,
  currency = 'EUR',
}: {
  items: AnalyticsItem[];
  value: number;
  currency?: string;
}) {
  pushEcommerce('begin_checkout', { currency, value, items });
  trackMeta('InitiateCheckout', {
    content_ids: items.map((item) => item.item_id),
    content_type: 'product',
    num_items: items.reduce((total, item) => total + item.quantity, 0),
    value,
    currency,
  });
}

export function trackPurchase({
  transactionId,
  items,
  value,
  shipping = 0,
  tax = 0,
  currency = 'EUR',
  coupon,
}: {
  transactionId: string;
  items: AnalyticsItem[];
  value: number;
  shipping?: number;
  tax?: number;
  currency?: string;
  coupon?: string;
}) {
  pushEcommerce('purchase', {
    transaction_id: transactionId,
    currency,
    value,
    shipping,
    tax,
    coupon,
    items,
  });
  trackMeta('Purchase', { value, currency, content_ids: items.map((item) => item.item_id), content_type: 'product' });
}

/** Membership / lifecycle events — the funnel that matters upstream of the shop. */
export function trackSignUp({ method = 'email' }: { method?: string } = {}) {
  pushToDataLayer({ event: 'sign_up', method });
  trackMeta('CompleteRegistration');
}

export function trackLogin({ method = 'email' }: { method?: string } = {}) {
  pushToDataLayer({ event: 'login', method });
}

export function trackSelectPlan({
  planName,
  value,
  currency = 'EUR',
}: {
  planName: string;
  value?: number;
  currency?: string;
}) {
  pushToDataLayer({ event: 'select_plan', plan_name: planName, value, currency });
  trackMeta('Lead', { content_name: planName, value, currency });
}

export function trackCtaClick({ label, location }: { label: string; location: string }) {
  pushToDataLayer({ event: 'cta_click', cta_label: label, cta_location: location });
}
