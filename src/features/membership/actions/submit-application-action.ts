'use server';

import { redirect } from 'next/navigation';

import { getSession } from '@/features/account/controllers/get-session';
import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';

const MAX_ANSWER_LENGTH = 1000;

/**
 * Guarda las tres respuestas. Se admite una solicitud nueva si no existe ninguna o si la
 * anterior fue rechazada; en cualquier otro estado se respeta la que ya está en curso.
 */
export async function submitApplicationAction(formData: FormData) {
  const session = await getSession();

  if (!session?.user?.email) {
    redirect('/signup');
  }

  const answer = (name: string) =>
    String(formData.get(name) ?? '')
      .trim()
      .slice(0, MAX_ANSWER_LENGTH);

  const whoYouAre = answer('who_you_are');
  const circleContribution = answer('circle_contribution');
  const natureContribution = answer('nature_contribution');

  if (!whoYouAre || !circleContribution || !natureContribution) {
    redirect('/solicitar?falta=1');
  }

  const { data: existing } = await supabaseAdminClient
    .from('applications')
    .select('status')
    .eq('user_id', session.user.id)
    .maybeSingle();

  if (existing && existing.status !== 'rejected') {
    redirect('/solicitar');
  }

  const now = new Date().toISOString();

  const { error } = await supabaseAdminClient.from('applications').upsert({
    user_id: session.user.id,
    email: session.user.email,
    who_you_are: whoYouAre,
    circle_contribution: circleContribution,
    nature_contribution: natureContribution,
    status: 'pending',
    decided_at: null,
    updated_at: now,
  });

  if (error) {
    console.error(error);
    throw new Error('No se pudo guardar la solicitud.');
  }

  redirect('/solicitar');
}
