import { PropsWithChildren, ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { getSession } from '@/features/account/controllers/get-session';
import { startPaymentAction } from '@/features/membership/actions/start-payment-action';
import { PlanCard } from '@/features/membership/components/plan-card';
import { getMembership } from '@/features/membership/controllers/get-membership';
import { getPlan } from '@/features/membership/plans';

export default async function AccountPage() {
  const [session, membership] = await Promise.all([getSession(), getMembership()]);

  if (!session) {
    redirect('/login');
  }

  const plan = membership ? getPlan(membership.plan) : undefined;
  const validUntil = membership
    ? new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(new Date(membership.current_period_end))
    : null;

  return (
    <section className='rounded-lg bg-black px-4 py-16'>
      <h1 className='mb-8 text-center'>Mi cuenta</h1>

      <div className='flex flex-col gap-4'>
        <Card
          title='Tu entrada al Círculo'
          footer={
            plan ? (
              <form action={startPaymentAction.bind(null, plan.slug)}>
                <Button size='sm' variant='secondary' type='submit'>
                  Renovar un año más
                </Button>
              </form>
            ) : (
              <Button size='sm' variant='secondary' asChild>
                <Link href='/pricing'>Ver planes</Link>
              </Button>
            )
          }
        >
          {plan ? (
            <div className='flex flex-col gap-4'>
              <p className='text-zinc-400'>Vigente hasta el {validUntil}.</p>
              <PlanCard plan={plan} showAction={false} />
            </div>
          ) : (
            <p>Elige tu entrada al Círculo para empezar.</p>
          )}
        </Card>
      </div>
    </section>
  );
}

function Card({
  title,
  footer,
  children,
}: PropsWithChildren<{
  title: string;
  footer?: ReactNode;
}>) {
  return (
    <div className='m-auto w-full max-w-3xl rounded-md bg-zinc-900'>
      <div className='p-4'>
        <h2 className='mb-1 text-xl font-semibold'>{title}</h2>
        <div className='py-4'>{children}</div>
      </div>
      <div className='flex justify-end rounded-b-md border-t border-zinc-800 p-4'>{footer}</div>
    </div>
  );
}
