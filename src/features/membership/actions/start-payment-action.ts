'use server';

import { redirect } from 'next/navigation';

import { getSession } from '@/features/account/controllers/get-session';
import { createOrderNumber } from '@/libs/redsys/payment';
import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';

import { getPlan, isPaidPlan } from '../plans';

/**
 * Registra el pago como pendiente y lleva a la persona a la página que la envía a Redsys.
 * El importe sale de `plans.ts`, nunca del navegador.
 */
export async function startPaymentAction(planSlug: string) {
  const session = await getSession();

  if (!session?.user) {
    redirect('/signup');
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
    amount: plan.annualAmount,
    currency: process.env.REDSYS_CURRENCY || '978',
  });

  if (error) {
    console.error(error);
    throw new Error('No se pudo iniciar el pago.');
  }

  redirect(`/pago/${order}`);
}
