import { notFound, redirect } from 'next/navigation';

import { getSession } from '@/features/account/controllers/get-session';
import { RedsysRedirectForm } from '@/features/membership/components/redsys-redirect-form';
import { getPlan } from '@/features/membership/plans';
import { buildRedirectPayment } from '@/libs/redsys/payment';
import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';
import { getURL } from '@/utils/get-url';

export const dynamic = 'force-dynamic';

export default async function PaymentRedirectPage({ params }: { params: Promise<{ pedido: string }> }) {
  const { pedido } = await params;
  const session = await getSession();

  if (!session?.user) {
    redirect('/login');
  }

  const { data: payment } = await supabaseAdminClient
    .from('payments')
    .select('*')
    .eq('order', pedido)
    .eq('user_id', session.user.id)
    .maybeSingle();

  if (!payment) {
    notFound();
  }

  if (payment.status !== 'pending') {
    redirect(`/pago/resultado?estado=${payment.status === 'paid' ? 'ok' : 'ko'}`);
  }

  const plan = getPlan(payment.plan);

  const form = buildRedirectPayment({
    order: payment.order,
    amount: payment.amount,
    description: `Secret Key - Entrada ${plan?.name ?? payment.plan} - 1 año`,
    notificationUrl: getURL('/api/redsys/notificacion'),
    okUrl: getURL('/pago/resultado?estado=ok'),
    koUrl: getURL('/pago/resultado?estado=ko'),
    holderName: session.user.user_metadata?.full_name,
  });

  return (
    <section className='m-auto flex max-w-lg flex-col items-center gap-4 py-24 text-center'>
      <h1 className='text-2xl font-semibold'>Un momento</h1>
      <RedsysRedirectForm form={form} />
    </section>
  );
}
