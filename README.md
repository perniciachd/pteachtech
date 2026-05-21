# pTeachTech Website

The public marketing site + applicant portal for **pTeachTech** — cohort-based AI and AWS Cloud engineering training, operated under [Pernicia](https://pernicia.in) (India Pvt Ltd + Canada Corp).

> *From notebooks to production.*

---

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5.7**
- **Tailwind CSS 4** + **shadcn/ui** (Radix primitives)
- **Supabase** (Auth + Postgres + Storage)
- **Stripe** (USD/CAD/EUR) + **Razorpay** (INR) for dual-entity billing
- **Resend** for transactional email
- **Cal.com** embed for booking
- Hosted on **Vercel** · CDN via **Cloudflare**

## Routes

```
Public:
  /                                 Home
  /cohorts                          All cohorts overview
  /cohorts/ai-engineering           Cohort 1 detail
  /cohorts/aws-cloud                Cohort 2 detail
  /cohorts/ai-deployment            Cohort 3 detail (Combined, two-tier)
  /workshops                        NA in-person 3-day intensives
  /lens                             Resume Lens (launching Feb 2027)
  /about · /compare · /alumni · /blog · /webinars · /contact
  /privacy · /terms · /refund

Auth-gated:
  /auth/login · /auth/callback
  /protected/*

API:
  /api/cohorts · /api/contact · /api/waitlist · /api/webinar/register
```

## Development

```bash
# Install dependencies
pnpm install

# Copy env template (then fill in values for the integrations you need)
cp .env.example .env.local

# Run dev server (works without Supabase env — auth is gracefully skipped)
pnpm dev
# → http://localhost:3000

# Production build
pnpm build && pnpm start

# Lint
pnpm lint
```

The marketing site runs without any environment variables. Auth + payments require Supabase + Stripe + Razorpay credentials (see `.env.example`).

## Brand

| | pTeachTech (this site) | Pernicia (corporate) |
|---|---|---|
| Domain | pteachtech.in | pernicia.in |
| Audience | Cohort learners (B2C) | Enterprise / B2B / NA workshops |
| Voice | Accessible, technical, warm | Authoritative, premium |
| Palette | Navy `#1B2D6B` + Yellow `#F4C430` | Black `#0E0E0E` + Gold `#C9A24B` |

Brand brief and full system documentation live in the parent repo under `traingandenable/PERNICIA_BRAND_BRIEF.md`.

## Cohort Data

Cohort metadata (names, dates, pricing, curriculum, FAQs) is the source of truth for the website and lives in `lib/data/cohorts.ts`. Any change there must be reflected in the locked planning docs:

- `PERNICIA_AI_COHORT_SYLLABUS.md`
- `PERNICIA_AWS_COHORT_CURRICULUM.md`
- `PERNICIA_COMBINED_COHORT_CURRICULUM.md`
- `PERNICIA_3YR_BUSINESS_PLAN.md`

## Deployment

- Production: deployed to Vercel on every push to `main`
- Preview: every PR gets a preview URL
- DNS: Cloudflare → Vercel
- Production domain: `pteachtech.in`

## Contributing

Internal project. For curriculum questions: `manan@pteachtech.in`. For corporate / partnership: `abhir@pernicia.in`.

---

© Pernicia Pvt Ltd · Pernicia Corp · All rights reserved.
