import type { Metadata } from 'next';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

import { CookiePreferences } from '@/libs/analytics/cookie-preferences';
import { companyConfig, constructMetadata, siteConfig } from '@/libs/seo/metadata';

/**
 * Privacy policy.
 *
 * It describes exactly what this codebase does today: Supabase for accounts,
 * Stripe for payments and shipping details, Resend for email, and the tags in
 * `src/libs/analytics`. Keep it in step with the code when those change - and
 * have a lawyer review it against the final entity details in `companyConfig`
 * before launch.
 */
export const metadata: Metadata = constructMetadata({
  title: 'Privacy',
  description: `How ${siteConfig.name} collects, uses and protects your personal data, and how to exercise your rights.`,
  path: '/privacy',
});

const PROCESSORS = [
  { name: 'Supabase', role: 'Accounts, authentication and our database', location: 'EU / US' },
  { name: 'Stripe', role: 'Payments, subscriptions and shipping details', location: 'EU / US' },
  { name: 'Resend', role: 'Transactional email', location: 'EU / US' },
  { name: 'Vercel', role: 'Hosting and infrastructure logs', location: 'EU / US' },
  { name: 'Google (Tag Manager, Analytics, Ads)', role: 'Website measurement, with your consent', location: 'EU / US' },
  { name: 'Meta', role: 'Campaign measurement, with your consent', location: 'EU / US' },
];

const COOKIES = [
  {
    name: 'Authentication',
    purpose: 'Keeps you signed in to your member account.',
    basis: 'Strictly necessary',
    retention: 'Session, up to 1 year',
  },
  {
    name: 'Cart',
    purpose: 'Remembers what is in your shopping bag. Stored in your browser only.',
    basis: 'Strictly necessary',
    retention: 'Until you clear it',
  },
  {
    name: 'Consent choice',
    purpose: 'Remembers whether you accepted analytics cookies, so we stop asking.',
    basis: 'Strictly necessary',
    retention: 'Until you change it',
  },
  {
    name: 'Google Analytics / Tag Manager',
    purpose: 'Tells us which pages and products people actually use.',
    basis: 'Consent',
    retention: 'Up to 14 months',
  },
  {
    name: 'Meta pixel',
    purpose: 'Measures whether our campaigns bring the right people here.',
    basis: 'Consent',
    retention: 'Up to 13 months',
  },
];

