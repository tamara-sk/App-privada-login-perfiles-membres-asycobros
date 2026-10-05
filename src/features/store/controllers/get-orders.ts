import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

/** La seguridad a nivel de fila lo limita a los pedidos de quien ha iniciado sesión. */
export async function getOrders() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.from('orders').select('*').order('created', { ascending: false }).limit(20);

  if (error) {
    console.error(error.message);
  }

  return data ?? [];
}
