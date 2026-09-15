import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getFeaturedProducts } from '@/features/store/catalog';
import { ProductCard } from '@/features/store/components/product-card';
import { companyConfig, constructMetadata, siteConfig } from '@/libs/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'About us',
  description: `${siteConfig.name} is a time optimization and extraordinary access ecosystem. What we do, how we work, and how membership works.`,
  path: '/about-us',
});

const PRINCIPLES = [
  {
    title: 'Time is the ultimate luxury',
    body: 'Everything else can be bought back. An afternoon is spent once, so spend it well.',
  },
  { title: 'Access beats ownership', body: 'The table, the room, the boat. Use it, enjoy it, pass it on.' },
  { title: 'Simplicity scales', body: 'One request, one answer. Simple is what makes it repeatable.' },
  { title: 'Trust compounds', body: 'We are told things in confidence. That is the whole business.' },
  { title: 'Experiences create memories', body: 'The evening is what stays. We build for the evening.' },
  { title: 'Community creates leverage', body: 'The members are the best part of the membership.' },
];

const HOW_WE_WORK = [
  { label: 'We anticipate', body: 'We learn how your week runs and handle the next thing before it lands on you.' },
  {
    label: 'We measure in hours',
    body: 'Every membership is judged on the time it hands back, and what you do with it.',
  },
  {
    label: 'We take it all the way',
    body: 'Travel, tables, logistics, the long errands. Handed over once, carried to done.',
  },
  {
    label: 'We keep the standard high',
    body: 'The standard is what gathers the members, and the members are the best part.',
  },
];

const STEPS = [
  {
    step: '01',
    title: 'Tell us what is eating your week',
    body: 'The bookings, the chasing, the admin, the standing errands worth handing over.',
  },
  {
    step: '02',
    title: 'We take it off your hands',
    body: 'One request, one answer, carried end to end. You stay out of the logistics.',
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
          Time is the one thing that gains value the moment you get it back. Secret Key is a time optimization and
          extraordinary access ecosystem for people who choose presence: we take the booking, the chasing and the
          arranging, and hand back the hours.
        </p>
        <p className='text-neutral-400'>
          We measure ourselves in minutes saved and minutes enjoyed — the hours our members get back, and what those
          hours become.
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
          <h2 className='font-alt text-3xl font-bold text-white'>What makes it work.</h2>
          <p className='max-w-2xl text-neutral-400'>Four habits that turn a membership into hours you can feel.</p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2'>
          {HOW_WE_WORK.map((item) => (
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
            Six principles. Every decision we make has to earn its place against them.
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
