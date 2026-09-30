import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

// Identity is revalidated against Supabase Auth with getUser(); getSession()
// only reads the cookie and must not be trusted on the server.
export async function getSession() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.getUser();

  if (error && error.name !== 'AuthSessionMissingError') {
    console.error('Auth user lookup failed');
  }

  return data.user ? { user: data.user } : null;
}
