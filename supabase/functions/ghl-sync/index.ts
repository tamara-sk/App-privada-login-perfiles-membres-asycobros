// Outbox worker, one-way Supabase -> GHL. Invoke via cron (pg_cron/Scheduler) every minute, or
// call directly after enqueue. Requires header x-sk-secret == SK_SYNC_SECRET.
// GHL never writes back: this function only reads GHL's response to store the contact id mapping.
import { createClient } from 'npm:@supabase/supabase-js@2';
// Tag applied in GHL per event; GHL workflows trigger on these tags (emails live in GHL).
// Only CRM/communication/sales/nurturing/transaction/journey events belong here.
type GhlEvent = keyof typeof EVENT_TAGS;
const EVENT_TAGS = {
  user_registered: 'sk-event-registered',
  onboarding_started: 'sk-event-onboarding-started',
  onboarding_completed: 'sk-event-onboarding-completed',
  ai_profile_completed: 'sk-event-ai-profile',
  membership_created: 'sk-event-membership',
  booking_created: 'sk-event-booking',
  payment_success: 'sk-event-payment-ok',
  payment_failed: 'sk-event-payment-failed',
  booking_cancelled: 'sk-event-booking-cancelled',
  transaction_created: 'sk-event-transaction',
};

const GHL = 'https://services.leadconnectorhq.com';
const H = () => ({ Authorization: `Bearer ${Deno.env.get('GHL_PRIVATE_TOKEN')}`, Version: '2021-07-28', 'Content-Type': 'application/json', Accept: 'application/json' });
const LOC = () => Deno.env.get('GHL_LOCATION_ID')!;
// custom-field keys must exist in GHL (see docs/ARCHITECTURE.md §GHL setup)
const CF = (k: string) => `sk_${k}`;

Deno.serve(async (req) => {
  const secret = Deno.env.get('SK_SYNC_SECRET');
  if (!secret || req.headers.get('x-sk-secret') !== secret) return new Response('forbidden', { status: 403 });
  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { data: batch } = await db.from('event_outbox').select('*').in('status', ['pending', 'failed']).lt('attempts', 6).order('id').limit(25);
  let sent = 0, failed = 0;

  for (const ev of batch ?? []) {
    try {
      const { data: au } = await db.auth.admin.getUserById(ev.user_id);
      const email = au?.user?.email; if (!email) throw new Error('no email');
      const p = ev.payload ?? {};
      const fields: Record<string, unknown> = { last_event: ev.event_type, supabase_user_id: ev.user_id };
      if (ev.event_type === 'ai_profile_completed') Object.assign(fields, { level: p.level_slug, score: p.composite_score, profile_summary: p.summary, interests: (p.interests ?? []).join(', '), llavecitas_awarded: p.llavecitas, sigil: p.sigil, approved: p.approved, needs_review: p.needs_human_review });
      if (ev.event_type === 'membership_created') Object.assign(fields, { membership_tier: p.tier });

      const tags = [EVENT_TAGS[ev.event_type as GhlEvent], ...(ev.event_type === 'ai_profile_completed' ? p.tags ?? [] : [])];
      const nameParts = String(p.full_name ?? au.user.user_metadata?.full_name ?? '').split(' ');
      const r = await fetch(`${GHL}/contacts/upsert`, { method: 'POST', headers: H(), body: JSON.stringify({
        locationId: LOC(), email, firstName: nameParts[0] || undefined, lastName: nameParts.slice(1).join(' ') || undefined,
        source: 'Secret Key', tags, customFields: Object.entries(fields).map(([k, v]) => ({ key: CF(k), field_value: String(v ?? '') })),
      }) });
      if (!r.ok) throw new Error(`ghl ${r.status}: ${(await r.text()).slice(0, 300)}`);
      const id = (await r.json())?.contact?.id;
      if (id) await db.from('ghl_contacts').upsert({ user_id: ev.user_id, ghl_contact_id: id, last_synced_at: new Date().toISOString() });
      await db.from('event_outbox').update({ status: 'sent', sent_at: new Date().toISOString(), attempts: ev.attempts + 1, last_error: null }).eq('id', ev.id);
      sent++;
    } catch (e) {
      const attempts = ev.attempts + 1;
      await db.from('event_outbox').update({ status: attempts >= 6 ? 'dead' : 'failed', attempts, last_error: String(e).slice(0, 500) }).eq('id', ev.id);
      failed++;
    }
  }
  return Response.json({ sent, failed });
});
