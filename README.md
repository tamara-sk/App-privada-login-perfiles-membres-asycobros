<p align="center">
  <h1 align="center">next-supabase-stripe-starter</h1>
  <p align="center">
    <a href="https://twitter.com/KolbySisk"><img src="/delete-me/github-banner.png" /></a>
  </p>
</p>

<p align="center">
  <a href="https://twitter.com/kolbysisk" rel="nofollow"><img src="https://img.shields.io/badge/created%20by-@kolbysisk-e57060.svg" alt="Created by Kolby Sisk"></a>
  <a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/kolbysisk/next-supabase-stripe-starter" alt="License"></a>
</p>

<p align="center">
  <a href="https://next-supabase-stripe-starter-demo-mnqz.vercel.app" style="font-weight: bold; font-size: 20px; text-decoration: underline;">See the demo</a>
</p>

## Introduction

Bootstrap your SaaS with a modern tech stack built to move quick. Follow the guide to get started.

### What's included

- Next.js 15
- [Supabase](https://supabase.com) - Postgres database & user authentication
- [Stripe](https://stripe.com) - [Checkout](https://stripe.com/docs/payments/checkout), [subscriptions](https://stripe.com/docs/billing/subscriptions/overview), and [customer portal](https://stripe.com/docs/customer-management)
- [React Email](https://react.email/) - Easily build emails and send them with [Resend](https://resend.com)
- [Tailwindcss](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com) - Prebuilt accessible components
- Webhooks to automatically synchronize Stripe with Supabase
- Stripe fixture to bootstrap product data
- Supabase migrations to bootstrap and manage your db schema
- Responsive, performant, and accessible prebuilt pages
- Animated button borders! Now you can look cool without nerds saying you shipped too late

## Getting started

### 1. Setup Supabase

1. Go to [supabase.com](https://supabase.com) and create a project
1. Go to Project Settings → Database → Database password and click reset database password then click generate a new password. (I know you already made one, but this fixes a [bug with their CLI where it doesn't like special characters in the password](https://github.com/supabase/supabase/issues/15184))
1. Save this password somewhere, you can't see it after closing the box

### 2. Setup Stripe

1. Go to [stripe.com](https://stripe.com) and create a project
1. Go to [Customer Portal Settings](https://dashboard.stripe.com/test/settings/billing/portal) and click the `Active test link` button

### 3. Setup Resend

1. Go to [resend.com](https://resend.com) and create an account
1. Go to the [API Keys page](https://resend.com/api-keys) and create an API Key
1. Add the [Supabase Resend integration](https://supabase.com/partners/integrations/resend)

### 4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FKolbySisk%2Fnext-supabase-stripe-starter&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY,SUPABASE_DB_PASSWORD,NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET,RESEND_API_KEY&demo-title=AI%20Twitter%20Banner%20Demo&demo-url=https%3A%2F%2Fai-twitter-banner.vercel.app&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6)

1. Next click the deploy button ⬆️
1. On the form create a new repo and add the Supabase integration
1. Add the environment variables that you have available. For the stripe webhook secret just put any value - we will come back to update this after configuring the webhook
1. Click Deploy
1. While you wait, clone your new repo and open it in your code editor. Then create a file named `.env.local`. Copy and pase the contents of `.env.local.example` into this file and add the correct values. They should be the same values you added in above.

![Vercel env config](/delete-me/deplyoment-env.png)

### 5. Stripe Webhook

1. After deploying go to your Vercel dashboard and find your Vercel URL
1. Next go to your Stripe dashboard, click `Developers` in the top nav, and then the `Webhooks` tab
1. Add an endpoint. Enter your Vercel URL followed by `/api/webhooks`
1. Click `Select events`
1. Check `Select all events`
1. Scroll to the bottom of the page and click `Add endpoint`
1. Click to `Reveal` signing secret and copy it
1. Go to your `Vercel project settings` → `Environment Variables`
1. Update the value of the `STRIPE_WEBHOOK_SECRET` env with your newly acquired webhook secret. Press `Save`

### 6. Run Supabase Migration

Now we're going to run the initial [Supabase Migration](https://supabase.com/docs/reference/cli/supabase-migration-new) to create your database tables.

1. Run `bunx supabase login`
1. Run `bunx supabase init`
1. Open your `package.json` and update both `UPDATE_THIS_WITH_YOUR_SUPABASE_PROJECT_ID` strings with your supabase project id
1. Run `bun run supabase:link`
1. Run `bun run migration:up`

### 7. Run Stripe Fixture

[Stripe fixtures](https://stripe.com/docs/cli/fixtures) are an easy way to configure your product offering without messing around in the Stripe UI.

1. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli#install). For Macs run: `brew install stripe/stripe-cli/stripe`
1. Run (make sure to update the command with your Stripe sk) `stripe fixtures ./stripe-fixtures.json --api-key UPDATE_THIS_WITH_YOUR_STRIPE_SK`

### 8. Last steps

1. Do a `Search All` in your code editor for `UPDATE_THIS` and update all instances with the relevant value (**except for .env.local.example!**)
1. Delete the `delete-me` dir

### 9. Check it out!

You did it! You should be able to look in your Stripe dashboard and see your products, and you should also see the same data has been populated in your Supabase database. Now let's test everything.

1. Run `bun i`
1. Run `bun run dev`.
1. Go to the app and click `Get started for free` - this will take you to the login page
1. We haven't configured auth providers, so for now click `Continue with Email` and submit your email address
1. Click the link sent to your email and you should be redirected back to your app - authenticated
1. Click `Get Started` on one of the plans. This will take you to a Stripe checkout page (In test mode)
1. Enter `4242424242424242` as your credit card number. Fill out the rest of the form with any valid data and click Subscribe
1. You should be redirect to the Account page where you can see your active subscription
1. Click the `Manage your subscription` button

**That's the end of the setup. The following are guides to help you code in your new codebase.**

---

## Guides

### Managing products

Your products and prices are managed via the `stripe-fixtures.json` file. You can delete your test data in Stripe on the [Developers page](https://dashboard.stripe.com/test/developers), make the changes you'd like, and then run the fixture command from above. When changes are made in Stripe the webhook hits the api route at `src/app/api/webhooks`. The handler will synchronize the data sent from Stripe to your Supabase database.

The `metadata` field in your fixture is where we can store info about the product that can be used in your app. For example, say you have a basic product, and one of the features of the product includes a max number of team invites. You can add a field to the metadata like `team_invites`. Then update the Zod schema in `src/features/pricing/models/product-metadata.ts`

Then you can make use of it like this:

```ts
const products = await getProducts();
const productMetadata = productMetadataSchema.parse(products[0].metadata); // Now it's typesafe 🙌!
productMetadata.teamInvites; // The value you set in the fixture
```

### The shop

The merch store lives in `src/features/store` and is served from `/store`.

- **Catalog** — `src/features/store/catalog.ts` is the single source of truth: slug, copy, phrase, price (in cents), sizes, colours and the silhouette used by the preview. Add a product by adding an object; the grid, the product page, the sitemap and the structured data pick it up automatically.
- **Previews** — there is no product photography yet, so `merch-preview.tsx` draws each item: the silhouette sits behind the print, the phrase is typeset the way it is printed (discreet front mark, full phrase on the back). Swap it for real photos by replacing that component.
- **Cart** — client side, persisted in `localStorage` (`cart-provider.tsx`). It only ever stores slugs, variants and quantities.
- **Checkout** — `create-store-checkout-action.ts` rebuilds the basket from the catalog on the server and creates a Stripe Checkout session with inline `price_data`, so no Stripe product has to be created up front. A tampered cart cannot change what a customer is charged. Shipping countries and rates are configured at the top of that file and in `catalog.ts`.
- **Orders** — the Stripe webhook writes every completed one-off payment to the `orders` table (migration `20260914120000_store_orders.sql`). Members see their history on `/account`; row-level security keeps each member to their own rows. Run `npm run migration:up` after pulling.

To change prices, edit `priceCents` in the catalog. To go live with a new product line, add products there and Stripe will price them at checkout.

### Deployment and environment variables

Build-time safety: the Stripe, Supabase-admin and Resend clients are built lazily through
`src/utils/create-lazy-client.ts`, so `next build` completes with no secrets present and a
missing credential surfaces on the request that needs it. Anything new that reads an env
var at module scope will break preview builds again - construct it inside a factory
instead.

`vercel.json` turns off git-triggered deployments for `main`. Remove that line once this
repository has a Vercel project of its own, separate from the one serving the marketing
site.

### Website tracking

Tags are wired in `src/libs/analytics` and configured entirely through environment variables. Any id you leave blank simply does not load.

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container. Recommended: manage GA4, Ads and Meta from inside GTM. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4. Only injected directly when there is no GTM container, to avoid double counting. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta pixel for Instagram/Facebook campaigns. |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads conversion linker. |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Microsoft Clarity: heatmaps, scroll maps and session replay. Free, unlimited traffic. |

What is already instrumented, using the GA4 recommended e-commerce schema (so GTM's built-in tags work with no extra mapping):

`page_view` on every client-side navigation, `view_item_list`, `view_item`, `add_to_cart`, `remove_from_cart`, `view_cart`, `begin_checkout`, and `purchase` on the confirmation page (deduplicated per order id, because people refresh). Membership events (`sign_up`, `login`, `select_plan`, `cta_click`) are available in `src/libs/analytics/events.ts`.

Scroll depth is reported at 25/50/75/100% per page (`scroll_depth`), which is what tells you where readers stop.

Consent Mode v2 is set to denied by default in `<head>` before any tag loads, and the banner in `consent-banner.tsx` updates it. This is what keeps EU traffic compliant and the numbers defensible. The Google tags run under Consent Mode and hold back storage themselves; Clarity and the Meta pixel wait for an explicit yes before they load at all.

**Setting up heatmaps:** create a free project at [clarity.microsoft.com](https://clarity.microsoft.com), put the project id in `NEXT_PUBLIC_CLARITY_PROJECT_ID`, and in the Clarity project settings enable cookie consent so it honours the banner. Within a day you get click maps, scroll maps and session replays, plus rage clicks and dead clicks. Link the Clarity project to GA4 from Clarity's settings to filter recordings by GA4 segment.

**Setting up GTM:** create a container at [tagmanager.google.com](https://tagmanager.google.com), put the `GTM-XXXXXXX` id in `NEXT_PUBLIC_GTM_ID`, then inside GTM add a GA4 Configuration tag on *All Pages* and GA4 Event tags triggered by the custom events listed above. Use *Preview* mode to confirm events fire before publishing the container.

### Managing your database schema

[Migrations](https://supabase.com/docs/reference/cli/supabase-migration-new) are a powerful concept for managing your database schema. Any changes you make to your database schema should be done through migrations.

Say you want to add a table named `invites`.

First run `npm run migration:new add-invites-table`
Then edit your file to include:

```sql
create table invites (
  id uuid not null primary key default gen_random_uuid(),
  email text not null,
);
alter table invites enable row level security;
```

Then run `npm run migration:up` and your table will be added.

### Configuring auth providers

There are many auth providers you can choose from. [See the Supabase docs](https://supabase.com/docs/guides/auth#providers) for the full the list and their respective guides to configure them.

### Styling

- [Learn more about shadcn/ui components](https://ui.shadcn.com/docs)
- [Learn more about theming with shadcn/ui](https://ui.shadcn.com/docs/theming)
- [Learn more about the Tailwindcss theme config](https://tailwindcss.com/docs/theme)

### Emails

Your emails live in the `src/features/emails` dir. Emails are finicky and difficult to style correctly, so make sure to reference the [React Email docs](https://react.email/docs/introduction). After creating your email component, sending an email is as simple as:

```ts
import WelcomeEmail from '@/features/emails/welcome';
import { resendClient } from '@/libs/resend/resend-client';

resendClient.emails.send({
  from: 'no-reply@your-domain.com',
  to: userEmail,
  subject: 'Welcome!',
  react: <WelcomeEmail />,
});
```

### File structure

The file structure uses the group by `feature` concept. This is where you will colocate code related to a specific feature, with the exception of UI code. Typically you want to keep your UI code in the `app` dir, with the exception of reusable components. Most of the time reusable components will be agnostic to a feature and should live in the `components` dir. The `components/ui` dir is where `shadcn/ui` components are generated to.

### Going live

Follow these steps when you're ready to go live:

1. Activate your Stripe account and set the dashboard to live mode
1. Repeat the steps above to create a Stripe webhook in live mode, this time using your live url
1. Update Vercel env variables with your live Stripe pk, sk, and whsec
1. After Vercel has redeployed with your new env variables, run the fixture command using your Stripe sk

---

## Support

If you need help with the setup, or developing in the codebase, feel free to reach out to me on Twitter [@kolbysisk](https://twitter.com/KolbySisk) - I'm always happy to help.

## Contribute

PRs are always welcome.

---

This project was inspired by Vercel's [nextjs-subscription-payments](https://github.com/vercel/nextjs-subscription-payments).
