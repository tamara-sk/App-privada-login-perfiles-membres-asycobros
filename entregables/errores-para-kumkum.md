# Secret Key — findings and status for Kumkum

Compiled 5 October 2026. Everything here is **verified live or against the repository**, with
the reference to check it.

**What you own, and what you can ignore.** You run the **private app**, so section 1 is yours.
Section 2 covers the public website: it is here so you have the full picture, and it is handled
from Claude Code, so **nothing in section 2 is an action for you**.

| | What it is | Where it lives |
| --- | --- | --- |
| **The private app** | Login, profiles, entry to the Circle, payments. **Yours** | `kumkum020704/secret-key-app` |
| **secretkey.vip** | The public website. A Vite SPA deployed by CLI. Handled from Claude Code | Vercel project `secret-key-site` |
| **The reference app** | A Next.js build of the same flows, used to settle decisions | `tamara-sk/App-privada-login-perfiles-membres-asycobros` |

---

## 1. Yours — the private app

### 1.1 Redsys parameters, confirmed

BBVA and Redsys have delivered these. Tamara forwarded them to you on 2 October; Redsys sent
them originally on 18 September.

| Field | Value |
| --- | --- |
| Merchant code (FUC) | `370662108` |
| Terminal | `1` |
| Signature | `HMAC_SHA256_V1` |
| Currency | EUR, numeric `978` |
| Bizum | active on terminal 1, confirmed by BBVA on 2 October |
| Environment | still **test**; the production switch is pending (see 3.2) |

The signing key stays in environment variables and **stays out of git**, on every branch and in
every environment.

### 1.2 Three rules the reference implementation follows

Worth mirroring, because each one closes a real hole:

1. **Prices are re-read on the server at checkout.** The browser sends slugs, sizes and
   quantities; the server resolves them against the catalog and computes the amount. A tampered
   cart changes the display and leaves the charge intact.
2. **The signed notification is the single source of truth for a payment.** The shopper's return
   to the result page is informational. The handler at `/api/redsys/notificacion` verifies the
   signature, checks that **the amount matches the one recorded for that order**, and requires
   `status = 'pending'` when it updates, so a repeated callback from the bank settles the order
   once.
3. **One source for prices.** In the reference app that is `src/features/membership/plans.ts`,
   read on the server. Two price lists drift apart within a month.

Current annual amounts, for cross-checking against yours:

| Tier | Annual amount |
| --- | --- |
| Key | €0 |
| Secret Key | €99 |
| Máster Key | €390 |

### 1.3 Renewal depends on a BBVA setting

Redsys charges a signed amount and hands back a reference. **Recurring charges need "pago por
referencia"**, which BBVA enables per merchant, and it is still pending (see 3.1). Until it is
live:

- Keep renewal **manual**: the holder confirms it, with SCA, from their account area.
- Store the reference the first payment returns, so automatic renewal becomes a switch rather
  than a rebuild. In the reference app the flag is `REDSYS_PAGO_REFERENCIA=true`.
- Once it is enabled, the billing cycle lives in our code: it needs its own scheduler, a
  30-day advance notice per renewal, and dunning for failed charges.

### 1.4 Company details to show in the app

Confirmed by the registry certificate issued by the Commercial Registrar of Castellón de la
Plana on 22 January 2026. Use these verbatim on invoices, receipts and legal screens.

| Field | Value |
| --- | --- |
| Company name | THE SECRET KEY LABS, S.L. |
| Tax ID (NIF) | B25909565 |
| Registered office | Camino Vora Riu Solades **1176**, 12540 Vila-real, Castellón, Spain |
| Registry | Castellón · sheet CS-50580 · electronic folio · entry 1 |
| EUID | ES12011.000207496 |
| Subscribed share capital | €3,000.00 |
| Governing body | Sole director |
| Support phone | +34 614 59 44 06 |

Two details that cost us weeks, worth knowing so they stay fixed:

- The Castellón registry keeps an **electronic folio**. The sheet and the entry identify the
  company, and the paper tomo and folio are superseded. The line to publish is "sheet CS-50580,
  electronic folio, entry 1". A variant reading "Section 8, Entry 1ª" circulated and was wrong;
  it was corrected across the website today.
- The street number is **1176**. A variant reading "1771" circulated in code — same digits,
  different order. It is the field BBVA checks against the deed, so it is worth a second look
  whenever you copy it.

### 1.5 Wording rules

These are brand rules Tamara has settled, and they apply to the app's interface and emails:

| Retired | Use |
| --- | --- |
| member, members, membership | **The Circle** · entry to the Circle |
| club, private members club | **Secret Key**, or **Secret Circle** for the invitation-only inner tier |
| Inner Circle | **Secret Circle** (the only name) |
| Master Key | **Máster Key**, with the accent |

Two more, worth a glance before shipping copy:

- **Describe Secret Key by what it is.** Phrasings built on "we are not a travel agency / not a
  concierge / not a luxury club" are retired everywhere.
- **Affirmative phrasing.** "We hand your time back" rather than "we don't waste your time".

### 1.6 What Secret Key is, in one paragraph

