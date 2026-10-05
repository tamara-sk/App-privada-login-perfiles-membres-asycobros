import type { Metadata } from 'next';
import Link from 'next/link';

import { CATEGORY_LABELS, FREE_SHIPPING_THRESHOLD_CENTS, getAllProducts } from '@/features/store/catalog';
import { ProductCard } from '@/features/store/components/product-card';
import { StoreListTracker } from '@/features/store/components/store-list-tracker';
import type { StoreCategory } from '@/features/store/types';
import { formatPrice } from '@/features/store/utils/format-price';
import { constructMetadata } from '@/libs/seo/metadata';
import { cn } from '@/utils/cn';
import { getURL } from '@/utils/get-url';

export const metadata: Metadata = constructMetadata({
  title: 'Shop',
  description:
    'Caps, tees and everyday objects carrying phrases worth reading, plus experience packs that gift somebody their time back. Free shipping over 90 euro across Europe.',
  path: '/store',
});

const FILTERS: { value: 'all' | StoreCategory; label: string }[] = [
  { value: 'all', label: 'Everything' },
  { value: 'experience', label: CATEGORY_LABELS.experience },
  { value: 'headwear', label: CATEGORY_LABELS.headwear },
  { value: 'apparel', label: CATEGORY_LABELS.apparel },
  { value: 'everyday', label: CATEGORY_LABELS.everyday },
];

export default async function StorePage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const activeFilter = FILTERS.find((filter) => filter.value === category)?.value ?? 'all';
  const products = getAllProducts()
    .filter((product) => activeFilter === 'all' || product.category === activeFilter)
    // Experience packs lead: they are the reason most people arrive with a gift in mind.
    .sort((a, b) => Number(b.category === 'experience') - Number(a.category === 'experience'));

  return (
    <div className='flex flex-col gap-10 py-8 lg:py-16'>
      <StoreListTracker listName={`store_${activeFilter}`} products={products} />

      <header className='flex flex-col gap-4'>
        <span className='text-xs uppercase tracking-[0.3em] text-neutral-500'>The Shop</span>
        <h1 className='max-w-3xl'>Words worth wearing.</h1>
        <p className='max-w-2xl text-lg text-neutral-400'>
          Objects that say something kind to the person standing behind you, and gifts that hand somebody their week
          back. Discreet on the front. Generous on the back. Free standard shipping over{' '}
          {formatPrice(FREE_SHIPPING_THRESHOLD_CENTS)}.
        </p>
      </header>

      <nav className='flex flex-wrap gap-2' aria-label='Product categories'>
        {FILTERS.map((filter) => (
          <Link
            key={filter.value}
            href={filter.value === 'all' ? '/store' : `/store?category=${filter.value}`}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm transition-colors',
              activeFilter === filter.value
                ? 'border-white bg-white text-black'
                : 'border-zinc-800 text-neutral-300 hover:border-zinc-600'
            )}
          >
            {filter.label}
          </Link>
        ))}
      </nav>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'The Secret Key shop',
            numberOfItems: products.length,
            itemListElement: products.map((product, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: getURL(`store/${product.slug}`),
              name: product.name,
            })),
          }),
        }}
      />

      <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </section>

      <section className='grid gap-4 rounded-lg border border-zinc-800 bg-black p-6 sm:grid-cols-3'>
        <Benefit
          title='Made to outlast trends'
          body='Heavy fabrics, tonal prints, one long life. Buy once, wear for years.'
        />
        <Benefit
          title='Gifts that arrive in minutes'
          body='Experience packs reach the inbox straight away, ready to forward or print.'
        />
        <Benefit title='30-day returns' body='Wrong size, wrong mood - send it back within 30 days and we sort it.' />
      </section>
    </div>
  );
}

function Benefit({ title, body }: { title: string; body: string }) {
  return (
    <div className='flex flex-col gap-1'>
      <h2 className='font-alt text-sm font-semibold text-white'>{title}</h2>
      <p className='text-sm text-neutral-400'>{body}</p>
    </div>
  );
}
