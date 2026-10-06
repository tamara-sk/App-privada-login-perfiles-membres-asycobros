import { isSupabaseConfigured } from '@/libs/supabase/is-supabase-configured';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

export async function getSession() {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error(error);
  }

  return data.session;
}
