'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { trackViewItem } from '@/libs/analytics/events';
import { cn } from '@/utils/cn';

import { CATEGORY_LABELS, FREE_SHIPPING_THRESHOLD_CENTS } from '../catalog';
import type { StoreProduct } from '../types';
import { formatPrice } from '../utils/format-price';
import { MAX_QUANTITY_PER_LINE } from '../utils/resolve-cart';

import { useCart } from './cart-provider';
import { MerchPreview } from './merch-preview';

export function ProductDetail({ product }: { product: StoreProduct }) {
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [view, setView] = useState<'front' | 'back'>('back');
  const { addItem } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    trackViewItem({
      item: {
        item_id: product.slug,
        item_name: product.name,
        item_category: product.category,
        price: product.priceCents / 100,
        quantity: 1,
      },
    });
  }, [product]);

  const colorHex = product.colors.find((option) => option.name === color)?.hex;
  const isExperience = product.category === 'experience';
  const hasColorChoice = product.colors.length > 1;
  const hasSizeChoice = product.sizes.length > 1;

  function handleAddToCart({ goToCart }: { goToCart?: boolean } = {}) {
    addItem({ slug: product.slug, size, color, quantity });

    if (goToCart) {
      router.push('/store/cart');
      return;
    }

    toast({ description: `${product.name} added to your bag.` });
  }

  return (
    <div className='grid gap-8 lg:grid-cols-2 lg:gap-12'>
      <div className='flex flex-col gap-3'>
        <MerchPreview product={product} view={view} colorHex={colorHex} />
        <div className={cn('flex gap-2', isExperience && 'hidden')}>
          {(['back', 'front'] as const).map((option) => (
            <button
              key={option}
              type='button'
              onClick={() => setView(option)}
              className={cn(
                'flex-1 rounded-md border px-3 py-2 text-xs uppercase tracking-widest transition-colors',
                view === option
                  ? 'border-white bg-white text-black'
                  : 'border-zinc-800 text-neutral-400 hover:border-zinc-600'
              )}
            >
              {option} view
            </button>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <span className='text-[11px] uppercase tracking-widest text-neutral-500'>
            {CATEGORY_LABELS[product.category]}
          </span>
          <h1 className='text-3xl lg:text-4xl'>{product.name}</h1>
          <p className='text-lg text-neutral-400'>{product.tagline}</p>
          <div className='flex items-baseline gap-3 pt-2'>
            <span className='text-2xl font-semibold text-white'>{formatPrice(product.priceCents)}</span>
            {product.compareAtCents && (
              <span className='text-neutral-500 line-through'>{formatPrice(product.compareAtCents)}</span>
            )}
          </div>
        </div>

        <blockquote className='rounded-lg border border-zinc-800 bg-black p-4 font-alt text-sm leading-relaxed text-neutral-200'>
          &ldquo;{product.backPhrase}&rdquo;
          <footer className='pt-2 text-xs uppercase tracking-widest text-neutral-500'>
            {isExperience ? 'Written on the card' : 'Printed on the back'}
          </footer>
        </blockquote>

        {product.experience && (
          <div className='flex flex-col gap-3 rounded-lg border border-zinc-800 bg-black p-5'>
            <h2 className='font-alt text-sm font-semibold uppercase tracking-widest text-neutral-400'>
              What is included
            </h2>
            <ul className='flex flex-col gap-2'>
              {product.experience.includes.map((line) => (
                <li key={line} className='flex gap-3 text-sm text-neutral-300'>
                  <span aria-hidden className='mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-neutral-500' />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={cn('flex flex-col gap-3', !hasColorChoice && 'hidden')}>
          <span className='text-xs uppercase tracking-widest text-neutral-500'>Colour: {color}</span>
          <div className='flex gap-2'>
            {product.colors.map((option) => (
              <button
                key={option.name}
                type='button'
                aria-label={option.name}
                aria-pressed={color === option.name}
                onClick={() => setColor(option.name)}
                style={{ backgroundColor: option.hex }}
                className={cn(
                  'h-9 w-9 rounded-full border-2 transition-transform',
                  color === option.name ? 'scale-105 border-white' : 'border-zinc-700 hover:border-zinc-500'
                )}
              />
            ))}
          </div>
        </div>

        <div className={cn('flex flex-col gap-3', !hasSizeChoice && 'hidden')}>
          <span className='text-xs uppercase tracking-widest text-neutral-500'>Size</span>
          <div className='flex flex-wrap gap-2'>
            {product.sizes.map((option) => (
              <button
                key={option}
                type='button'
                aria-pressed={size === option}
                onClick={() => setSize(option)}
                className={cn(
                  'rounded-md border px-4 py-2 text-sm transition-colors',
                  size === option
                    ? 'border-white bg-white text-black'
                    : 'border-zinc-800 text-neutral-300 hover:border-zinc-600'
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-3'>
          <div className='flex items-center rounded-md border border-zinc-800'>
            <button
              type='button'
              aria-label='Decrease quantity'
              className='h-10 w-10 text-lg text-neutral-300 disabled:opacity-40'
              disabled={quantity <= 1}
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            >
              -
            </button>
            <span className='w-8 text-center text-sm'>{quantity}</span>
            <button
              type='button'
              aria-label='Increase quantity'
              className='h-10 w-10 text-lg text-neutral-300 disabled:opacity-40'
              disabled={quantity >= MAX_QUANTITY_PER_LINE}
              onClick={() => setQuantity((current) => Math.min(MAX_QUANTITY_PER_LINE, current + 1))}
            >
              +
            </button>
          </div>
          <Button variant='sexy' className='flex-1 sm:flex-none' onClick={() => handleAddToCart()}>
            {isExperience ? 'Add gift to bag' : 'Add to bag'}
          </Button>
          <Button variant='outline' onClick={() => handleAddToCart({ goToCart: true })}>
            Buy now
          </Button>
        </div>

        <dl className='flex flex-col gap-2 border-t border-zinc-800 pt-6 text-sm text-neutral-400'>
          <div className='flex gap-2'>
            <dt className='w-28 flex-shrink-0 text-neutral-500'>Details</dt>
            <dd>{product.description}</dd>
          </div>
          <div className='flex gap-2'>
            <dt className='w-28 flex-shrink-0 text-neutral-500'>Material</dt>
            <dd>{product.material}</dd>
          </div>
          {product.experience ? (
            <>
              <div className='flex gap-2'>
                <dt className='w-28 flex-shrink-0 text-neutral-500'>Suits</dt>
                <dd>{product.experience.forWhom}</dd>
              </div>
              <div className='flex gap-2'>
                <dt className='w-28 flex-shrink-0 text-neutral-500'>Arrives</dt>
                <dd>{product.experience.deliveredAs}</dd>
              </div>
              <div className='flex gap-2'>
                <dt className='w-28 flex-shrink-0 text-neutral-500'>Valid for</dt>
                <dd>{product.experience.validityMonths} months from the day it is bought.</dd>
              </div>
            </>
          ) : (
            <>
              <div className='flex gap-2'>
                <dt className='w-28 flex-shrink-0 text-neutral-500'>Front</dt>
                <dd>Discreet tone-on-tone {product.frontMark} mark</dd>
              </div>
              <div className='flex gap-2'>
                <dt className='w-28 flex-shrink-0 text-neutral-500'>Shipping</dt>
                <dd>Free standard shipping over {formatPrice(FREE_SHIPPING_THRESHOLD_CENTS)}. 30-day returns.</dd>
              </div>
            </>
          )}
        </dl>
      </div>
    </div>
  );
}
