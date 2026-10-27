'use server';

import { redirect } from 'next/navigation';

import { getSession } from '@/features/account/controllers/get-session';
import { createOrderNumber } from '@/libs/redsys/payment';
import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';

import { annualAmountAt, getPlan, isPaidPlan } from '../plans';

/**
 * Exige una solicitud aprobada. Registra el pago como pendiente y lleva a la persona a la página que la envía a Redsys.
 * El importe sale de `plans.ts`, nunca del navegador.
 */
export async function startPaymentAction(planSlug: string) {
  const session = await getSession();

  if (!session?.user) {
    redirect('/signup');
  }

  const { data: application } = await supabaseAdminClient
    .from('applications')
    .select('status')
    .eq('user_id', session.user.id)
    .maybeSingle();

  // El pago llega una vez dentro: primero se contestan las tres preguntas y el Círculo aprueba.
  if (application?.status !== 'approved') {
    redirect('/solicitar');
  }

  const plan = getPlan(planSlug);

  if (!plan || !isPaidPlan(plan)) {
    redirect('/account');
  }

  const order = createOrderNumber();

  const { error } = await supabaseAdminClient.from('payments').insert({
    user_id: session.user.id,
    order,
    plan: plan.slug,
    amount: annualAmountAt(plan),
    currency: process.env.REDSYS_CURRENCY || '978',
  });

  if (error) {
    console.error(error);
    throw new Error('No se pudo iniciar el pago.');
  }

  redirect(`/pago/${order}`);
}
