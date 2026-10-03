# Secret Key — Unified Web + App Launch Architecture

**Status:** audit complete (read-only), build staged in this branch, **nothing applied to production**.

```
Secret Key Web (Vercel: secret-key-site, Vite) ─┐
Secret Key App (TestFlight)                     ─┴─> Supabase `secret-key-eu` (source of truth)
                                                       └─ event_outbox ──> ghl-sync ──> GHL (CRM/tags/emails/automations)
```

## Priority 1 — Architecture audit (what exists today)

| Check | Finding |
|---|---|
| Supabase source of truth | `secret-key-eu` (eu-central-1): 108 profiles, 202 experiences, 31 reservations, Stripe + Redsys payment functions. Healthy. |
| Web → Supabase | Web is the Vite project `secret-key-site` (secretkey.vip). **Latest deployment is in `ERROR` state — fix before launch.** Its repo is not in this session's scope, so I could not verify its Supabase wiring. |
| App → Supabase | Uses the same `profiles` (keyed by `user_id` → `auth.users`). One auth user = one account across web and app. ✅ |
| Supabase → GHL | **Does not exist today** (no GHL function, no outbox, no pg_net trigger). Built here. |
| Bidirectional GHL sync | None found. Keep it that way: the new `ghl-sync` only writes to GHL. |
| This repo | Generic Next.js + Stripe starter (`users`/`subscriptions` tables). It is **not** the Secret Key schema; the new migration targets `secret-key-eu`, not this starter's DB. Recommend moving `supabase/` + `docs/` to the real app repo. |
| `memberships` table | 0 rows, while `profiles.membership_*` holds the real state. Two sources for membership = duplicate-risk. Decide one (recommend `profiles` as is, and have `membership_created` fire from it). |

## What was built (`supabase/`)
- `migrations/20261003000000_web_onboarding_ai_ghl.sql`
  - `onboarding_questions` (3 questions, editable) and `onboarding_responses` (1 row per user; same row for web and app)
  - `onboarding_levels` — levels, score thresholds, rewards and GHL tags **as data** (change without rebuilding the app). Seeded: Concierge Seeker → Circle Contributor → Keeper Candidate (placeholders, rename freely).
  - `ai_evaluations` — scores, profile summary, interests, tags, level; `needs_human_review` flags for later review but never blocks.
  - `event_outbox` + `ghl_contacts` — idempotent (`dedupe_key`), retry-able, 10 whitelisted events only.
  - Triggers for the 10 events; `public_experiences` view for the blurred/locked web calendar (only title/date/location/chapter/image/160-char teaser leave the DB).
- `functions/evaluate-onboarding` — answers → Claude → score → level + reward + tags → stamps completion. Idempotent, rejects short answers, retry-safe if AI fails (answers stay saved).
- `functions/ghl-sync` — drains the outbox, upserts GHL contact by email, adds event/level tags, sets custom fields. Emails stay in GHL workflows triggered by tags.

## Before applying (needs a human decision)
1. **Apply the migration** to `secret-key-eu` (I did not — production DB with 108 real members).
2. Secrets for edge functions: `ANTHROPIC_API_KEY`, `GHL_PRIVATE_TOKEN`, `GHL_LOCATION_ID=WxgbzNocttyUDaSmYNjv`, `SK_SYNC_SECRET`; schedule `ghl-sync` every minute.
3. Create GHL custom fields (keys): `sk_last_event, sk_supabase_user_id, sk_level, sk_score, sk_profile_summary, sk_interests, sk_membership_tier`; create the `sk-event-*` and `sk-level-*` tags; build workflows triggered by those tags (welcome, profile sequence, booking, payment, cancellation).
4. **Gating:** `profiles.approved/request_status` currently gate visibility. Decide whether AI level ≥ X auto-sets `approved`. I did not wire this; the AI result is stored without changing approval.
5. `payment_success` vs `payment_failed` is derived from `membership_payments.status` (`succeeded|paid|success`); confirm the real status values written by the Stripe/Redsys functions.
6. Existing 108 members: backfill `user_registered` into the outbox only if you want them in the same nurture flows (avoid blasting existing members by accident).
7. Anthropic output is data, but answers are user text: kept inside XML tags and the system prompt treats them as data; rate-limit the function per user before public launch (not yet done).

## Priority 5 — Web alignment (for `secret-key-site` repo)
Query `public_experiences` with the anon key for calendar/experiences; render `teaser` and show details as `🔒 Join Secret Key to unlock` for anonymous users; CTA → signup → 3 questions (`onboarding_questions`) → `evaluate-onboarding` → show level + reward.

## Priority 6 — Hand-off to Kumkum (TestFlight)
Kumkum stays on app stability only. Architecture changes are NOT to be made in the app. Items to pass on (from this audit):
- Use the same `auth.users` login as web; do not create a second signup path.
- Onboarding screens must read `onboarding_questions` and call `evaluate-onboarding` (no client-side scoring).
- Do not write to GHL from the app; only Supabase.
- Real TestFlight bug list was not available to me in this session — please paste it and I will triage/format it for Kumkum.
