import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getFeaturedProducts } from '@/features/store/catalog';
import { ProductCard } from '@/features/store/components/product-card';
import { companyConfig, constructMetadata, siteConfig } from '@/libs/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Quiénes somos',
  description: `${siteConfig.name} es un ecosistema de optimización del tiempo, acceso extraordinario y bienestar. Qué hacemos, cómo trabajamos y cómo funciona la entrada al Círculo.`,
  path: '/about-us',
});

const PRINCIPIOS = [
  {
    title: 'El tiempo es el lujo definitivo',
    body: 'Todo lo demás se puede recuperar. Una tarde se gasta una vez, así que conviene gastarla bien.',
  },
  { title: 'El acceso vale más que la propiedad', body: 'La mesa, la sala, el barco. Úsalo, disfrútalo, pásalo.' },
  { title: 'La simplicidad escala', body: 'Una petición, una respuesta. Lo simple es lo que se puede repetir.' },
  { title: 'La confianza se acumula', body: 'Nos cuentan cosas en confianza. En eso consiste el negocio.' },
  { title: 'Las experiencias crean recuerdos', body: 'Lo que queda es la velada. Construimos para la velada.' },
  { title: 'La comunidad crea palanca', body: 'El Círculo es la mejor parte de entrar en el Círculo.' },
];

const COMO_TRABAJAMOS = [
  {
    label: 'Anticipamos',
    body: 'Aprendemos cómo funciona tu semana y resolvemos lo siguiente antes de que te caiga encima.',
  },
  {
    label: 'Medimos en horas',
    body: 'Cada entrada al Círculo se juzga por el tiempo que devuelve, y por lo que haces con él.',
  },
  {
    label: 'Lo llevamos hasta el final',
    body: 'Viajes, mesas, logística, los recados largos. Se delegan una vez y se llevan hasta el final.',
  },
  {
    label: 'Mantenemos el nivel',
    body: 'El nivel es lo que reúne al Círculo, y el Círculo es la mejor parte.',
  },
];

const PASOS = [
  {
    step: '01',
    title: 'Cuéntanos qué te come la semana',
    body: 'Las reservas, el seguimiento, la gestión, los recados fijos que merece la pena delegar.',
  },
  {
    step: '02',
    title: 'Lo asumimos nosotros',
    body: 'Una petición, una respuesta, de principio a fin. Tú te quedas fuera de la logística.',
  },
  {
    step: '03',
    title: 'Recuperas las horas',
    body: 'Medimos los minutos que devolvemos. Es la única cifra que nos importa.',
  },
];

export default function AboutUsPage() {
  const products = getFeaturedProducts().slice(0, 3);

  return (
    <div className='flex flex-col gap-16 py-8 lg:gap-24 lg:py-16'>
      <header className='flex max-w-3xl flex-col gap-5'>
        <span className='text-xs uppercase tracking-[0.3em] text-neutral-500'>Quiénes somos</span>
        <h1>Nuestro negocio es el tiempo.</h1>
        <p className='text-lg text-neutral-300'>
          El tiempo es lo único que gana valor en el momento en que lo recuperas. Secret Key es un ecosistema de
          optimización del tiempo, acceso extraordinario y bienestar para quien elige la presencia: asumimos la reserva,
          el seguimiento y la organización, y te devolvemos las horas.
        </p>
        <p className='text-neutral-400'>
          Nos medimos en minutos ahorrados y minutos disfrutados: las horas que el Círculo recupera, y en qué se
          convierten esas horas.
        </p>
      </header>

      <section className='grid gap-4 sm:grid-cols-3'>
        {PASOS.map((item) => (
          <div key={item.step} className='flex flex-col gap-2 rounded-lg border border-zinc-800 bg-black p-6'>
            <span className='font-alt text-sm text-neutral-500'>{item.step}</span>
            <h2 className='font-alt text-lg font-semibold text-white'>{item.title}</h2>
            <p className='text-sm text-neutral-400'>{item.body}</p>
          </div>
        ))}
      </section>

      <section className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <h2 className='font-alt text-3xl font-bold text-white'>Qué lo hace funcionar.</h2>
          <p className='max-w-2xl text-neutral-400'>
            Cuatro hábitos que convierten la entrada al Círculo en horas que se notan.
          </p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2'>
          {COMO_TRABAJAMOS.map((item) => (
            <div key={item.label} className='flex flex-col gap-1 rounded-lg border border-zinc-800 bg-black p-6'>
              <h3 className='font-alt text-base font-semibold text-white'>{item.label}</h3>
              <p className='text-sm text-neutral-400'>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <h2 className='font-alt text-3xl font-bold text-white'>En qué creemos.</h2>
          <p className='max-w-2xl text-neutral-400'>
            Seis principios. Cada decisión que tomamos tiene que ganarse su sitio frente a ellos.
          </p>
        </div>
        <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {PRINCIPIOS.map((principio) => (
            <li key={principio.title} className='flex flex-col gap-1 rounded-lg border border-zinc-800 bg-black p-6'>
              <h3 className='font-alt text-base font-semibold text-white'>{principio.title}</h3>
              <p className='text-sm text-neutral-400'>{principio.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className='flex flex-col gap-6'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
          <div className='flex flex-col gap-2'>
            <h2 className='font-alt text-3xl font-bold text-white'>Lo que hemos hecho.</h2>
            <p className='max-w-xl text-neutral-400'>
              La misma idea, impresa. Discreto por delante, generoso por detrás, empezando por una frase para quien va
              detrás de ti.
            </p>
          </div>
          <Button variant='outline' asChild>
            <Link href='/store'>Ver la tienda</Link>
          </Button>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className='flex flex-col items-start gap-5 rounded-lg border border-zinc-800 bg-black p-8 lg:p-12'>
        <h2 className='font-alt text-3xl font-bold text-white'>Ven a recuperar tu tiempo.</h2>
        <p className='max-w-2xl text-neutral-400'>
          El Círculo se mantiene pequeño a propósito, para que la respuesta sea siempre rápida. Si te suena a lo que
          llevas tiempo buscando, empieza aquí, o escríbenos antes a{' '}
          <a className='underline underline-offset-4 hover:text-white' href={`mailto:${companyConfig.supportEmail}`}>
            {companyConfig.supportEmail}
          </a>
          .
        </p>
        <div className='flex flex-wrap gap-3'>
          <Button variant='sexy' asChild>
            <Link href='/pricing'>Ver los planes</Link>
          </Button>
          <Button variant='outline' asChild>
            <Link href='/privacidad'>Cómo tratamos tus datos</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
