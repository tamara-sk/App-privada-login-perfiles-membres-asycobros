# Secret Key — working agreement

## Brand voice — non-negotiable

**1. Never define Secret Key by what it is not.** No "we are not a concierge", no "not a
travel agency", no "what we are not" section — in any page, email, product description,
ad, deck or social post. Ever. State what Secret Key **is** and let the contrast happen in
the reader's head.

**2. Positive language always.** Rewrite negation-led sentences into the affirmative.

| Instead of                    | Write                                     |
| ----------------------------- | ----------------------------------------- |
| "We don't waste your time"    | "We hand your time back"                  |
| "Not a luxury club"           | "A membership measured in hours returned" |
| "Nobody remembers the errand" | "The evening is what stays"               |
| "No season codes"             | "One long life. Buy once, wear for years" |
| "We do not sell your data"    | "Your data is yours"                      |

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

## Payments — Redsys, and that is what the code does

Secret Key charges through the **BBVA virtual POS, on Redsys**. Stripe is gone from this
branch: the dependency, the webhook, the customer portal, the product sync and the fixtures.

| Piece                          | Where                                      |
| ------------------------------ | ------------------------------------------ |
| Signature and redirect form    | `src/libs/redsys/`                         |
| Plan prices, the single source | `src/features/membership/plans.ts`         |
| Entry to the Circle: start     | `startPaymentAction` → `/pago/[pedido]`    |
| Shop: address and shipping     | `/store/checkout` → `/store/pago/[pedido]` |
| Confirmation for both          | `/api/redsys/notificacion`                 |
| Data                           | `payments`, `memberships`, `orders`        |

Merchant code **370662108**. Terminal, signing key and environment live in `REDSYS_*`
environment variables, read when used, so the build still runs without credentials. The
signing key **never** goes in git.

Because Redsys charges a signed amount and nothing more, the shop collects the address and
the shipping choice on **our own** `/store/checkout` page before handing over to the bank.
Prices are always re-read from the catalog on the server, so a tampered cart changes
nothing.

What Redsys means in practice:

- It is a redirect gateway. The site posts a signed form to the bank (merchant code,
  terminal, order number, amount, currency), the customer pays on the bank's page, and the
  bank calls back a notification URL. Request and response are signed, so the secret key
  the bank issues never leaves the server.
- **Recurring charges need "pago por referencia"**, which BBVA has to enable on the
  merchant account. The first payment returns a reference token; later charges reuse it.
  The billing cycle then lives in our code rather than in the gateway, so renewals need
  their own scheduler and dunning. Renewal is manual for now, from `/account`.
- Order numbers have a fixed format the bank validates, and each one can be used once.

Confirm the specifics with BBVA before building: which Redsys environment, whether pago
por referencia is enabled, and the exact terminal and currency setup.

## Prices — one canon

Source: **SK Master Context v4** (Notion, 25 Oct 2026, closed the night of 26 Oct). It
replaces the 19 Oct price catalogue and every earlier version.

| Piece                                                                                                                                                  | Where                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| Member tiers: Key 0 €, Secret Key 99 €/yr for entry before 1 Jan 2027 then 220 €/yr (20 €/mo), Master Key 2.500 €/yr (390 €/mo), Wisdom Key 4.300 €/yr | `src/features/membership/plans.ts`    |
| Partner tiers (facilitators, venues, sponsors): Key 0 € · 30 %, Secret Key 290 € · 20 %, Master Key 890 € · 15 %, Wisdom Key = SK Ads pack · 10 %      | `src/features/membership/partners.ts` |
| SK Ads: Essential 150 €/mo + 997 €, Growth 250 €/mo + 1.997 €, Signature 350 €/mo + 2.997 €, extra AI agent 150 €/mo                                   | `src/features/membership/partners.ts` |

Open in v4 (do not invent): Secret Key 99 € first year only or while renewing, Master Key
margin and monthly price, Llavecitas action table and welcome gift, member discounts.
Monthly charging waits for «pago por referencia» on the BBVA terminal.

## Entry to the Circle — apply first, pay inside

1. Sign up, then answer three questions on `/solicitar`: who you are (title or location),
   what you bring to the Circle, what you bring to nature.
2. GHL (built by Kumkum) approves automatically. A **human** decides a rejection, and the
   person may apply again. SK, the board and Circle members can **veto** people or
   companies; a veto closes the application with no retry.
3. Once approved, the person pays any tier from inside (`startPaymentAction` requires
   `applications.status = 'approved'`).
4. GHL pushes decisions to `POST /api/solicitudes/estado` (`Authorization: Bearer
APPLICATIONS_WEBHOOK_SECRET`, body `{ email, status }`).
5. GHL reminds members 10 days before `current_period_end`. An expired entry ends access
   (`getMembership` reads only active, in-date entries) until the member pays again. This
   holds until «pago por referencia» is enabled on the BBVA terminal.

## Codebase

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind · Supabase · Redsys · Resend,
deployed on Vercel.

| Area                                       | Where                                      |
| ------------------------------------------ | ------------------------------------------ |
| Entry to the Circle: plans & payment       | `src/features/membership`                  |
| Accounts and sessions                      | `src/features/account`                     |
| Shop: catalog, cart, checkout, orders      | `src/features/store`                       |
| Tracking, consent, dataLayer events        | `src/libs/analytics`                       |
| Metadata, brand copy, legal entity details | `src/libs/seo/metadata.ts`                 |
| Redsys notification (entries + orders)     | `src/app/api/redsys/notificacion/route.ts` |
| Database migrations                        | `supabase/migrations`                      |

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

## Deployment

The Vercel project `secret-key-site` serves **secretkey.vip** from a _different_
codebase: a Vite SPA deployed by CLI from a local machine. That same Vercel project is
also git-linked to this repository, so every push here triggers a preview build of this
Next.js app inside a project configured for Vite.

Until the two are separated into their own Vercel projects:

- `vercel.json` disables git deployments for `main`, so a merge here can never publish
  this app over the live secretkey.vip.
- Previews still build, and they build **without any environment variables**, because the
  SDK clients are constructed lazily (`src/utils/create-lazy-client.ts`). Keep it that
  way: a client that reads its credentials at import time will take the whole build down
  when Next collects page data.
- A project that actually runs this app needs the Supabase, Redsys and Resend variables
  set for both Preview and Production.

### Before pushing

```bash
npx tsc --noEmit        # types
npx next lint           # eslint, includes import sorting
npx next build          # the real check
npx prettier --write <files you touched>
```

Imports are sorted by `simple-import-sort`; run `npx next lint --fix` when it complains.
