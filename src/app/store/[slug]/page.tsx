import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getAllProducts, getProductBySlug, STORE_CURRENCY } from '@/features/store/catalog';
import { ProductCard } from '@/features/store/components/product-card';
import { ProductDetail } from '@/features/store/components/product-detail';
import { constructMetadata, siteConfig } from '@/libs/seo/metadata';
import { getURL } from '@/utils/get-url';

export async function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return constructMetadata({ title: 'Product not found', path: '/store' });

  return constructMetadata({
    title: product.name,
    description: `${product.tagline} ${product.description}`.slice(0, 160),
    path: `/store/${product.slug}`,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  // Show like with like first, so a gift page suggests other gifts.
  const related = getAllProducts()
    .filter((item) => item.slug !== product.slug)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 4);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    category: product.category,
    brand: { '@type': 'Brand', name: siteConfig.name },
    material: product.material,
    offers: {
      '@type': 'Offer',
      url: getURL(`store/${product.slug}`),
      priceCurrency: STORE_CURRENCY.toUpperCase(),
      price: (product.priceCents / 100).toFixed(2),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: siteConfig.name },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Shop', item: getURL('store') },
      { '@type': 'ListItem', position: 2, name: product.name, item: getURL(`store/${product.slug}`) },
    ],
  };

  return (
    <div className='flex flex-col gap-16 py-8 lg:py-16'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav aria-label='Breadcrumb' className='text-sm text-neutral-500'>
        <Link href='/store' className='hover:text-neutral-300'>
          Shop
        </Link>
        <span className='px-2'>/</span>
        <span className='text-neutral-300'>{product.name}</span>
      </nav>

      <ProductDetail product={product} />

      <section className='flex flex-col gap-6'>
        <h2 className='font-alt text-xl font-semibold text-white'>Goes well with</h2>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
