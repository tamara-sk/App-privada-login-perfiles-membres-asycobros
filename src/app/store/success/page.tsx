import type { Metadata } from 'next';
import Link from 'next/link';
import Stripe from 'stripe';

import { Button } from '@/components/ui/button';
import { PurchaseTracker } from '@/features/store/components/purchase-tracker';
import { formatPrice } from '@/features/store/utils/format-price';
import { constructMetadata } from '@/libs/seo/metadata';
import { stripeAdmin } from '@/libs/stripe/stripe-admin';

export const metadata: Metadata = constructMetadata({
  title: 'Order confirmed',
  description: 'Your Secret Key shop order is confirmed.',
  path: '/store/success',
  noIndex: true,
});

export default async function StoreSuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id: sessionId } = await searchParams;
  const checkoutSession = sessionId ? await retrieveCheckoutSession(sessionId) : null;
  const lineItems = checkoutSession?.line_items?.data ?? [];
  const currency = (checkoutSession?.currency ?? 'eur').toUpperCase();
  const total = checkoutSession?.amount_total ?? 0;

  return (
    <div className='flex flex-col items-center gap-8 py-16 text-center lg:py-24'>
      {checkoutSession && (
        <PurchaseTracker
          transactionId={checkoutSession.id}
          currency={currency}
          value={(checkoutSession.amount_total ?? 0) / 100}
          shipping={(checkoutSession.shipping_cost?.amount_total ?? 0) / 100}
          tax={(checkoutSession.total_details?.amount_tax ?? 0) / 100}
          items={lineItems.map((lineItem) => ({
            item_id: (lineItem.price?.product as Stripe.Product | undefined)?.metadata?.slug ?? lineItem.id,
            item_name: lineItem.description ?? 'Secret Key item',
            price: (lineItem.price?.unit_amount ?? 0) / 100,
            quantity: lineItem.quantity ?? 1,
          }))}
        />
      )}

      <div className='flex flex-col gap-3'>
        <span className='text-xs uppercase tracking-[0.3em] text-neutral-500'>Order confirmed</span>
        <h1>Thank you. It is on its way.</h1>
        <p className='max-w-xl text-lg text-neutral-400'>
          A confirmation email with tracking details is on its way to your inbox. Somebody, somewhere, is about to read
          something kind because of you.
        </p>
      </div>

      {lineItems.length > 0 && (
        <ul className='w-full max-w-md divide-y divide-zinc-800 rounded-lg border border-zinc-800 bg-black text-left'>
          {lineItems.map((lineItem) => (
            <li key={lineItem.id} className='flex justify-between gap-4 p-4 text-sm'>
              <span className='text-neutral-300'>
                {lineItem.description}
                <span className='text-neutral-500'> x{lineItem.quantity ?? 1}</span>
              </span>
              <span className='flex-shrink-0 text-white'>{formatPrice(lineItem.amount_total ?? 0, currency)}</span>
            </li>
          ))}
          <li className='flex justify-between gap-4 p-4 font-semibold'>
            <span>Total</span>
            <span>{formatPrice(total, currency)}</span>
          </li>
        </ul>
      )}

      <div className='flex flex-wrap justify-center gap-3'>
        <Button variant='sexy' asChild>
          <Link href='/store'>Keep browsing</Link>
        </Button>
        <Button variant='outline' asChild>
          <Link href='/account'>Go to my account</Link>
        </Button>
      </div>
    </div>
  );
}

async function retrieveCheckoutSession(sessionId: string) {
  try {
    return await stripeAdmin.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product'],
    });
  } catch (error) {
    console.error('Could not retrieve checkout session', error);
    return null;
  }
}
