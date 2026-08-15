# pTeachTech Website

The marketing site + admin portal for **pTeachTech** — **B2B enterprise AI and engineering training**, delivered as private team programs (onsite or virtual), operated under [Pernicia](https://pernicia.in) (India Pvt Ltd + Canada Corp).

> *From notebooks to production.*

Every program currently on the site is **B2B**: sold to organisations for their teams, not per-seat to individuals. There is no public price and no individual enrolment flow — the CTA on every program is a scoping call. The earlier B2C cohorts are retired but retained in data (see [Cohort Data](#cohort-data)).

---

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5.7**
- **Tailwind CSS 4** + **shadcn/ui** (Radix primitives)
- **Neon** (serverless Postgres) — training feedback + session storage; migrations in `db/migrations`
- **Supabase** (Auth) — `@supabase/ssr`; auth is gracefully skipped when env is absent
- **Razorpay** (INR) — order creation + webhook. *Stripe env keys exist in `.env.example` but there is no Stripe code in the repo yet.*
- **Resend** for transactional email
- **Cal.com** embed for booking
- Hosted on **Vercel** · CDN via **Cloudflare**

## Routes

```
Public:
  /                                   Home
  /cohorts                            All programs overview
  /cohorts/[slug]                     Program detail (SSG via generateStaticParams)
                                        · ai-forward-deployed-engineer   (flagship, 80 hrs)
                                        · enterprise-copilot             (5/10-day)
                                        · fullstack-java                 (60 hrs)
  /compare                            Program comparison
  /workshops                          NA in-person intensives
  /lens                               Resume Lens
  /about · /alumni · /blog · /webinars · /contact
  /privacy · /terms · /refund

Enrolment (legacy B2C flow — not linked from any B2B program):
  /apply · /apply/success             Razorpay-backed enrolment

Training feedback:
  /feedback · /feedback/qr            Generic anonymous feedback form + QR
  /f/[code] · /f/[code]/qr            Per-session feedback form + QR

Contact card:
  /connect · /connect/qr              Personal vCard + QR

Admin (token-gated):
  /admin · /admin/login
  /admin/feedback · /admin/feedback/sessions

Auth:
  /auth/callback · /auth/error

API:
  /api/cohorts · /api/contact · /api/waitlist · /api/webinar/register
  /api/feedback · /api/vcard
  /api/payments/create-order · /api/payments/webhook/razorpay
  /api/admin/{login,logout,feedback,sessions,payments,qr}
```

`sitemap.ts` is generated from the cohort data, so adding a visible program indexes it automatically. `robots.ts` disallows `/admin`, `/api/`, `/apply`, `/auth/`, `/feedback`, `/f/`, `/connect` and the three retired B2C cohort paths.

## Development

```bash
# Install dependencies
pnpm install

# Copy env template (then fill in values for the integrations you need)
cp .env.example .env.local

# Run dev server (works without Supabase env — auth is gracefully skipped)
pnpm dev
# → http://localhost:3000

# Type check
pnpm exec tsc --noEmit

# Lint (ESLint 9 flat config — eslint.config.mjs)
pnpm lint

# Production build
pnpm build && pnpm start
```

The marketing site runs without any environment variables. Feedback storage needs `DATABASE_URL` (Neon); auth needs Supabase; payments need Razorpay (see `.env.example`).

**Linting.** `eslint.config.mjs` is an ESLint 9 flat config. `eslint-config-next` 16 ships native flat-config arrays, so no `@eslint/eslintrc` `FlatCompat` shim is needed, and `next/core-web-vitals` already bundles `next/typescript`.

Two rules are set deliberately:

- **`no-console: warn`** — every `console.*` call in the codebase already carries an explicit `eslint-disable-next-line no-console`, so the rule is enabled to keep those directives meaningful rather than flagged as unused.
- **`react-hooks/set-state-in-effect: warn`** — this React Compiler-era rule fires on the fetch-then-setState pattern in the admin pages and `hooks/use-mobile.ts`. Downgraded to a warning so lint passes, kept visible as genuine cleanup rather than silenced.

`components/ui/**` is ignored — vendored shadcn/ui primitives.

Current state: **0 errors, 8 warnings**, all pre-existing. Three of the warnings are stale `react/no-danger` disable directives for a rule `eslint-config-next` doesn't enable; left in place as author intent rather than stripped.

## Brand

| | pTeachTech (this site) | Pernicia (corporate) |
|---|---|---|
| Domain | pteachtech.in | pernicia.in |
| Role | B2B training delivery — private team programs | Corporate parent · consulting, advisory & contracting entity |
| Audience | Enterprise L&D, engineering leaders, delivery heads | Enterprise buyers, partners |
| Voice | Practitioner-led, concrete, technical | Authoritative, premium |
| Palette | Navy `#1B2D6B` + Yellow `#F4C430` | Black `#0E0E0E` + Gold `#C9A24B` |

Brand brief and full system documentation live in the parent repo under `traingandenable/PERNICIA_BRAND_BRIEF.md`.

## Cohort Data

`lib/data/cohorts.ts` is the source of truth for every program surface — the listing page, home cards, compare table, sticky bar, sitemap and the `[slug]` detail route all read from it. **Adding a program is a data change, not a UI change**; only hardcoded marketing copy (home hero, `/cohorts` intro) ever needs touching.

Two flags drive behaviour:

| Flag | Effect |
|---|---|
| `b2b: true` | Private team program. Hides per-seat pricing, swaps every CTA to "Book a scoping call", badges as "Private team program", adds the *Delivered for* section, and sets `courseMode: ['Onsite','Online']` in the Course schema. Pair with `pricing: []`. |
| `hidden: true` | Excluded from `cohorts` (and therefore from all listings, routes and the sitemap) while staying in `allCohorts` for future re-enable. |

Also: `curriculumUnitLabel` switches the curriculum badge from `Week` to `Module` for programs not organised by week.

**Currently visible (all B2B):**

| Slug | Program | Duration |
|---|---|---|
| `ai-forward-deployed-engineer` | AI Forward Deployed Engineer — Foundation | 80 hrs · 10.5 days |
| `enterprise-copilot` | Multi-Agent Copilot & Enterprise AI Architecture | 5-day core / 10-day enterprise |
| `fullstack-java` | Full-Stack Java: Spring, React, Kubernetes & Cloud | 60 hrs · 4 weeks |

**Retired B2C cohorts** (`hidden: true`, also disallowed in `robots.ts`): `ai-engineering`, `aws-cloud`, `ai-deployment`. Kept in data so pricing and curriculum history aren't lost. The locked planning docs below describe *these* programs:

- `PERNICIA_AI_COHORT_SYLLABUS.md`
- `PERNICIA_AWS_COHORT_CURRICULUM.md`
- `PERNICIA_COMBINED_COHORT_CURRICULUM.md`
- `PERNICIA_3YR_BUSINESS_PLAN.md`

Content for the B2B programs lives outside this repo, in the delivery-collateral folder (program content decks and curriculum documents). Keep `cohorts.ts` and the corresponding deck in step — the deck is what goes to the client, this file is what goes on the web.

## Marketing attribution

`lib/attribution.ts` + `components/attribution-tracker.tsx` answer *"which campaign produced this lead?"* — not just "how many people visited".

**How it works.** The tracker (mounted once in the root layout, inside `<Suspense>` so static pages aren't deopted to dynamic) records UTM params, referrer and landing path on every navigation, into `localStorage`. **First touch wins and is never overwritten** — if someone arrives from a LinkedIn post, leaves, and returns a week later via Google, the post keeps the credit because it did the work. Last touch is stored separately and shown only when it differs.

That payload is attached to contact-form submissions and rendered in the internal notification email under *"Where this lead came from"*, and the campaign params are appended to the outbound Cal.com URL so a booked call stays traceable across the domain boundary.

**Tagging convention** — every marketing link must carry UTMs, or the visit is anonymous:

```
?utm_source=linkedin&utm_medium=social&utm_campaign=fde-2026&utm_content=post-04-integration
```

`utm_content` identifies the individual post/creative; everything else stays constant per campaign.

**Constraints, so nobody over-trusts the numbers:**
- `localStorage` is per-browser — a phone→laptop switch breaks the chain, as does clearing site data.
- Storage is unavailable in Safari private mode and some embedded browsers. Every access is guarded; failure degrades to "no attribution" rather than a broken form.
- Attribution arrives from the client and originates in URL params, so it is untrusted: every field is length-capped in the Zod schema and HTML-escaped before it reaches an email.
- Nothing is sent to a third party and no cookies are set — it's first-party `localStorage` only.

## Deployment

- Production: deployed to Vercel on every push to `main`
- Preview: every PR gets a preview URL, with a Vercel status check on the PR
- DNS: Cloudflare → Vercel
- Production domain: `pteachtech.in`

## Contributing

Internal project. For curriculum questions: `abhir@pernicia.in`. For corporate / partnership: `abhir@pernicia.in`.

---

© Pernicia Pvt Ltd · Pernicia Corp · All rights reserved.
