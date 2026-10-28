import Image from 'next/image';

import { formatPrice } from '@/utils/format-price';

import {
  isSecretKeyPromoOpen,
  MASTER_KEY_MONTHLY_AMOUNT,
  PLANS,
  SECRET_KEY_REGULAR_ANNUAL_AMOUNT,
  SECRET_KEY_REGULAR_MONTHLY_AMOUNT,
  WISDOM_KEY,
} from '../plans';

import { PlanCard } from './plan-card';

export async function PricingSection({ isPricingPage }: { isPricingPage?: boolean }) {
  const HeadingLevel = isPricingPage ? 'h1' : 'h2';

  return (
    <section className='relative rounded-lg bg-black py-8'>
      <div className='relative z-10 m-auto flex max-w-[1200px] flex-col items-center gap-8 px-4 pt-8 lg:pt-[140px]'>
        <HeadingLevel className='max-w-4xl bg-gradient-to-br from-white to-neutral-200 bg-clip-text text-center text-4xl font-bold text-transparent lg:text-6xl'>
          La entrada al Círculo
        </HeadingLevel>
        <p className='text-center text-xl'>
          Elige el ritmo al que quieres recuperar tu tiempo. Cada entrada dura un año.
        </p>
        <div className='flex w-full flex-col items-center justify-center gap-2 lg:flex-row lg:gap-8'>
          {PLANS.map((plan) => (
            <PlanCard key={plan.slug} plan={plan} />
          ))}
        </div>
        <div className='flex max-w-3xl flex-col gap-2 text-center text-sm text-neutral-400'>
          {isSecretKeyPromoOpen() && (
            <p>
              Secret Key a {formatPrice(PLANS[1].annualAmount, 'eur')}/año es el precio de esta temporada. La puerta
              sigue abierta hasta el 31 de diciembre de 2026. La primera renovación llega al cumplir tu año, a 220
              €/año. Para las altas desde el 1 de enero de 2027, Secret Key es de{' '}
              {formatPrice(SECRET_KEY_REGULAR_ANNUAL_AMOUNT, 'eur')}/año o{' '}
              {formatPrice(SECRET_KEY_REGULAR_MONTHLY_AMOUNT, 'eur')}
              /mes.
            </p>
          )}
          <p>
            Master Key: {formatPrice(PLANS[2].annualAmount, 'eur')}/año o{' '}
            {formatPrice(MASTER_KEY_MONTHLY_AMOUNT, 'eur')}/mes. Wisdom Key:{' '}
            {formatPrice(WISDOM_KEY.annualAmount, 'eur')}/año. El cobro mensual y la renovación automática llegan con el
            pago por referencia de BBVA.
          </p>
          <p>
            El acceso se solicita primero. Cuando se aprueba, eliges tu entrada y la pagas dentro. Cada Llavecita vale
            0,10 €.
          </p>
        </div>
      </div>
      <Image
        src='/section-bg.png'
        width={1440}
        height={462}
        alt=''
        className='absolute left-0 top-0 rounded-t-lg'
        priority={isPricingPage}
        quality={100}
      />
    </section>
  );
}
