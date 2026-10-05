import Link from 'next/link';

import { Button } from '@/components/ui/button';

/**
 * Página a la que vuelve la persona desde Redsys. Solo informa: quien confirma el pago
 * es la notificación firmada que el banco envía a `/api/redsys/notificacion`.
 */
export default async function PaymentResultPage({ searchParams }: { searchParams: Promise<{ estado?: string }> }) {
  const { estado } = await searchParams;
  const isOk = estado === 'ok';

  return (
    <section className='m-auto flex max-w-lg flex-col items-center gap-6 py-24 text-center'>
      <h1 className='text-3xl font-semibold'>
        {isOk ? 'Te damos la bienvenida al Círculo' : 'El pago quedó pendiente'}
      </h1>
      <p className='text-zinc-400'>
        {isOk
          ? 'Tu pago está confirmado. En unos segundos verás tu entrada activa en tu cuenta.'
          : 'El banco devolvió el pago sin completarlo. Puedes intentarlo de nuevo cuando quieras.'}
      </p>
      <Button variant='sexy' asChild>
        <Link href={isOk ? '/account' : '/pricing'}>{isOk ? 'Ir a mi cuenta' : 'Volver a los planes'}</Link>
      </Button>
    </section>
  );
}
