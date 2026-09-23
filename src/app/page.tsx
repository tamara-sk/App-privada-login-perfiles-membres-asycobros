import Image from 'next/image';
import Link from 'next/link';
import { IoCalendarOutline, IoKeyOutline, IoSparklesOutline, IoTimeOutline } from 'react-icons/io5';

import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { legalConfig } from '@/features/legal/legal-config';
import { PricingSection } from '@/features/membership/components/pricing-section';

export default async function HomePage() {
  return (
    <div className='flex flex-col gap-8 lg:gap-32'>
      <HeroSection />
      <PillarsSection />
      <HowItWorksSection />
      <PricingSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className='relative overflow-hidden lg:overflow-visible'>
      <Container className='relative rounded-lg bg-black py-20 lg:py-[140px]'>
        <div className='relative z-10 flex flex-col gap-5 lg:max-w-xl lg:pl-8'>
          <div className='w-fit rounded-full bg-gradient-to-r from-[#616571] via-[#7782A9] to-[#826674] px-4 py-1'>
            <span className='font-alt text-sm font-semibold text-black mix-blend-soft-light'>
              Membresía privada · Solo por invitación
            </span>
          </div>
          <h1>Convierte dinero en tiempo.</h1>
          <p className='max-w-lg text-lg text-neutral-300'>
            {legalConfig.brand.name} es un ecosistema de optimización del tiempo, acceso extraordinario y bienestar.
            Nos ocupamos de lo que te resta horas y te abrimos puertas que están fuera de los buscadores.
          </p>
          <Button asChild variant='sexy'>
            <Link href='/signup'>Solicitar acceso</Link>
          </Button>
        </div>
      </Container>
      <Image
        src='/hero-shape.png'
        width={867}
        height={790}
        alt=''
        className='absolute right-0 top-0 rounded-tr-lg'
        priority
        quality={100}
      />
    </section>
  );
}

const pillars = [
  {
    icon: IoTimeOutline,
    title: 'Tiempo recuperado',
    description:
      'Delegas la gestión, las reservas y la logística. Cada semana vuelven a tu agenda las horas que antes se iban en organizar.',
  },
  {
    icon: IoKeyOutline,
    title: 'Acceso extraordinario',
    description:
      'Mesas, espacios y experiencias que no aparecen en ninguna plataforma pública. El acceso vale más que la propiedad.',
  },
  {
    icon: IoSparklesOutline,
    title: 'Experiencias que recuerdas',
    description:
      'Cada propuesta está diseñada para crear memoria. Pocos planes, elegidos con criterio, en lugares que se cuidan.',
  },
  {
    icon: IoCalendarOutline,
    title: 'El Círculo',
    description:
      'Personas que comparten criterio y tiempo. Los encuentros son reducidos y la confianza es la moneda de cambio.',
  },
];

function PillarsSection() {
  return (
    <section className='flex flex-col gap-8 rounded-lg bg-black px-4 py-16 lg:px-12'>
      <div className='flex flex-col gap-4'>
        <h2 className='font-alt text-3xl font-bold text-white lg:text-4xl'>El tiempo es el lujo definitivo.</h2>
        <p className='max-w-2xl text-lg text-neutral-300'>
          Un ecosistema que se mide en horas devueltas. Nos ocupamos de la gestión, las reservas y los detalles, y tú
          decides en qué se convierte ese tiempo.
        </p>
        <p className='max-w-2xl text-lg text-neutral-300'>
          Se apoya en el <strong className='text-neutral-100'>Tri Hita Karana</strong>, la filosofía balinesa de las
          tres causas del bienestar: armonía con el propósito, entre las personas y con el lugar.
        </p>
      </div>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
        {pillars.map((pillar) => (
          <div key={pillar.title} className='flex flex-col gap-3 rounded-lg border border-zinc-800 p-6'>
            <pillar.icon size={28} className='text-cyan-400' />
            <h3 className='font-alt text-xl font-semibold text-white'>{pillar.title}</h3>
            <p className='text-neutral-400'>{pillar.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const steps = [
  {
    number: '01',
    title: 'Solicitas acceso',
    description: 'Cuéntanos qué te quita tiempo hoy. Revisamos cada solicitud de forma individual.',
  },
  {
    number: '02',
    title: 'Diseñamos tu entrada',
    description: 'Elegimos contigo el plan que encaja con tu ritmo y configuramos tus preferencias.',
  },
  {
    number: '03',
    title: 'Empiezas a recuperar horas',
    description: 'Nos ocupamos de las reservas, la agenda y los detalles. Tú decides en qué inviertes ese tiempo.',
  },
];

function HowItWorksSection() {
  return (
    <section className='flex flex-col gap-8 px-4'>
      <h2 className='font-alt text-3xl font-bold text-white lg:text-4xl'>Cómo funciona</h2>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {steps.map((step) => (
          <div key={step.number} className='flex flex-col gap-3 rounded-lg border border-zinc-800 bg-black p-6'>
            <span className='font-alt text-3xl font-bold text-neutral-700'>{step.number}</span>
            <h3 className='font-alt text-xl font-semibold text-white'>{step.title}</h3>
            <p className='text-neutral-400'>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
