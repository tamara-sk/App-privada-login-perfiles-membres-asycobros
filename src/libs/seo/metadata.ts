import type { Metadata } from 'next';

import { formatRegistry as formatLegalRegistry, legalConfig } from '@/features/legal/legal-config';
import { getURL } from '@/utils/get-url';

export const siteConfig = {
  name: 'Secret Key',
  shortName: 'SK',
  tagline: 'Convierte dinero en tiempo.',
  description:
    'Secret Key es un ecosistema de optimización del tiempo, acceso extraordinario y bienestar: un calendario global de experiencias por capítulos, una tienda local y acceso a propiedades seleccionadas de confianza y bienestar.',
  locale: 'es_ES',
  twitter: '@secretkey',
  keywords: [
    'secret key',
    'the circle',
    'optimización del tiempo',
    'acceso extraordinario',
    'bienestar',
    'experiencias',
  ],
} as const;

/**
 * Vista derivada de los datos identificativos, para los metadatos y el JSON-LD.
 *
 * La fuente única es `legalConfig` (`src/features/legal/legal-config.ts`), confirmada por
 * la certificación registral del 22/01/2026. Aquí se reexpone con los nombres que esperan
 * el esquema de `Organization` y las páginas de SEO, de modo que un cambio en la escritura
 * se toca en un solo sitio y aparece en todos.
 */
const { company, dataProtection } = legalConfig;

export const companyConfig = {
  legalName: company.legalName,
  registeredAddress: `${company.address.street}, ${company.address.postalCode} ${company.address.city}, ${company.address.province}, ${company.address.country}`,
  /** Forma estructurada del domicilio, para el esquema de `Organization`. */
  address: {
    street: company.address.street,
    postalCode: company.address.postalCode,
    city: company.address.city,
    region: company.address.province,
    /** Código ISO 3166-1 alfa-2, que es lo que pide schema.org. */
    country: 'ES',
  },
  taxId: company.taxId,
  /** Datos registrales (art. 10.1 b de la Ley 34/2002). */
  registry: {
    name: company.registry.name,
    sheet: company.registry.reference?.sheet ?? null,
    folio: company.registry.reference?.folio ?? null,
    entry: company.registry.reference?.entry ?? null,
    euid: company.registry.reference?.euid ?? null,
    registeredOn: company.registry.reference?.registeredOn ?? null,
  },
  shareCapital: company.shareCapital,
  cnae: company.cnae,
  governingBody: company.governingBody,
  operationsSince: company.operationsSince,
  privacyEmail: dataProtection.privacyEmail,
  supportEmail: company.supportEmail,
  phone: company.phone,
  supportPhone: company.supportPhone,
  /** Autoridad de control para reclamaciones de protección de datos. */
  supervisoryAuthority: `${dataProtection.supervisoryAuthority.name}, ${dataProtection.supervisoryAuthority.url}`,
  policyLastUpdated: legalConfig.lastUpdated,
} as const;

/** La línea registral tal y como debe publicarse (art. 10.1 b de la Ley 34/2002). */
export function formatRegistry(): string {
  return formatLegalRegistry();
}

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
