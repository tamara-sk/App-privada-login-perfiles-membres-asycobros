import { isSupabaseConfigured } from '@/libs/supabase/is-supabase-configured';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

/** Entrada al Círculo de la persona con sesión iniciada, si tiene una vigente. */
export async function getMembership() {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('memberships')
    .select('*')
    .eq('status', 'active')
    .gt('current_period_end', new Date().toISOString())
    .maybeSingle();

  if (error) {
    console.error(error);
  }

  return data;
}
