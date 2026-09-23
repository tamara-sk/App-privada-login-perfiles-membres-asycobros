/**
 * Indica si las credenciales públicas de Supabase están configuradas.
 *
 * Las previsualizaciones de Vercel de este repo se construyen y se sirven sin variables de
 * entorno. Sin esta comprobación, el middleware falla en cada petición
 * (`MIDDLEWARE_INVOCATION_FAILED`) y ninguna página abre, ni siquiera las legales, que
 * deben ser accesibles siempre. Sin Supabase, la app se muestra como visitante anónimo.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
