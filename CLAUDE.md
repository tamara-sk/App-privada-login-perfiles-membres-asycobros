# Secret Key — working agreement

## Brand voice — non-negotiable

**1. Never define Secret Key by what it is not.** No "we are not a concierge", no "not a
travel agency", no "what we are not" section — in any page, email, product description,
ad, deck or social post. Ever. State what Secret Key **is** and let the contrast happen in
the reader's head.

**2. Positive language always.** Rewrite negation-led sentences into the affirmative.

| Instead of | Write |
| --- | --- |
| "We don't waste your time" | "We hand your time back" |
| "Not a luxury club" | "A membership measured in hours returned" |
| "Nobody remembers the errand" | "The evening is what stays" |
| "No season codes" | "One long life. Buy once, wear for years" |
| "We do not sell your data" | "Your data is yours" |

Watch for: `not`, `never`, `nobody`, `no …`, `don't`, `cannot`, `refuse`, `without`.
Each one is a prompt to rewrite, in marketing copy and legal pages alike — precision in a
privacy policy is kept by choosing affirmative phrasing, not by dropping the rule.

**3. Positioning.** Secret Key is a **time optimization and extraordinary access
ecosystem**. Every piece of copy should reinforce that. The north star is minutes saved
and minutes enjoyed — time returned, and what it becomes.

**4. Tone.** Calm, confident, understated. Short sentences. Warm, generous, human. Never
loud, never salesy, never apologetic.

## Product principles

Every feature earns its place by saving time, creating a meaningful experience, increasing
access or strengthening relationships. Anything else is out.

1. Time is the ultimate luxury
2. Access beats ownership
3. Simplicity scales
4. Trust compounds
5. Experiences create memories
6. Community creates leverage

## Codebase

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind · Supabase · Stripe · Resend,
deployed on Vercel.

| Area | Where |
| --- | --- |
| Membership pricing & checkout | `src/features/pricing` |
| Accounts, sessions, subscriptions | `src/features/account` |
| Shop: catalog, cart, checkout, orders | `src/features/store` |
| Tracking, consent, dataLayer events | `src/libs/analytics` |
| Metadata, brand copy, legal entity details | `src/libs/seo/metadata.ts` |
| Stripe webhook (subscriptions + orders) | `src/app/api/webhooks/route.ts` |
| Database migrations | `supabase/migrations` |

- **Shop products** live in `src/features/store/catalog.ts`. Adding an object there adds it
  to the grid, the product page, the sitemap and the structured data.
- **Prices are re-read on the server at checkout**, so the browser never dictates what a
  customer is charged. Keep it that way.
- **Analytics ids are optional env vars.** A missing id skips that script; everything else
  keeps working. Google tags run under Consent Mode; Clarity (heatmaps, session replay) and
  the Meta pixel load only once consent is granted.
- **Brand voice for tools outside this repo** (GoHighLevel, agencies, freelancers) lives in
  `docs/brand-voice.md`, ready to paste.
- **Consent is denied by default** and can be withdrawn on `/privacy`. Both the banner and
  that control go through `src/libs/analytics/consent.ts`.
- **Legal entity details** are placeholders in `companyConfig` (`src/libs/seo/metadata.ts`)
  until Tamara fills them in.

### Before pushing

```bash
npx tsc --noEmit        # types
npx next lint           # eslint, includes import sorting
npx next build          # the real check
npx prettier --write <files you touched>
```

Imports are sorted by `simple-import-sort`; run `npx next lint --fix` when it complains.
