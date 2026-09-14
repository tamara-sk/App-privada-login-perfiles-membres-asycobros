import type { Metadata } from 'next';

import { getURL } from '@/utils/get-url';

export const siteConfig = {
  name: 'Secret Key',
  shortName: 'SK',
  tagline: 'Turn money into time.',
  description:
    'Secret Key is a time optimization and extraordinary access ecosystem. Membership, experiences and a small shop of objects that say something worth reading.',
  locale: 'en_GB',
  twitter: '@secretkey',
  keywords: [
    'secret key',
    'time optimization',
    'private membership',
    'extraordinary access',
    'members club',
    'lifestyle management',
  ],
} as const;

/**
 * Single source of truth for page metadata: title template, canonical URL,
 * Open Graph and Twitter cards. Every page should build its metadata here so
 * social previews and canonicals can never drift apart.
 */
export function constructMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const url = getURL(path.replace(/^\//, ''));
  const resolvedTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} - ${siteConfig.tagline}`;

  return {
    title: resolvedTitle,
    description,
    keywords: [...siteConfig.keywords],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: resolvedTitle,
      description,
      url,
      // Falls back to the generated app/opengraph-image when none is supplied.
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: siteConfig.name }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      ...(image ? { images: [image] } : {}),
      creator: siteConfig.twitter,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
  };
}
