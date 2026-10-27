import { timingSafeEqual } from 'node:crypto';

import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';

const STATUSES = ['pending', 'approved', 'rejected', 'vetoed'] as const;

/**
 * Cambia el estado de una solicitud al Círculo. Lo llama el workflow de GHL: aprobación
 * automática, rechazo decidido por una persona o veto de Secret Key, del board o de
 * miembros del Círculo.
 *
 * Cabecera `Authorization: Bearer <APPLICATIONS_WEBHOOK_SECRET>`.
 * Cuerpo: `{ "email": "...", "status": "approved" | "rejected" | "vetoed" | "pending" }`.
 */
export async function POST(request: Request) {
  const secret = process.env.APPLICATIONS_WEBHOOK_SECRET;
  const received = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ?? '';

  if (!secret || !safeEqual(received, secret)) {
    return new Response('Sin autorización', { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const status = STATUSES.find((value) => value === body?.status);

  if (!email || !status) {
    return new Response('Cuerpo inválido', { status: 400 });
  }

  const now = new Date().toISOString();

  const { data, error } = await supabaseAdminClient
    .from('applications')
    .update({ status, decided_at: status === 'pending' ? null : now, updated_at: now })
    .ilike('email', email)
    .select('user_id');

  if (error) {
    console.error('Solicitudes: no se pudo cambiar el estado', error);
    return new Response('Error', { status: 500 });
  }

  if (!data?.length) {
    return new Response('Solicitud no encontrada', { status: 404 });
  }

  return new Response('OK');
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
