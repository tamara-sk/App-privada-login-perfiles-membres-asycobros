'use client';

import { useEffect, useRef } from 'react';

import { type AnalyticsItem, trackPurchase } from '@/libs/analytics/events';

import { useCart } from './cart-provider';

const TRACKED_ORDERS_KEY = 'sk-tracked-orders-v1';

/**
 * Fires the GA4/Meta `purchase` event exactly once per order and empties the
 * bag. Deduplicated in storage because customers refresh confirmation pages.
 */
export function PurchaseTracker({
  transactionId,
  items,
  value,
  shipping,
  tax,
  currency,
}: {
  transactionId: string;
  items: AnalyticsItem[];
  value: number;
  shipping: number;
  tax: number;
  currency: string;
}) {
  const { clearCart } = useCart();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    clearCart();

    let alreadyTracked: string[] = [];
    try {
      alreadyTracked = JSON.parse(window.localStorage.getItem(TRACKED_ORDERS_KEY) ?? '[]');
    } catch (error) {
      alreadyTracked = [];
    }

    if (Array.isArray(alreadyTracked) && alreadyTracked.includes(transactionId)) return;

    trackPurchase({ transactionId, items, value, shipping, tax, currency });

    try {
      window.localStorage.setItem(
        TRACKED_ORDERS_KEY,
        JSON.stringify([...(Array.isArray(alreadyTracked) ? alreadyTracked.slice(-19) : []), transactionId])
      );
    } catch (error) {
      // Non-fatal: at worst the event is re-sent on a manual refresh.
    }
  }, [clearCart, currency, items, shipping, tax, transactionId, value]);

  return null;
}
