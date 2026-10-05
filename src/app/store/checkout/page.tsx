import type { Metadata } from 'next';

import { CheckoutForm } from '@/features/store/components/checkout-form';

export const metadata: Metadata = {
  title: 'Checkout',
  robots: { index: false, follow: false },
};

export default function StoreCheckoutPage() {
  return (
    <section className='m-auto flex w-full max-w-lg flex-col gap-8 px-4 py-16'>
      <h1 className='text-3xl'>Últimos datos</h1>
      <CheckoutForm />
    </section>
  );
}
