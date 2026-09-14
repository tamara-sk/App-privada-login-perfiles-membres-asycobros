'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { trackBeginCheckout, trackViewCart } from '@/libs/analytics/events';

import { createStoreCheckoutAction } from '../actions/create-store-checkout-action';
import { FREE_SHIPPING_THRESHOLD_CENTS } from '../catalog';
import type { ResolvedCartItem } from '../types';
import { formatPrice } from '../utils/format-price';
import { MAX_QUANTITY_PER_LINE, qualifiesForFreeShipping } from '../utils/resolve-cart';

import { useCart } from './cart-provider';
import { MerchPreview } from './merch-preview';

export function CartContents() {
  const { items, subtotalCents, itemCount, isHydrated, updateQuantity, removeItem } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { toast } = useToast();
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (!isHydrated || hasTrackedView.current || items.length === 0) return;

    hasTrackedView.current = true;
    trackViewCart({
      items: items.map(toAnalyticsItem),
      value: subtotalCents / 100,
    });
  }, [isHydrated, items, subtotalCents]);

  async function handleCheckout() {
    setIsCheckingOut(true);

    trackBeginCheckout({ items: items.map(toAnalyticsItem), value: subtotalCents / 100 });

    const result = await createStoreCheckoutAction({
      items: items.map(({ slug, size, color, quantity }) => ({ slug, size, color, quantity })),
    });

    if (result.url) {
      window.location.href = result.url;
      return;
    }

    setIsCheckingOut(false);
    toast({ variant: 'destructive', description: result.error ?? 'Checkout is unavailable right now.' });
  }

  if (!isHydrated) {
    return <p className='py-16 text-center text-neutral-500'>Loading your bag...</p>;
  }

  if (items.length === 0) {
    return (
      <div className='flex flex-col items-center gap-4 py-16 text-center'>
        <p className='text-lg text-neutral-400'>Your bag is empty.</p>
        <Button variant='sexy' asChild>
          <Link href='/store'>Browse the shop</Link>
        </Button>
      </div>
    );
  }

  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD_CENTS - subtotalCents;

  return (
    <div className='grid gap-8 lg:grid-cols-[1fr_360px]'>
      <ul className='flex flex-col gap-4'>
        {items.map((item) => (
          <li
            key={`${item.slug}-${item.size}-${item.color}`}
            className='flex gap-4 rounded-lg border border-zinc-800 bg-black p-4'
          >
            <div className='w-24 flex-shrink-0'>
              <MerchPreview
                product={item.product}
                view='back'
                colorHex={item.product.colors.find((option) => option.name === item.color)?.hex}
              />
            </div>
            <div className='flex flex-1 flex-col gap-1'>
              <Link href={`/store/${item.slug}`} className='font-alt font-semibold text-white hover:underline'>
                {item.product.name}
              </Link>
              <span className='text-sm text-neutral-500'>
                {item.color} / {item.size}
              </span>
              <div className='mt-auto flex items-center gap-3 pt-2'>
                <div className='flex items-center rounded-md border border-zinc-800'>
                  <button
                    type='button'
                    aria-label='Decrease quantity'
                    className='h-8 w-8 text-neutral-300'
                    onClick={() => updateQuantity(item, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className='w-7 text-center text-sm'>{item.quantity}</span>
                  <button
                    type='button'
                    aria-label='Increase quantity'
                    className='h-8 w-8 text-neutral-300 disabled:opacity-40'
                    disabled={item.quantity >= MAX_QUANTITY_PER_LINE}
                    onClick={() => updateQuantity(item, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type='button'
                  className='text-sm text-neutral-500 underline-offset-4 hover:text-neutral-300 hover:underline'
                  onClick={() => removeItem(item)}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className='font-semibold text-white'>{formatPrice(item.lineTotalCents)}</div>
          </li>
        ))}
      </ul>

      <aside className='flex h-fit flex-col gap-4 rounded-lg border border-zinc-800 bg-black p-6'>
        <h2 className='font-alt text-lg font-semibold text-white'>Summary</h2>
        <div className='flex justify-between text-sm text-neutral-400'>
          <span>
            {itemCount} item{itemCount === 1 ? '' : 's'}
          </span>
          <span className='text-white'>{formatPrice(subtotalCents)}</span>
        </div>
        <div className='flex justify-between text-sm text-neutral-400'>
          <span>Shipping</span>
          <span>{qualifiesForFreeShipping(subtotalCents) ? 'Free' : 'Calculated at checkout'}</span>
        </div>
        {remainingForFreeShipping > 0 && (
          <p className='rounded-md border border-zinc-800 p-3 text-xs text-neutral-400'>
            Add {formatPrice(remainingForFreeShipping)} more for free standard shipping.
          </p>
        )}
        <Button variant='sexy' className='w-full' disabled={isCheckingOut} onClick={handleCheckout}>
          {isCheckingOut ? 'Opening checkout...' : 'Checkout'}
        </Button>
        <p className='text-center text-xs text-neutral-500'>Secure payment by Stripe. 30-day returns.</p>
      </aside>
    </div>
  );
}

function toAnalyticsItem(item: ResolvedCartItem) {
  return {
    item_id: item.slug,
    item_name: item.product.name,
    item_category: item.product.category,
    item_variant: `${item.color} / ${item.size}`,
    price: item.product.priceCents / 100,
    quantity: item.quantity,
  };
}
