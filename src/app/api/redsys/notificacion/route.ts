import { isAuthorised, parseNotification } from '@/libs/redsys/payment';
import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';

/**
 * Notificación servidor a servidor de Redsys (DS_MERCHANT_MERCHANTURL).
 *
 * Es la única fuente de verdad del cobro: la vuelta del navegador a URLOK se puede
 * falsificar, esta firma no. Se responde 200 a toda notificación con firma válida, para
 * que el banco la dé por entregada; una firma inválida recibe 400.
 */
export async function POST(request: Request) {
  const form = await request.formData();

  const notification = parseNotification({
    Ds_SignatureVersion: form.get('Ds_SignatureVersion')?.toString(),
    Ds_MerchantParameters: form.get('Ds_MerchantParameters')?.toString(),
    Ds_Signature: form.get('Ds_Signature')?.toString(),
  });

  if (!notification) {
    return new Response('Firma inválida', { status: 400 });
  }

  const order = notification.Ds_Order;

  const { data: payment, error } = await supabaseAdminClient
    .from('payments')
    .select('*')
    .eq('order', order)
    .maybeSingle();

  if (error || !payment) {
    console.error('Redsys: pedido desconocido', order, error);
    return new Response('OK');
  }

  // Idempotente: Redsys puede reenviar la misma notificación.
  if (payment.status !== 'pending') {
    return new Response('OK');
  }

  const amountMatches = Number(notification.Ds_Amount) === payment.amount;
  const paid = isAuthorised(notification.Ds_Response) && amountMatches;

  if (isAuthorised(notification.Ds_Response) && !amountMatches) {
    console.error('Redsys: importe distinto del registrado', order, notification.Ds_Amount, payment.amount);
  }

  const now = new Date();

  const { error: updateError } = await supabaseAdminClient
    .from('payments')
    .update({
      status: paid ? 'paid' : 'failed',
      response_code: notification.Ds_Response,
      authorisation_code: notification.Ds_AuthorisationCode ?? null,
      redsys_identifier: notification.Ds_Merchant_Identifier ?? null,
      redsys_cof_txnid: notification.Ds_Merchant_Cof_Txnid ?? null,
      raw_notification: notification,
      updated_at: now.toISOString(),
    })
    .eq('id', payment.id)
    .eq('status', 'pending');

  if (updateError) {
    console.error(updateError);
    return new Response('Error', { status: 500 });
  }

  if (paid) {
    await activateMembership({
      userId: payment.user_id,
      plan: payment.plan,
      paymentId: payment.id,
      identifier: notification.Ds_Merchant_Identifier,
      cofTxnid: notification.Ds_Merchant_Cof_Txnid,
      now,
    });
  }

  return new Response('OK');
}

/**
 * Abre o prolonga la entrada un año. Si la persona renueva el mismo plan antes de que
 * venza, el año nuevo empieza al terminar el actual; un cambio de plan empieza hoy.
 */
async function activateMembership({
  userId,
  plan,
  paymentId,
  identifier,
  cofTxnid,
  now,
}: {
  userId: string;
  plan: string;
  paymentId: string;
  identifier?: string;
  cofTxnid?: string;
  now: Date;
}) {
  const { data: current } = await supabaseAdminClient
    .from('memberships')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  const currentEnd = current ? new Date(current.current_period_end) : null;
  const extendsCurrent =
    current?.status === 'active' && current.plan === plan && currentEnd !== null && currentEnd > now;

  const start = extendsCurrent ? currentEnd! : now;
  const end = new Date(start);
  end.setFullYear(end.getFullYear() + 1);

  const { error } = await supabaseAdminClient.from('memberships').upsert({
    user_id: userId,
    plan,
    status: 'active',
    current_period_start: extendsCurrent ? current!.current_period_start : start.toISOString(),
    current_period_end: end.toISOString(),
    cancel_at_period_end: false,
    redsys_identifier: identifier ?? current?.redsys_identifier ?? null,
    redsys_cof_txnid: cofTxnid ?? current?.redsys_cof_txnid ?? null,
    last_payment_id: paymentId,
    updated_at: now.toISOString(),
  });

  if (error) {
    console.error('Redsys: pago confirmado sin poder activar la entrada', userId, paymentId, error);
  }
}