export default function PrivacyPage() {
  return (
    <article className='mx-auto flex max-w-3xl flex-col gap-10 py-8 lg:py-16'>
      <header className='flex flex-col gap-3'>
        <span className='text-xs uppercase tracking-[0.3em] text-neutral-500'>Privacy</span>
        <h1>Your data, in plain language.</h1>
        <p className='text-lg text-neutral-400'>
          We are in the business of giving people their time back, so we will not waste yours here. This is what we
          collect, why, and how to make us stop.
        </p>
        <p className='text-sm text-neutral-500'>Last updated: {companyConfig.policyLastUpdated}</p>
      </header>

      <Section title='Who is responsible for your data'>
        <p>
          {companyConfig.legalName} (&ldquo;{siteConfig.name}&rdquo;, &ldquo;we&rdquo;) is the data controller for the
          personal data described here. Registered at {companyConfig.registeredAddress}, tax identification{' '}
          {companyConfig.taxId}.
        </p>
        <p>
          Questions, requests or complaints:{' '}
          <a className='underline underline-offset-4 hover:text-white' href={`mailto:${companyConfig.privacyEmail}`}>
            {companyConfig.privacyEmail}
          </a>
          .
        </p>
      </Section>

      <Section title='What we collect and why'>
        <ul className='flex list-disc flex-col gap-3 pl-5'>
          <li>
            <strong className='text-neutral-200'>Account details</strong> — your email address, and a name if you give
            us one. We need these to create your account and let you sign in. Legal basis: performance of our contract
            with you.
          </li>
          <li>
            <strong className='text-neutral-200'>Membership and billing</strong> — your plan, its status and your
            payment history. Card numbers are handled by Stripe and never reach our servers. Legal basis: contract and
            our legal obligation to keep accounting records.
          </li>
          <li>
            <strong className='text-neutral-200'>Orders from the shop</strong> — what you bought, your delivery address
            and your phone number, so the parcel arrives. Collected by Stripe Checkout and stored against your order.
            Legal basis: contract.
          </li>
          <li>
            <strong className='text-neutral-200'>Requests you send us</strong> — the things you ask us to arrange, and
            the correspondence around them. Legal basis: contract.
          </li>
          <li>
            <strong className='text-neutral-200'>How you use the site</strong> — pages viewed, products opened, items
            added to the bag, orders completed. This tells us which parts of the service are worth building on. Legal
            basis: your consent, through the cookie banner.
          </li>
          <li>
            <strong className='text-neutral-200'>Technical logs</strong> — IP address, browser and timestamps, kept by
            our hosting provider to keep the site secure and available. Legal basis: our legitimate interest in running
            a service that works and resists abuse.
          </li>
        </ul>
      </Section>

      <Section title='Cookies and measurement'>
        <p>
          Analytics and marketing cookies are switched <strong className='text-neutral-200'>off by default</strong>. We
          use Google Consent Mode, which means no measurement cookie is set until you accept, and declining costs you
          nothing: the site works the same either way.
        </p>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[560px] border-collapse text-sm'>
            <thead>
              <tr className='border-b border-zinc-800 text-left text-xs uppercase tracking-widest text-neutral-500'>
                <th className='py-3 pr-4 font-medium'>Cookie</th>
                <th className='py-3 pr-4 font-medium'>What it does</th>
                <th className='py-3 pr-4 font-medium'>Basis</th>
                <th className='py-3 font-medium'>Kept for</th>
              </tr>
            </thead>
            <tbody>
              {COOKIES.map((cookie) => (
                <tr key={cookie.name} className='border-b border-zinc-900 align-top'>
                  <td className='py-3 pr-4 text-neutral-200'>{cookie.name}</td>
                  <td className='py-3 pr-4'>{cookie.purpose}</td>
                  <td className='py-3 pr-4'>{cookie.basis}</td>
                  <td className='py-3'>{cookie.retention}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CookiePreferences />
      </Section>

      <Section title='Who else sees it'>
        <p>
          We do not sell your personal data. We share it only with the providers that make the service run, each under a
          data processing agreement and only for the purpose listed:
        </p>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[480px] border-collapse text-sm'>
            <thead>
              <tr className='border-b border-zinc-800 text-left text-xs uppercase tracking-widest text-neutral-500'>
                <th className='py-3 pr-4 font-medium'>Provider</th>
                <th className='py-3 pr-4 font-medium'>Purpose</th>
                <th className='py-3 font-medium'>Processing location</th>
              </tr>
            </thead>
            <tbody>
              {PROCESSORS.map((processor) => (
                <tr key={processor.name} className='border-b border-zinc-900 align-top'>
                  <td className='py-3 pr-4 text-neutral-200'>{processor.name}</td>
                  <td className='py-3 pr-4'>{processor.role}</td>
                  <td className='py-3'>{processor.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Where a provider processes data outside the European Economic Area, the transfer is covered by the European
          Commission&apos;s standard contractual clauses. We may also disclose data where the law requires it.
        </p>
      </Section>

      <Section title='How long we keep it'>
        <p>
          Account and membership data for as long as you are a member, and for six years after that where tax and
          accounting law requires it. Order records for the same period. Support correspondence for three years.
          Analytics data for up to fourteen months. Anything we no longer need is deleted or anonymised.
        </p>
      </Section>

      <Section title='Your rights'>
        <p>Under the GDPR you can ask us to:</p>
        <ul className='flex list-disc flex-col gap-2 pl-5'>
          <li>give you a copy of the data we hold about you, or send it to another provider;</li>
          <li>correct anything that is wrong;</li>
          <li>delete your data, where we have no obligation to keep it;</li>
          <li>restrict or object to how we use it, including profiling for marketing;</li>
          <li>withdraw your consent at any time — the cookie control above does exactly that.</li>
        </ul>
        <p>
          Write to{' '}
          <a className='underline underline-offset-4 hover:text-white' href={`mailto:${companyConfig.privacyEmail}`}>
            {companyConfig.privacyEmail}
          </a>{' '}
          and we will answer within one month. If you are not satisfied with our answer, you can complain to{' '}
          {companyConfig.supervisoryAuthority}.
        </p>
      </Section>

      <Section title='Children'>
        <p>
          Secret Key is for adults. We do not knowingly collect data from anyone under 18, and we delete it if we find
          that we have.
        </p>
      </Section>

      <Section title='Changes'>
        <p>
          When this policy changes materially we will say so on this page and, where it affects you, by email. The date
          at the top always reflects the current version.
        </p>
      </Section>

      <footer className='flex flex-col gap-3 border-t border-zinc-800 pt-8 text-sm text-neutral-400'>
        <p>
          Something here unclear? Ask us at{' '}
          <a className='underline underline-offset-4 hover:text-white' href={`mailto:${companyConfig.supportEmail}`}>
            {companyConfig.supportEmail}
          </a>
          .
        </p>
        <p>
          <Link href='/about-us' className='underline underline-offset-4 hover:text-white'>
            More about who we are
          </Link>
        </p>
      </footer>
    </article>
  );
}

function Section({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <section className='flex flex-col gap-4'>
      <h2 className='font-alt text-xl font-semibold text-white'>{title}</h2>
      <div className='flex flex-col gap-4 leading-relaxed text-neutral-400'>{children}</div>
    </section>
  );
}
