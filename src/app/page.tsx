import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { PricingSection } from '@/features/membership/components/pricing-section';
import { getFeaturedProducts } from '@/features/store/catalog';
import { ProductCard } from '@/features/store/components/product-card';

export default async function HomePage() {
  return (
    <div className='flex flex-col gap-8 lg:gap-32'>
      <HeroSection />
      <PillarsSection />
      <ShopSection />
      <PricingSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className='relative overflow-hidden lg:overflow-visible'>
      <Container className='relative rounded-lg bg-black py-20 lg:py-[140px]'>
        <div className='relative z-10 flex flex-col items-start gap-5 lg:max-w-xl lg:pl-8'>
          <div className='w-fit rounded-full bg-gradient-to-r from-[#616571] via-[#7782A9] to-[#826674] px-4 py-1'>
            <span className='font-alt text-sm font-semibold text-black mix-blend-soft-light'>
              A time optimization and access ecosystem
            </span>
          </div>
          <h1>Turn money into time.</h1>
          <p className='max-w-lg text-lg text-neutral-300'>
            Secret Key hands back the hours your week spends on booking, chasing and waiting. What you do with them is
            the interesting part.
          </p>
          <div className='flex flex-wrap items-center gap-3'>
            <Button asChild variant='sexy'>
              <Link href='/pricing'>Become a member</Link>
            </Button>
            <Button asChild variant='outline'>
              <Link href='/store'>Visit the shop</Link>
            </Button>
          </div>
        </div>
      </Container>
      <Image
        src='/hero-shape.png'
        width={867}
        height={790}
        alt=''
        className='absolute right-0 top-0 rounded-tr-lg'
        sizes='(max-width: 1024px) 100vw, 867px'
        priority
        quality={85}
      />
    </section>
  );
}

function PillarsSection() {
  const pillars = [
    {
      title: 'Minutes saved',
      body: 'One request, one answer. Reservations, travel, logistics and the hundred small errands that quietly eat a week.',
    },
    {
      title: 'Extraordinary access',
      body: 'Tables, rooms, seats and rooms full of interesting people. Access beats ownership, every single time.',
    },
    {
      title: 'A community that compounds',
      body: 'Members who share what works. The network grows richer with every introduction.',
    },
  ];

  return (
    <section className='grid gap-4 sm:grid-cols-3'>
      {pillars.map((pillar) => (
        <div key={pillar.title} className='flex flex-col gap-2 rounded-lg border border-zinc-800 bg-black p-6'>
          <h2 className='font-alt text-lg font-semibold text-white'>{pillar.title}</h2>
          <p className='text-sm text-neutral-400'>{pillar.body}</p>
        </div>
      ))}
    </section>
  );
}

function ShopSection() {
  const products = getFeaturedProducts().slice(0, 3);

  return (
    <section className='flex flex-col gap-8'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div className='flex flex-col gap-2'>
          <span className='text-xs uppercase tracking-[0.3em] text-neutral-500'>The Shop</span>
          <h2 className='font-alt text-3xl font-bold text-white lg:text-4xl'>Words worth wearing.</h2>
          <p className='max-w-xl text-neutral-400'>
            Discreet on the front. Generous on the back. And for the people who have everything,{' '}
            <Link href='/store?category=experience' className='underline underline-offset-4 hover:text-white'>
              gifts that hand back their time
            </Link>
            .
          </p>
        </div>
        <Button variant='outline' asChild>
          <Link href='/store'>Shop everything</Link>
        </Button>
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
