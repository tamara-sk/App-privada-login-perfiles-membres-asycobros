import type { RedsysNotification } from '@/libs/redsys/payment';
import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';

/**
 * Cierra un pedido de la tienda con lo que confirma Redsys.
 *
 * El pedido ya existe, con sus líneas y sus importes calculados en el servidor, así que
 * aquí solo se marca el resultado. La actualización exige `status = 'pending'`, de modo que
 * una notificación reenviada por el banco encuentra la fila ya cerrada y deja de aplicarse.
 */
export async function settleOrder({
  orderId,
  paid,
  notification,
}: {
  orderId: string;
  paid: boolean;
  notification: RedsysNotification;
}) {
  const { error } = await supabaseAdminClient
    .from('orders')
    .update({
      status: paid ? 'paid' : 'failed',
      payment_intent_id: notification.Ds_AuthorisationCode ?? null,
    })
    .eq('id', orderId)
    .eq('status', 'pending');

  if (error) throw error;
}
