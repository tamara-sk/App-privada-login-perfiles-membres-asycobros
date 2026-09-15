import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getFeaturedProducts } from '@/features/store/catalog';
import { ProductCard } from '@/features/store/components/product-card';
import { companyConfig, constructMetadata, siteConfig } from '@/libs/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'About us',
  description: `${siteConfig.name} is a time optimization and extraordinary access ecosystem. What we do, what we refuse to be, and how membership works.`,
  path: '/about-us',
});

const PRINCIPLES = [
  { title: 'Time is the ultimate luxury', body: 'Everything else can be bought back. An afternoon cannot.' },
  { title: 'Access beats ownership', body: 'The table, the room, the boat. Use it, do not store it.' },
  { title: 'Simplicity scales', body: 'One request, one answer. Complexity is a tax we refuse to pass on.' },
  { title: 'Trust compounds', body: 'We are told things in confidence. That is the whole business.' },
  { title: 'Experiences create memories', body: 'Nobody remembers the errand. Everybody remembers the evening.' },
  { title: 'Community creates leverage', body: 'The members are the best part of the membership.' },
];

const NOT_THIS = [
  { label: 'Not a concierge', body: 'A concierge waits to be asked. We remove the asking.' },
  { label: 'Not a luxury club', body: 'The membership card is not the point. The hours it returns are.' },
  { label: 'Not a travel agency', body: 'Travel is one of the things we handle, not the reason we exist.' },
  { label: 'Not a networking group', body: 'The community is a consequence of the standard, not the product.' },
];

const STEPS = [
  {
    step: '01',
    title: 'Tell us what is eating your week',
    body: 'The bookings, the chasing, the admin, the things you keep postponing.',
  },
  {
    step: '02',
    title: 'We take it off your hands',
    body: 'One request, one answer, handled end to end. No project management from you.',
  },
  {
    step: '03',
    title: 'You get the hours back',
    body: 'We measure the minutes we return. It is the only number that matters to us.',
  },
];

export default function AboutUsPage() {
  const products = getFeaturedProducts().slice(0, 3);

  return (
    <div className='flex flex-col gap-16 py-8 lg:gap-24 lg:py-16'>
      <header className='flex max-w-3xl flex-col gap-5'>
        <span className='text-xs uppercase tracking-[0.3em] text-neutral-500'>About us</span>
        <h1>We are in the time business.</h1>
        <p className='text-lg text-neutral-300'>
          Everyone says they want more of it, and then spends it on hold, in queues, in three-message threads about a
          reservation. Secret Key exists to take that back: a time optimization and extraordinary access ecosystem for
          people who would rather be present than busy.
        </p>
        <p className='text-neutral-400'>
          We do not measure ourselves in revenue. We measure ourselves in minutes saved and minutes enjoyed — the hours
          our members got back, and what those hours turned into.
        </p>
      </header>

      <section className='grid gap-4 sm:grid-cols-3'>
        {STEPS.map((item) => (
          <div key={item.step} className='flex flex-col gap-2 rounded-lg border border-zinc-800 bg-black p-6'>
            <span className='font-alt text-sm text-neutral-500'>{item.step}</span>
            <h2 className='font-alt text-lg font-semibold text-white'>{item.title}</h2>
            <p className='text-sm text-neutral-400'>{item.body}</p>
          </div>
        ))}
      </section>

      <section className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <h2 className='font-alt text-3xl font-bold text-white'>What we are not.</h2>
          <p className='max-w-2xl text-neutral-400'>
            Saying it out loud keeps us honest, and saves you a conversation.
          </p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2'>
          {NOT_THIS.map((item) => (
            <div key={item.label} className='flex flex-col gap-1 rounded-lg border border-zinc-800 bg-black p-6'>
              <h3 className='font-alt text-base font-semibold text-white'>{item.label}</h3>
              <p className='text-sm text-neutral-400'>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <h2 className='font-alt text-3xl font-bold text-white'>What we believe.</h2>
          <p className='max-w-2xl text-neutral-400'>
            Six principles. Every decision we make has to survive them, including the ones that would make us money.
          </p>
        </div>
        <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {PRINCIPLES.map((principle) => (
            <li key={principle.title} className='flex flex-col gap-1 rounded-lg border border-zinc-800 bg-black p-6'>
              <h3 className='font-alt text-base font-semibold text-white'>{principle.title}</h3>
              <p className='text-sm text-neutral-400'>{principle.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className='flex flex-col gap-6'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
          <div className='flex flex-col gap-2'>
            <h2 className='font-alt text-3xl font-bold text-white'>Things we made.</h2>
            <p className='max-w-xl text-neutral-400'>
              The same belief, printed. Discreet on the front, generous on the back — starting with a sentence for
              whoever is standing behind you.
            </p>
          </div>
          <Button variant='outline' asChild>
            <Link href='/store'>Visit the shop</Link>
          </Button>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className='flex flex-col items-start gap-5 rounded-lg border border-zinc-800 bg-black p-8 lg:p-12'>
        <h2 className='font-alt text-3xl font-bold text-white'>Come and get your time back.</h2>
        <p className='max-w-2xl text-neutral-400'>
          Membership is deliberately small so the answer is always fast. If that sounds like what you have been missing,
          start here — or write to us first at{' '}
          <a className='underline underline-offset-4 hover:text-white' href={`mailto:${companyConfig.supportEmail}`}>
            {companyConfig.supportEmail}
          </a>
          .
        </p>
        <div className='flex flex-wrap gap-3'>
          <Button variant='sexy' asChild>
            <Link href='/pricing'>See membership</Link>
          </Button>
          <Button variant='outline' asChild>
            <Link href='/privacy'>How we handle your data</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
