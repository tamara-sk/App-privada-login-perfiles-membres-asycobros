'use client';

import { useEffect, useRef } from 'react';

import { trackViewItemList } from '@/libs/analytics/events';

import type { StoreProduct } from '../types';

/** Fires a single GA4 `view_item_list` for whichever collection is on screen. */
export function StoreListTracker({ listName, products }: { listName: string; products: StoreProduct[] }) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current || products.length === 0) return;
    hasTracked.current = true;

    trackViewItemList({
      listName,
      items: products.map((product) => ({
        item_id: product.slug,
        item_name: product.name,
        item_category: product.category,
        price: product.priceCents / 100,
        quantity: 1,
      })),
    });
  }, [listName, products]);

  return null;
}
