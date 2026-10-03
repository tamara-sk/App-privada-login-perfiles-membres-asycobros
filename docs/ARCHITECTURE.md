# Secret Key — Unified Web + App Launch Architecture

```
Secret Key Web (Vercel: secret-key-site) ─┐
Secret Key App (TestFlight)               ─┴─> Supabase `secret-key-eu` (source of truth)
                                                 └─ event_outbox ──> ghl-sync ──> GHL (CRM / tags / emails / AI)
```
One-way only: GHL never writes to Supabase. Payments: **Redsys TPV (BBVA) and Bizum only** (Bizum runs through Redsys).

## Status (2026-10-03)

| Piece | State |
|---|---|
| DB: onboarding, AI evaluations, rewards, outbox, event triggers, `public_experiences` view | **Applied** to `secret-key-eu`; reward logic tested in a rolled-back transaction |
| Edge function `evaluate-onboarding` (JWT required) | **Deployed**; needs secret `ANTHROPIC_API_KEY` |
| Edge function `ghl-sync` (outbox → GHL) | **Deployed**; needs secrets `GHL_PRIVATE_TOKEN`, `GHL_LOCATION_ID=WxgbzNocttyUDaSmYNjv`, `SK_SYNC_SECRET`, and a 1-minute schedule |
| GHL custom fields (`sk_level, sk_score, sk_profile_summary, sk_interests, sk_last_event, sk_supabase_user_id, sk_membership_tier, sk_llavecitas_awarded, sk_sigil, sk_approved, sk_needs_review`) | **Created** in location Secret Key |
| GHL tags / workflows / Conversation AI knowledge | Tags are created on first sync; workflows to build in GHL (below) |
| Web (`secret-key-site`, Vite) | Not touched (repo outside this session). **Last Vercel deploy is in ERROR.** |

## Onboarding rules (all editable as data, no app rebuild)
- 3 questions: `onboarding_questions`.
- AI score 0–100 → level (`onboarding_levels`): Concierge Seeker 0 · Circle Contributor 50 · Keeper Candidate 75 (placeholder names). Levels with `auto_approve=true` (≥50) set `profiles.approved` automatically unless the AI flags `needs_human_review`.
- **1 llavecita** when *each* of the 3 answers has **more than 250 words** (counted in SQL, never trusted from the client) and AI `depth_sincerity ≥ 40` (anti-filler). Config: `onboarding_reward_config`.
- **Sigil "Amazing Intro"** (new, code `amazing-intro`): only if the llavecita was earned and composite ≥ 60. Chance = 10% + up to 50% from the AI score + up to 30% from extra length (cap 90%). Example tested: score 85, ~272 words avg → 44%.
- Idempotent: one reward per evaluation, retries never double-pay or re-roll.

## GHL events (Supabase → GHL only)
`user_registered, onboarding_started, onboarding_completed, ai_profile_completed, membership_created, booking_created, payment_success, payment_failed, booking_cancelled, transaction_created`.
- Booking paid = `reservations.status` → `confirmed` (set by `finalize_booking_payment` from the Redsys notification).
- Membership paid/renewed = `profiles.membership_status` / `membership_expires_at` (set by `finalize_membership_payment`).
- Payment failed = `redsys_events` row with `Ds_Response ≥ 100`.
- Each event adds tag `sk-event-*`; AI profile also adds `sk-level-*` plus AI tags. Build GHL workflows triggered by those tags.

## GHL AI
Contacts carry `sk_profile_summary`, `sk_interests`, `sk_level`, `sk_sigil`, `sk_llavecitas_awarded`, so Conversation AI / Workflow AI can personalise replies and emails from the same data the app shows. Suggest adding to the Conversation AI knowledge: what llavecitas and sigils are, the Amazing Intro sigil, and the rule that members enter via the web onboarding.

## Open items
1. Set the 4 secrets and schedule `ghl-sync` (every minute, header `x-sk-secret`). Until then events accumulate safely in `event_outbox`.
2. First real sync must be tested with a throwaway signup: confirm GHL accepts `customFields[].key` as `sk_*` (if not, switch to field ids).
3. Rate limit: none by decision (owner, 2026-10-03). Each onboarding = one Claude call, only once per user.
4. Existing 108 members are *not* sent to GHL (avoid welcome blasts). Backfill is a separate decision.
5. Redsys/BBVA: payments and Bizum flows are described in code as "never exercised against a live registration"; confirm with the bank. The architecture here depends only on their notifications.
6. Stripe: not used by Secret Key. Legacy Stripe edge functions and `profiles.stripe_*` columns still exist in production; not removed (needs explicit go-ahead). This repo's starter code is a generic Stripe template and should not be used.
7. Move `supabase/` and `docs/` into the real app repo.

## Hand-off to Kumkum (TestFlight)
Kumkum stays on stability only: same `auth.users` login as web, onboarding reads `onboarding_questions` and calls `evaluate-onboarding`, no client-side scoring, no writes to GHL. TestFlight issue list pending from Tamara.
