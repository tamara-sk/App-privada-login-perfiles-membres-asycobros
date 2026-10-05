import type { MetadataRoute } from 'next';

import { legalConfig } from '@/features/legal/legal-config';
import { legalDocuments } from '@/features/legal/legal-documents';
import { getAllProducts } from '@/features/store/catalog';
import { getURL } from '@/utils/get-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const legalLastModified = new Date(legalConfig.lastUpdated);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: getURL(), changeFrequency: 'weekly', priority: 1, lastModified },
    { url: getURL('store'), changeFrequency: 'weekly', priority: 0.9, lastModified },
    { url: getURL('pricing'), changeFrequency: 'monthly', priority: 0.8, lastModified },
    { url: getURL('about-us'), changeFrequency: 'monthly', priority: 0.6, lastModified },
    { url: getURL('signup'), changeFrequency: 'yearly', priority: 0.5, lastModified },
    { url: getURL('login'), changeFrequency: 'yearly', priority: 0.3, lastModified },
  ];

  const productRoutes: MetadataRoute.Sitemap = getAllProducts().map((product) => ({
    url: getURL(`store/${product.slug}`),
    changeFrequency: 'weekly',
    priority: 0.7,
    lastModified,
  }));

  // El índice legal y cada documento exigido por la Ley 34/2002.
  const legalRoutes: MetadataRoute.Sitemap = ['/legal', ...legalDocuments.map((doc) => doc.href)].map((route) => ({
    url: getURL(route),
    changeFrequency: 'monthly',
    priority: 0.4,
    lastModified: legalLastModified,
  }));

  return [...staticRoutes, ...productRoutes, ...legalRoutes];
}
