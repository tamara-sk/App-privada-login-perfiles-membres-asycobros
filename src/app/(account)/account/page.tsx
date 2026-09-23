import { PropsWithChildren, ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { getSession } from '@/features/account/controllers/get-session';
import { startPaymentAction } from '@/features/membership/actions/start-payment-action';
import { PlanCard } from '@/features/membership/components/plan-card';
import { getMembership } from '@/features/membership/controllers/get-membership';
import { getPlan } from '@/features/membership/plans';
import { getOrders } from '@/features/store/controllers/get-orders';
import { formatPrice } from '@/features/store/utils/format-price';

export default async function AccountPage() {
  const [session, membership, orders] = await Promise.all([getSession(), getMembership(), getOrders()]);

  if (!session) {
    redirect('/login');
  }

  const plan = membership ? getPlan(membership.plan) : undefined;
  const validUntil = membership
    ? new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(new Date(membership.current_period_end))
    : null;

  return (
    <section className='rounded-lg bg-black px-4 py-16'>
      <h1 className='mb-8 text-center'>Account</h1>

      <div className='flex flex-col gap-4'>
        <Card
          title='Your entry to the Circle'
          footer={
            plan ? (
              <form action={startPaymentAction.bind(null, plan.slug)}>
                <Button size='sm' variant='secondary' type='submit'>
                  Renew for another year
                </Button>
              </form>
            ) : (
              <Button size='sm' variant='secondary' asChild>
                <Link href='/pricing'>See the plans</Link>
              </Button>
            )
          }
        >
          {plan ? (
            <div className='flex flex-col gap-4'>
              <p className='text-zinc-400'>Valid until {validUntil}.</p>
              <PlanCard plan={plan} showAction={false} />
            </div>
          ) : (
            <p>Choose your entry to the Circle to begin.</p>
          )}
        </Card>

        <Card
          title='Shop orders'
          footer={
            <Button size='sm' variant='secondary' asChild>
              <Link href='/store'>Visit the shop</Link>
            </Button>
          }
        >
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <ul className='flex flex-col divide-y divide-zinc-800'>
              {orders.map((order) => (
                <li key={order.id} className='flex flex-wrap items-center justify-between gap-2 py-3 text-sm'>
                  <div className='flex flex-col'>
                    <span className='text-neutral-200'>
                      {new Date(order.created).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span className='text-xs uppercase tracking-widest text-neutral-500'>{order.status}</span>
                  </div>
                  <span className='font-semibold text-white'>
                    {formatPrice(order.amount_total, order.currency.toUpperCase())}
                  </span>
                </li>
              ))}
            </ul>
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
