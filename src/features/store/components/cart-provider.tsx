'use client';

import { createContext, type PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { trackAddToCart, trackRemoveFromCart } from '@/libs/analytics/events';

import { getProductBySlug } from '../catalog';
import type { CartItem, ResolvedCartItem } from '../types';
import {
  cartLineId,
  getCartItemCount,
  getCartSubtotalCents,
  MAX_QUANTITY_PER_LINE,
  resolveCart,
} from '../utils/resolve-cart';

const CART_STORAGE_KEY = 'sk-cart-v1';

type CartContextValue = {
  items: ResolvedCartItem[];
  itemCount: number;
  subtotalCents: number;
  isHydrated: boolean;
  addItem: (item: CartItem) => void;
  updateQuantity: (line: Pick<CartItem, 'slug' | 'size' | 'color'>, quantity: number) => void;
  removeItem: (line: Pick<CartItem, 'slug' | 'size' | 'color'>) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is CartItem => typeof item?.slug === 'string' && Boolean(getProductBySlug(item.slug))
    );
  } catch (error) {
    return [];
  }
}

export function CartProvider({ children }: PropsWithChildren) {
  const [rawItems, setRawItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // The cart lives in localStorage so a member can close the tab mid-thought and
  // come back to the same basket. Hydration is deferred to avoid a SSR mismatch.
  useEffect(() => {
    setRawItems(readStoredCart());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(rawItems));
    } catch (error) {
      // A full or blocked storage should never break checkout.
    }
  }, [rawItems, isHydrated]);

  const items = useMemo(() => resolveCart(rawItems), [rawItems]);

  const addItem = useCallback((item: CartItem) => {
    const product = getProductBySlug(item.slug);
    if (!product) return;

    setRawItems((current) => {
      const existing = current.find((line) => cartLineId(line) === cartLineId(item));

      if (!existing) return [...current, { ...item, quantity: Math.min(item.quantity, MAX_QUANTITY_PER_LINE) }];

      return current.map((line) =>
        cartLineId(line) === cartLineId(item)
          ? { ...line, quantity: Math.min(line.quantity + item.quantity, MAX_QUANTITY_PER_LINE) }
          : line
      );
    });

    trackAddToCart({
      item: {
        item_id: product.slug,
        item_name: product.name,
        item_category: product.category,
        item_variant: `${item.color} / ${item.size}`,
        price: product.priceCents / 100,
        quantity: item.quantity,
      },
    });
  }, []);

  const updateQuantity = useCallback((line: Pick<CartItem, 'slug' | 'size' | 'color'>, quantity: number) => {
    setRawItems((current) =>
      quantity <= 0
        ? current.filter((item) => cartLineId(item) !== cartLineId(line))
        : current.map((item) =>
            cartLineId(item) === cartLineId(line)
              ? { ...item, quantity: Math.min(quantity, MAX_QUANTITY_PER_LINE) }
              : item
          )
    );
  }, []);

  const removeItem = useCallback(
    (line: Pick<CartItem, 'slug' | 'size' | 'color'>) => {
      const product = getProductBySlug(line.slug);
      const removed = items.find((item) => cartLineId(item) === cartLineId(line));

      setRawItems((current) => current.filter((item) => cartLineId(item) !== cartLineId(line)));

      if (product && removed) {
        trackRemoveFromCart({
          item: {
            item_id: product.slug,
            item_name: product.name,
            item_category: product.category,
            item_variant: `${line.color} / ${line.size}`,
            price: product.priceCents / 100,
            quantity: removed.quantity,
          },
        });
      }
    },
    [items]
  );

  const clearCart = useCallback(() => setRawItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: getCartItemCount(items),
      subtotalCents: getCartSubtotalCents(items),
      isHydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [items, isHydrated, addItem, updateQuantity, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside a CartProvider');
  return context;
}
