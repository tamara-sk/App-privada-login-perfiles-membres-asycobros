'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

const applicationSchema = z.object({
  essence: z.string().trim().min(20).max(1500),
  contribution: z.string().trim().min(20).max(1500),
  invitedBy: z.string().trim().max(300).optional(),
});

export type ApplyResult = { ok: true } | { ok: false; message: string };

export async function submitApplication(input: unknown): Promise<ApplyResult> {
  const parsed = applicationSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: 'Por favor, desarrolla un poco más cada respuesta (mínimo 20 caracteres).' };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, message: 'Tu sesión ha caducado. Vuelve a acceder.' };
  }

  const { error } = await supabase.from('membership_applications').insert({
    user_id: user.id,
    essence: parsed.data.essence,
    contribution: parsed.data.contribution,
    invited_by: parsed.data.invitedBy || null,
  });

  if (error) {
    // 23505: unique violation, the user already applied.
    if (error.code === '23505') {
      revalidatePath('/apply');
      return { ok: true };
    }
    console.error('membership application insert failed');
    return { ok: false, message: 'No hemos podido registrar tu solicitud. Inténtalo de nuevo en unos minutos.' };
  }

  revalidatePath('/apply');
  return { ok: true };
}