Useful for product copy and for anything you write about the app. Entry to the Circle opens
three things: a **global calendar of experiences organised by chapter**, each chapter a part of
the world with its own agenda across the year; a **local shop**, with physical delivery; and
**access to selected, trusted wellness properties**, verified one by one and bookable from the
same platform. The north star is minutes saved and minutes enjoyed.

---

## 2. For your information — the website (handled from Claude Code)

Listed so you know the state of things. **No action needed from you on any of it.**

### 2.1 Stripe removed at the root

Payment goes through the BBVA virtual POS on Redsys, yet Stripe kept reappearing in the
reference repository. The cause: `main` was stale and **carried Stripe**, so every new branch
inherited it. PR #3 removed it from the live branch (dependency, webhook, customer portal,
product sync, fixtures, and the whole shop, which ran on Stripe Checkout) and PR #4 brought
`main` up to date. Both `main` and the live branch are now at zero references in `src/` and
`package.json`.

### 2.2 The shop rebuilt on Redsys

Redsys charges a signed amount, so the address and shipping choice are now collected on our own
page before handing over to the bank: `/store/checkout` → `/store/pago/[pedido]` →
`/api/redsys/notificacion`.

### 2.3 Registry reference corrected on eight published pages

The footers of `cancelacion`, `contacto`, `cookies`, `devoluciones`, `envios`,
`seguridad-de-pago`, `bali` and `miami` read "Hoja CS-50580, Sección 8, Inscripción 1ª". All
eight now carry the certified wording. Pushed to `tamara-sk/secret-key-site`, commit `c59b06c`.

### 2.4 Three details left on the live legal notice

`/aviso-legal`, `/terminos` and `/privacy` live only on Tamara's Mac, deliberately outside the
repository so a copy never overwrites them. The live legal notice still publishes the old phone
number, the old registry wording and a short extract of the corporate purpose. A corrected page
is prepared and the instructions are in `LEGALES.md`, section "1 bis".

### 2.5 Four blog articles return 404

The files exist in `dist/blog/`, and `vercel.json` is missing their rewrite, while the catch-all
`/((?!blog/).*)` excludes `/blog/`: `soho-house-alternative`, `private-members-club`,
`bali-wellness-retreat`, `why-time-luxury`.

### 2.6 The homepage and `llms.txt` describe Secret Key by negation

`llms.txt` is the file ChatGPT, Claude, Perplexity and Gemini read to learn what Secret Key is,
so it defines the brand across generative AI. The published version carries a whole "WHAT SECRET
KEY IS NOT" section, the retired name "Inner Circle", "private international membership club",
and a sign-up link to `/join`, a route that serves the homepage (the real one is `/acceso`). The
homepage repeats the pattern in its JSON-LD, its FAQ and its `<noscript>` block. Corrected
versions are ready in `tamara-sk/secret-key-site`.

### 2.7 Terminology in the published legal pages

`/terminos` and `/privacidad` use "membresía", "miembro" and "miembros" throughout. They move to
**the Circle** and **entry to the Circle**, per section 1.5.

### 2.8 Contact addresses to unify

The published pages use `legal@` and `privacy@`; the repository configuration uses `hello@` and
`legal@`. One pair, applied in both places.

### 2.9 The website source lives on one laptop

`secretkey.vip` is deployed by CLI from a local machine, and `tamara-sk/secret-key-site` holds
the corrections rather than the site source. While that holds, the laptop is a single point of
failure.

### 2.10 Two codebases in one Vercel project

`secret-key-site` serves secretkey.vip from the Vite SPA **and** is git-linked to the Next.js
reference app. `vercel.json` disables git deployments for `main`, which holds the line; the
clean fix is a Vercel project of its own for the app.

### 2.11 Stale branches, and one stale pointer

Eight branches. `claude/funny-cannon-t9g3gh` and `claude/funny-cannon-sin-stripe` are merged
into `main` and still carry the "1771" address that `main` corrected afterwards, so starting
from them reintroduces it. The repository's `CLAUDE.md` used to point there and now points at
`main`.

---

## 3. Blocked on BBVA

The virtual commerce contract has been **signed and in force since 14 September 2026**, and the
connection parameters arrived on 18 September. Two things are left, both on the bank's side.

### 3.1 Enabling "pago por referencia" (the MIT exemption)

BBVA replied on 2 October asking for the business model, the reason for requesting the
exemption, and **written acceptance of the operational risk** from both Secret Key and the
branch office, because subscription charges run without the payer present and can be disputed.
The reply is drafted and ready at `entregables/correo-bbva-redsys.md`.

### 3.2 The production switch

The merchant is still in test. The change is requested from the TPV admin panel: Comercio →
enter the merchant number → Buscar → Ver y Modificar (the eye icon) → "PASAR A PRODUCCIÓN",
bottom right.

### 3.3 One item on Tamara's side

`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_WEBHOOK_SECRET` may still
sit in the Vercel project (the API returns 403 when listing them from here). They are live
credentials with no remaining use: Vercel → `secret-key-site` → Settings → Environment
Variables.
