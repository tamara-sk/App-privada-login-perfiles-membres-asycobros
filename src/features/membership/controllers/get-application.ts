import { isSupabaseConfigured } from '@/libs/supabase/is-supabase-configured';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

/** Solicitud al Círculo de la persona con sesión iniciada, si la ha presentado. */
export async function getApplication() {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.from('applications').select('*').maybeSingle();

  if (error) {
    console.error(error);
  }

  return data;
}
