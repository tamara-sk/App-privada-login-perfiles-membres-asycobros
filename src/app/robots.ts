import type { MetadataRoute } from 'next';

import { legalConfig } from '@/features/legal/legal-config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = legalConfig.brand.siteUrl.replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // El área privada del Círculo queda fuera del índice; los textos legales sí se indexan.
      disallow: ['/account', '/login', '/signup', '/manage-subscription'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
