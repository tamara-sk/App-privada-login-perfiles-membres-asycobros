import type { MetadataRoute } from 'next';

import { getURL } from '@/utils/get-url';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // El área privada y las rutas transaccionales quedan fuera del índice.
      // Los textos legales sí se indexan: el art. 10 LSSI pide acceso permanente,
      // fácil, directo y gratuito, y el buscador es una de esas vías.
      disallow: [
        '/account',
        '/pago',
        '/store/cart',
        '/store/checkout',
        '/store/pago',
        '/store/success',
        '/manage-subscription',
        '/api/',
      ],
    },
    sitemap: getURL('sitemap.xml'),
    host: getURL(),
  };
}
