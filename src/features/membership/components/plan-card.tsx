import Link from 'next/link';
import { IoCheckmark } from 'react-icons/io5';

import { SexyBoarder } from '@/components/sexy-boarder';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/utils/format-price';

import { startPaymentAction } from '../actions/start-payment-action';
import { isPaidPlan, Plan, planFeatures } from '../plans';

export function PlanCard({ plan, showAction = true }: { plan: Plan; showAction?: boolean }) {
  const card = (
    <div className='flex h-full w-full flex-col rounded-md border border-zinc-800 bg-black p-4 lg:p-8'>
      <div className='p-4'>
        <div className='mb-1 text-center font-alt text-xl font-bold'>{plan.name}</div>
        <div className='flex justify-center gap-0.5 text-zinc-400'>
          <span className='font-semibold'>{formatPrice(plan.annualAmount, 'eur')}</span>
          {isPaidPlan(plan) && <span>/año</span>}
        </div>
      </div>

      <div className='m-auto flex w-fit flex-1 flex-col gap-2 px-8 py-4'>
        {planFeatures(plan).map((feature) => (
          <div key={feature} className='flex items-center gap-2'>
            <IoCheckmark className='my-auto flex-shrink-0 text-slate-500' />
            <p className='text-sm font-medium text-white first-letter:capitalize'>{feature}</p>
          </div>
        ))}
      </div>

      {showAction && (
        <div className='py-4'>
          {isPaidPlan(plan) ? (
            <form action={startPaymentAction.bind(null, plan.slug)}>
              <Button type='submit' variant={plan.highlighted ? 'sexy' : 'default'} className='w-full'>
                Solicitar acceso
              </Button>
            </form>
          ) : (
            <Button variant='default' className='w-full' asChild>
              <Link href='/signup'>Solicitar acceso</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );

  return plan.highlighted ? (
    <SexyBoarder className='w-full flex-1' offset={100}>
      {card}
    </SexyBoarder>
  ) : (
    <div className='w-full flex-1'>{card}</div>
  );
}
