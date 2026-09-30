import type { SupabaseClient } from '@supabase/supabase-js';

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export async function getApplicationStatus(supabase: SupabaseClient, userId: string): Promise<ApplicationStatus | null> {
  const { data, error } = await supabase
    .from('membership_applications')
    .select('status')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error('membership_applications lookup failed');
    return null;
  }

  return (data?.status as ApplicationStatus | undefined) ?? null;
}
