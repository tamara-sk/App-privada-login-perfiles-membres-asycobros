import type { MetadataRoute } from 'next';

import { getURL } from '@/utils/get-url';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Private or transactional routes have nothing to offer a search engine.
      disallow: ['/account', '/store/cart', '/store/success', '/manage-subscription', '/api/'],
    },
    sitemap: getURL('sitemap.xml'),
    host: getURL(),
  };
}
