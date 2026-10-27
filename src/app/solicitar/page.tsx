import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { getSession } from '@/features/account/controllers/get-session';
import { submitApplicationAction } from '@/features/membership/actions/submit-application-action';
import { getApplication } from '@/features/membership/controllers/get-application';

const QUESTIONS = [
  { name: 'who_you_are', label: 'Quién eres', hint: 'Tu cargo o tu ubicación.' },
  { name: 'circle_contribution', label: 'Qué aportas al Círculo', hint: 'Lo que traes a las personas que lo forman.' },
  { name: 'nature_contribution', label: 'Qué aportas a la naturaleza', hint: 'Lo que devuelves al lugar que habitas.' },
] as const;

export const metadata = { title: 'Solicitar acceso · Secret Key' };

export default async function ApplyPage({ searchParams }: { searchParams: Promise<{ falta?: string }> }) {
  const session = await getSession();

  if (!session) {
    redirect('/signup');
  }

  const [application, { falta }] = await Promise.all([getApplication(), searchParams]);
  const status = application?.status;

  return (
    <section className='m-auto flex max-w-xl flex-col gap-6 rounded-lg bg-black px-4 py-16'>
      <h1 className='text-center text-3xl font-bold'>Solicitar acceso al Círculo</h1>

      {status === 'pending' && (
        <p className='text-center text-zinc-400'>
          Hemos recibido tus respuestas. Te escribimos en cuanto el Círculo las haya leído.
        </p>
      )}

      {status === 'approved' && (
        <div className='flex flex-col items-center gap-4 text-center'>
          <p className='text-zinc-400'>El Círculo te abre la puerta. Elige tu entrada.</p>
          <Button asChild variant='sexy'>
            <Link href='/pricing'>Ver las entradas</Link>
          </Button>
        </div>
      )}

      {status === 'vetoed' && (
        <p className='text-center text-zinc-400'>Gracias por tu interés en Secret Key. Esta solicitud ha concluido.</p>
      )}

      {(!application || status === 'rejected') && (
        <form action={submitApplicationAction} className='flex flex-col gap-5'>
          {status === 'rejected' && (
            <p className='text-center text-zinc-400'>
              Gracias por contarnos quién eres. Por ahora tu solicitud sigue su camino fuera del Círculo. Puedes
              presentarla de nuevo cuando quieras.
            </p>
          )}
          {falta && <p className='text-center text-zinc-400'>Tres respuestas abren la puerta. Completa las tres.</p>}
          {QUESTIONS.map((question) => (
            <label key={question.name} className='flex flex-col gap-1'>
              <span className='font-semibold'>{question.label}</span>
              <span className='text-sm text-zinc-500'>{question.hint}</span>
              <textarea
                name={question.name}
                required
                maxLength={1000}
                rows={3}
                defaultValue={status === 'rejected' ? application?.[question.name] : ''}
                className='rounded-md bg-zinc-900 px-3 py-2 text-sm'
              />
            </label>
          ))}
          <Button type='submit' variant='sexy'>
            Solicitar acceso
          </Button>
        </form>
      )}
    </section>
  );
}
