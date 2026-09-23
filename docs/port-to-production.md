> **Nota:** Stripe queda eliminado de esta rama. El cobro va por el TPV Virtual de BBVA
> sobre Redsys, descrito en `CLAUDE.md`. Lo que sigue mencionando Stripe describe la
> plantilla original y ya no refleja el código.

# Porting this work into the production app

`kumkum020704/secret-key-app` is the repository that ships. This branch,
`claude/funny-cannon-t9g3gh` on `tamara-sk/App-privada-login-perfiles-membres-asycobros`,
holds the work that needs to reach it.

## Read this before anything else

**This is an adaptation, not a transfer.** An earlier version of this document assumed the
production repository was the same Next.js starter and described a mechanical patch. It is
not. `secret-key-app` is a pnpm monorepo: an Expo / React Native app in
`artifacts/mobile`, an Express API in `artifacts/api-server`, Postgres with Drizzle, and
Vite with wouter on the web side. There is no Next.js anywhere in it.

Everything here is written in App Router conventions — file-based routes, `robots.ts` and
`sitemap.ts`, Route Handlers, server actions, `next/og`, `next.config.js`. None of it
applies as written. Each piece has to be rebuilt against the monorepo's own stack, as a
new package alongside `artifacts/mobile` and `artifacts/api-server`.

What travels intact is the **content and the decisions**: the catalog, the phrases, the
prices, the tier structure, the brand voice, the legal entity, the privacy copy, and the
rules about what must never regress. What has to be rewritten is every line of framework
code.

**Payments have changed too.** Secret Key charges through the BBVA virtual POS on Redsys,
not Stripe. Everything below that mentions Stripe Checkout describes what this repository
currently does, not what production should do. See the payments section in `CLAUDE.md`.

Kumkum works on `feature/tiered-membership`, not `main`.

## What the pieces do

## Reading the source

```bash
git remote add web https://github.com/tamara-sk/App-privada-login-perfiles-membres-asycobros.git
git fetch web claude/funny-cannon-t9g3gh
```

Read it as a reference implementation. Rebuild area by area in the order below; each area
stands on its own except where noted.

## The areas, in the order to rebuild them

### 1. Foundations — port first, everything else imports them

| File                              | What it holds                                                                                                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/libs/seo/metadata.ts`        | `siteConfig` (name, tagline, description, keywords) and `companyConfig` (legal entity, address, NIF, contact emails), plus `constructMetadata()` for titles, canonicals, Open Graph and Twitter cards. |
| `src/utils/create-lazy-client.ts` | Defers SDK construction to first use.                                                                                                                                                                  |

**Keep the lazy clients lazy.** `stripe-admin.ts`, `supabase-admin.ts` and
`resend-client.ts` were rewritten to use it. A client that reads its credentials at
import time takes the whole build down when Next collects page data — that is exactly the
failure that broke every preview deployment here.

### 2. Tracking and consent — `src/libs/analytics/`

Ten files. Google Tag Manager, GA4, Meta pixel, Google Ads and Microsoft Clarity, every id
an optional env var. Consent Mode v2 defaults are injected inline in `<head>` through
`consent-script.ts`, which the root layout renders before any tag.

Google tags load immediately and hold back storage themselves. Clarity and the Meta pixel
wait for an explicit yes, because session recording is personal data and neither honours
Consent Mode on its own. `consent.ts` broadcasts changes on a window event so recording
starts the moment somebody accepts.

`events.ts` carries typed `dataLayer` helpers on the GA4 recommended e-commerce schema:
`view_item_list`, `view_item`, `add_to_cart`, `remove_from_cart`, `view_cart`,
`begin_checkout`, `purchase` (deduplicated per order id), plus `page_view` on client-side
navigation, `scroll_depth` at 25/50/75/100%, and the membership events.

Root layout wiring: `<AnalyticsProvider />` near the top of `<body>`, `<ConsentBanner />`
inside it, and the consent script in `<head>`.

### 3. The shop — `src/features/store/` and `src/app/store/`

- `catalog.ts` is the single source of truth: 8 merch products and 3 experience packs.
  Adding an object there adds it to the grid, the product page, the sitemap and the
  structured data.
- **Prices are re-read on the server at checkout.** The browser only ever sends slugs,
  variants and quantities. Keep it that way.
- Products declare `fulfilment`. An all-digital basket skips address collection at
  Stripe Checkout; a mixed basket ships, and shipping is priced on the physical part
  alone.
- The cart lives in `localStorage` through `cart-provider.tsx`, mounted in the root
  layout around everything.
- `merch-preview.tsx` draws each product, since there is no photography yet. Replace that
  one component when photos exist.
- Completed one-off payments are written to an `orders` table by the existing Stripe
  webhook (`upsert-order.ts`). Members see their history on `/account`.

Needs the migration in `supabase/migrations/20260914120000_store_orders.sql`, and the
matching `orders` entry in `src/libs/supabase/types.ts`. Regenerate types from the real
project instead of copying that block if you can.

### 4. Membership tiers

`stripe-fixtures.json` and `src/features/pricing/models/product-metadata.ts` describe
tiers in hours returned: hours included, response time, access level, guest passes.
`price-card.tsx` renders the currency each Stripe price was created in — it used to
hardcode a dollar sign, which would print euro amounts as dollars.

### 5. Pages and copy

`/privacy`, `/about-us`, `robots.ts`, `sitemap.ts`, the generated Open Graph images
(site-wide and per product), and the brand rewrite of the home page, navigation, footer,
logo and auth screens.

## Environment variables

Required for the app to run: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`,
`STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`.

Optional, each one skipped when absent: `NEXT_PUBLIC_GTM_ID`,
`NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`,
`NEXT_PUBLIC_CLARITY_PROJECT_ID`.

## Two things that stay behind

`vercel.json` exists because this repository shares a Vercel project with the marketing
site. In the production repo it should carry the framework declaration and drop the
`git.deploymentEnabled` block, which would otherwise stop production deploying.

The Next.js upgrade to 15.5.25 matters wherever this lands: the 15.1 line carries a
middleware authorization bypass, and Supabase session handling runs in middleware.

## Still to decide

- **Experience packs.** Names, inclusions and prices in `catalog.ts` are a working draft.
- **Tier prices and hours.** Same, in `stripe-fixtures.json`.
- **Privacy policy.** Written against what the code actually does, with real entity
  details. It needs a lawyer's read before launch.
- `CLAUDE.md` carries the brand voice rules. Port it: they are non-negotiable and easy to
  undo by accident.
