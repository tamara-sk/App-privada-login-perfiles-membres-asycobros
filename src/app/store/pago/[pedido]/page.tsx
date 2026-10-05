import { notFound, redirect } from 'next/navigation';

import { RedsysRedirectForm } from '@/features/membership/components/redsys-redirect-form';
import { buildRedirectPayment } from '@/libs/redsys/payment';
import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';
import { getURL } from '@/utils/get-url';

export const dynamic = 'force-dynamic';

/**
 * Envía el pedido de la tienda a Redsys.
 *
 * A diferencia de la entrada al Círculo, comprar en la tienda funciona como invitado, así
 * que aquí manda el número de pedido: sale de `createOrderNumber`, se usa una sola vez y
 * queda registrado antes de llegar a esta página.
 */
export default async function StorePaymentRedirectPage({ params }: { params: Promise<{ pedido: string }> }) {
  const { pedido } = await params;

  const { data: order } = await supabaseAdminClient.from('orders').select('*').eq('id', pedido).maybeSingle();

  if (!order) {
    notFound();
  }

  if (order.status !== 'pending') {
    redirect(`/store/success?pedido=${order.id}`);
  }

  const form = buildRedirectPayment({
    order: order.id,
    amount: order.amount_total,
    description: 'Secret Key - Tienda',
    notificationUrl: getURL('/api/redsys/notificacion'),
    okUrl: getURL(`/store/success?pedido=${order.id}`),
    koUrl: getURL('/store/cart?estado=ko'),
  });

  return (
    <section className='m-auto flex max-w-lg flex-col items-center gap-4 py-24 text-center'>
      <h1 className='text-2xl font-semibold'>Un momento</h1>
      <p className='text-sm opacity-70'>Te llevamos a la pasarela segura de BBVA.</p>
      <RedsysRedirectForm form={form} />
    </section>
  );
}
