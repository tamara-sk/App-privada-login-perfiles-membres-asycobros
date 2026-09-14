import type { MetadataRoute } from 'next';

import { getAllProducts } from '@/features/store/catalog';
import { getURL } from '@/utils/get-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: getURL(), changeFrequency: 'weekly', priority: 1, lastModified },
    { url: getURL('store'), changeFrequency: 'weekly', priority: 0.9, lastModified },
    { url: getURL('pricing'), changeFrequency: 'monthly', priority: 0.8, lastModified },
    { url: getURL('signup'), changeFrequency: 'yearly', priority: 0.5, lastModified },
    { url: getURL('login'), changeFrequency: 'yearly', priority: 0.3, lastModified },
  ];

  const productRoutes: MetadataRoute.Sitemap = getAllProducts().map((product) => ({
    url: getURL(`store/${product.slug}`),
    changeFrequency: 'weekly',
    priority: 0.7,
    lastModified,
  }));

  return [...staticRoutes, ...productRoutes];
}
