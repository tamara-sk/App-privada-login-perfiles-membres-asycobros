import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

/** Row-level security scopes this to the signed-in member's own orders. */
export async function getOrders() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.from('orders').select('*').order('created', { ascending: false }).limit(20);

  if (error) {
    console.error(error.message);
  }

  return data ?? [];
}
