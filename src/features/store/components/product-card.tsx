import Link from 'next/link';

import { CATEGORY_LABELS } from '../catalog';
import type { StoreProduct } from '../types';
import { formatPrice } from '../utils/format-price';

import { MerchPreview } from './merch-preview';

export function ProductCard({ product }: { product: StoreProduct }) {
  return (
    <Link
      href={`/store/${product.slug}`}
      className='group flex flex-col gap-3 rounded-lg border border-zinc-800 bg-black p-3 transition-colors hover:border-zinc-600'
    >
      <div className='relative'>
        <MerchPreview product={product} view='back' className='transition-transform group-hover:scale-[1.01]' />
        {product.badge && (
          <span className='absolute left-3 top-3 z-10 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-black'>
            {product.badge}
          </span>
        )}
      </div>
      <div className='flex flex-1 flex-col gap-1 px-1 pb-1'>
        <span className='text-[11px] uppercase tracking-widest text-neutral-500'>
          {CATEGORY_LABELS[product.category]}
        </span>
        <h3 className='font-alt text-base font-semibold text-white'>{product.name}</h3>
        <p className='flex-1 text-sm text-neutral-400'>{product.tagline}</p>
        <div className='flex items-baseline gap-2 pt-1'>
          <span className='font-semibold text-white'>{formatPrice(product.priceCents)}</span>
          {product.compareAtCents && (
            <span className='text-sm text-neutral-500 line-through'>{formatPrice(product.compareAtCents)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
