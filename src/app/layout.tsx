import { PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';
import { Montserrat, Montserrat_Alternates } from 'next/font/google';
import Link from 'next/link';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io5';

import { Logo } from '@/components/logo';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/features/store/components/cart-provider';
import { AnalyticsProvider } from '@/libs/analytics/analytics-provider';
import { ConsentBanner } from '@/libs/analytics/consent-banner';
import { consentBootstrapScript } from '@/libs/analytics/consent-script';
import { companyConfig, constructMetadata, siteConfig } from '@/libs/seo/metadata';
import { cn } from '@/utils/cn';
import { getURL } from '@/utils/get-url';
import { Analytics } from '@vercel/analytics/react';

import { Navigation } from './navigation';

import '@/styles/globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
});

const montserratAlternates = Montserrat_Alternates({
  variable: '--font-montserrat-alternates',
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  ...constructMetadata(),
};

export const viewport: Viewport = {
  themeColor: '#18181b',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: getURL(),
  logo: getURL('logo.png'),
  description: siteConfig.description,
  slogan: siteConfig.tagline,
  legalName: companyConfig.legalName,
  taxID: companyConfig.taxId,
  address: {
    '@type': 'PostalAddress',
    streetAddress: companyConfig.address.street,
    postalCode: companyConfig.address.postalCode,
    addressLocality: companyConfig.address.city,
    addressRegion: companyConfig.address.region,
    addressCountry: companyConfig.address.country,
  },
  email: companyConfig.supportEmail,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <head>
        {/* Warm up the tag endpoints so the first measurement hit is not the slowest. */}
        <link rel='preconnect' href='https://www.googletagmanager.com' />
        <link rel='dns-prefetch' href='https://www.google-analytics.com' />
        {/* Consent defaults must be set before any tag loads. */}
        <script dangerouslySetInnerHTML={{ __html: consentBootstrapScript }} />
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </head>
      <body className={cn('font-sans antialiased', montserrat.variable, montserratAlternates.variable)}>
        <AnalyticsProvider />
        <CartProvider>
          <a
            href='#main-content'
            className='sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black'
          >
            Skip to content
          </a>
          <div className='m-auto flex h-full max-w-[1440px] flex-col px-4'>
            <AppBar />
            <main id='main-content' className='relative flex-1'>
              <div className='relative h-full'>{children}</div>
            </main>
            <Footer />
          </div>
          <Toaster />
          <ConsentBanner />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}

async function AppBar() {
  return (
    <header className='flex items-center justify-between py-8'>
      <Logo />
      <Navigation />
    </header>
  );
}

function Footer() {
  return (
    <footer className='mt-8 flex flex-col gap-8 text-neutral-400 lg:mt-32'>
      <div className='flex flex-col justify-between gap-8 lg:flex-row'>
        <div className='flex flex-col gap-3'>
          <Logo />
          <p className='max-w-xs text-sm'>{siteConfig.tagline}</p>
        </div>
        <div className='grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-4 lg:gap-16'>
          <div className='flex flex-col gap-2 lg:gap-6'>
            <div className='font-semibold text-neutral-100'>Membership</div>
            <nav className='flex flex-col gap-2 lg:gap-6'>
              <Link href='/pricing'>Pricing</Link>
              <Link href='/account'>My account</Link>
            </nav>
          </div>
          <div className='flex flex-col gap-2 lg:gap-6'>
            <div className='font-semibold text-neutral-100'>Shop</div>
            <nav className='flex flex-col gap-2 lg:gap-6'>
              <Link href='/store'>All products</Link>
              <Link href='/store?category=headwear'>Headwear</Link>
              <Link href='/store?category=apparel'>Apparel</Link>
            </nav>
          </div>
          <div className='flex flex-col gap-2 lg:gap-6'>
            <div className='font-semibold text-neutral-100'>Company</div>
            <nav className='flex flex-col gap-2 lg:gap-6'>
              <Link href='/about-us'>About us</Link>
              <Link href='/privacy'>Privacy</Link>
            </nav>
          </div>
          <div className='flex flex-col gap-2 lg:gap-6'>
            <div className='font-semibold text-neutral-100'>Follow us</div>
            <nav className='flex flex-col gap-2 lg:gap-6'>
              <Link href='#' aria-label='Twitter'>
                <span className='flex items-center gap-2'>
                  <IoLogoTwitter size={22} /> <span>Twitter</span>
                </span>
              </Link>
              <Link href='#' aria-label='Facebook'>
                <span className='flex items-center gap-2'>
                  <IoLogoFacebook size={22} /> <span>Facebook</span>
                </span>
              </Link>
              <Link href='#' aria-label='Instagram'>
                <span className='flex items-center gap-2'>
                  <IoLogoInstagram size={22} /> <span>Instagram</span>
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className='border-t border-zinc-800 py-6 text-center'>
        <span className='text-xs text-neutral-500'>
          Copyright {new Date().getFullYear()} © {siteConfig.name}
        </span>
      </div>
    </footer>
  );
}
