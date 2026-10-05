import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PurchaseTracker } from '@/features/store/components/purchase-tracker';
import { formatPrice } from '@/features/store/utils/format-price';
import { constructMetadata } from '@/libs/seo/metadata';
import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';

export const metadata: Metadata = constructMetadata({
  title: 'Pedido confirmado',
  description: 'Tu pedido de la tienda de Secret Key está confirmado.',
  path: '/store/success',
  noIndex: true,
});

export const dynamic = 'force-dynamic';

type OrderLine = {
  slug?: string;
  name?: string;
  quantity?: number;
  unit_amount?: number;
  amount_total?: number;
};

export default async function StoreSuccessPage({ searchParams }: { searchParams: Promise<{ pedido?: string }> }) {
  const { pedido } = await searchParams;

  const { data: order } = pedido
    ? await supabaseAdminClient.from('orders').select('*').eq('id', pedido).maybeSingle()
    : { data: null };

  const lines: OrderLine[] = Array.isArray(order?.items) ? (order.items as OrderLine[]) : [];
  const currency = (order?.currency ?? 'eur').toUpperCase();
  const isPaid = order?.status === 'paid';

  return (
    <div className='flex flex-col items-center gap-8 py-16 text-center lg:py-24'>
      {order && isPaid && (
        <PurchaseTracker
          transactionId={order.id}
          currency={currency}
          value={order.amount_total / 100}
          shipping={(order.amount_shipping ?? 0) / 100}
          tax={0}
          items={lines.map((line, index) => ({
            item_id: line.slug ?? `line-${index}`,
            item_name: line.name ?? 'Secret Key item',
            price: (line.unit_amount ?? 0) / 100,
            quantity: line.quantity ?? 1,
          }))}
        />
      )}

      <div className='flex flex-col gap-3'>
        <span className='text-xs uppercase tracking-[0.3em] text-neutral-500'>
          {isPaid ? 'Pedido confirmado' : 'Pedido recibido'}
        </span>
        <h1>{isPaid ? 'Gracias. Va de camino.' : 'Gracias. Lo estamos confirmando.'}</h1>
        <p className='max-w-xl text-lg text-neutral-400'>
          {isPaid
            ? 'Te llega un correo con la confirmación y el seguimiento. Alguien, en algún sitio, está a punto de leer algo bonito gracias a ti.'
            : 'El banco está confirmando el cobro. En cuanto llegue su aviso te escribimos con los detalles.'}
        </p>
      </div>

      {lines.length > 0 && (
        <ul className='w-full max-w-md divide-y divide-zinc-800 rounded-lg border border-zinc-800 bg-black text-left'>
          {lines.map((line, index) => (
            <li key={line.slug ?? index} className='flex justify-between gap-4 p-4 text-sm'>
              <span className='text-neutral-300'>
                {line.name}
                <span className='text-neutral-500'> x{line.quantity ?? 1}</span>
              </span>
              <span className='flex-shrink-0 text-white'>{formatPrice(line.amount_total ?? 0, currency)}</span>
            </li>
          ))}
          {(order?.amount_shipping ?? 0) > 0 && (
            <li className='flex justify-between gap-4 p-4 text-sm'>
              <span className='text-neutral-300'>Envío</span>
              <span className='flex-shrink-0 text-white'>{formatPrice(order!.amount_shipping!, currency)}</span>
            </li>
          )}
          <li className='flex justify-between gap-4 p-4 font-semibold'>
            <span>Total</span>
            <span>{formatPrice(order?.amount_total ?? 0, currency)}</span>
          </li>
        </ul>
      )}

      <div className='flex flex-wrap justify-center gap-3'>
        <Button variant='sexy' asChild>
          <Link href='/store'>Seguir mirando</Link>
        </Button>
        <Button variant='outline' asChild>
          <Link href='/account'>Ir a mi cuenta</Link>
        </Button>
      </div>
    </div>
  );
}
