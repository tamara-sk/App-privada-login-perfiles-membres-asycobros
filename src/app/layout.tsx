import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Montserrat, Montserrat_Alternates } from 'next/font/google';
import Link from 'next/link';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io5';

import { Logo } from '@/components/logo';
import { Toaster } from '@/components/ui/toaster';
import { CookieConsent } from '@/features/legal/components/cookie-consent';
import { legalConfig } from '@/features/legal/legal-config';
import { legalDocuments } from '@/features/legal/legal-documents';
import { cn } from '@/utils/cn';

import { Navigation } from './navigation';

import '@/styles/globals.css';

export const dynamic = 'force-dynamic';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const montserratAlternates = Montserrat_Alternates({
  variable: '--font-montserrat-alternates',
  weight: ['500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Secret Key',
  description: 'Ecosistema de optimización del tiempo y acceso extraordinario.',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='es'>
      <body className={cn('font-sans antialiased', montserrat.variable, montserratAlternates.variable)}>
        <div className='m-auto flex h-full max-w-[1440px] flex-col px-4'>
          <AppBar />
          <main className='relative flex-1'>
            <div className='relative h-full'>{children}</div>
          </main>
          <Footer />
        </div>
        <Toaster />
        <CookieConsent />
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
        <div>
          <Logo />
        </div>
        <div className='grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-4 lg:gap-16'>
          <div className='flex flex-col gap-2 lg:gap-6'>
            <div className='font-semibold text-neutral-100'>Product</div>
            <nav className='flex flex-col gap-2 lg:gap-6'>
              <Link href='/pricing'>Pricing</Link>
            </nav>
          </div>
          <div className='flex flex-col gap-2 lg:gap-6'>
            <div className='font-semibold text-neutral-100'>Legal</div>
            <nav className='flex flex-col gap-2 lg:gap-6'>
              {legalDocuments
                .filter((doc) => doc.href !== '/contacto')
                .map((doc) => (
                  <Link key={doc.href} href={doc.href}>
                    {doc.title}
                  </Link>
                ))}
            </nav>
          </div>
          <div className='flex flex-col gap-2 lg:gap-6'>
            <div className='font-semibold text-neutral-100'>Soporte</div>
            <nav className='flex flex-col gap-2 lg:gap-6'>
              <Link href='/contacto'>Contacto</Link>
              <Link href='/legal'>Información legal</Link>
            </nav>
          </div>
          <div className='flex flex-col gap-2 lg:gap-6'>
            <div className='font-semibold text-neutral-100'>Follow us</div>
            <nav className='flex flex-col gap-2 lg:gap-6'>
              <Link href='#'>
                <span className='flex items-center gap-2'>
                  <IoLogoTwitter size={22} /> <span>Twitter</span>
                </span>
              </Link>
              <Link href='#'>
                <span className='flex items-center gap-2'>
                  <IoLogoFacebook size={22} /> <span>Facebook</span>
                </span>
              </Link>
              <Link href='#'>
                <span className='flex items-center gap-2'>
                  <IoLogoInstagram size={22} /> <span>Instagram</span>
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center gap-2 border-t border-zinc-800 py-6 text-center'>
        <span className='text-xs text-neutral-400'>
          {new Date().getFullYear()} © {legalConfig.company.legalName} · NIF {legalConfig.company.taxId}
        </span>
        <span className='text-xs text-neutral-500'>
          Información legal accesible de forma permanente conforme al art. 10 de la Ley 34/2002 (LSSI-CE).
        </span>
      </div>
    </footer>
  );
}
