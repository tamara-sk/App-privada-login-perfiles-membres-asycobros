import type { MetadataRoute } from 'next';

import { legalConfig } from '@/features/legal/legal-config';
import { legalDocuments } from '@/features/legal/legal-documents';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = legalConfig.brand.siteUrl.replace(/\/$/, '');
  const lastModified = new Date(legalConfig.lastUpdated);

  const publicRoutes = ['/', '/pricing', '/legal'];

  return [...publicRoutes, ...legalDocuments.map((doc) => doc.href)].map((route) => ({
    url: `${baseUrl}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.5,
  }));
}
