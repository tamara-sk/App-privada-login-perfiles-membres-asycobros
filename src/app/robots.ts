import type { MetadataRoute } from 'next';

import { legalConfig } from '@/features/legal/legal-config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = legalConfig.brand.siteUrl.replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // El área privada de miembros no debe indexarse; los textos legales sí.
      disallow: ['/account', '/login', '/signup', '/manage-subscription'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
