import Link from 'next/link'
import { MarketingLayout } from '@/components/layout'

export const metadata = {
  title: 'Refund Policy',
  description:
    'pTeachTech refund policy. Full refund Day 1–3 of the cohort, 50% Day 4–9, none after Day 10. Workshop and pre-cohort refunds handled separately.',
  alternates: { canonical: 'https://pteachtech.in/refund' },
}

export default function RefundPage() {
  return (
    <MarketingLayout showCohortBar={false}>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Refund Policy</h1>
          <p className="mt-4 text-muted-foreground">Last updated: May 21, 2026</p>

          {/* Draft notice */}
          <div className="mt-8 rounded-lg border-l-4 border-accent bg-accent/10 p-4 text-sm">
            <p className="font-semibold">Draft pending legal review.</p>
            <p className="mt-1 text-muted-foreground">
              The policy below reflects our intended practice and matches the refund schedule in
              our cohort syllabus. Final wording is pending legal review. Email{' '}
              <a href="mailto:learn@pteachtech.in" className="underline">learn@pteachtech.in</a>{' '}
              with any refund questions.
            </p>
          </div>

          <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              Our position
            </h2>
            <p className="text-muted-foreground mb-4">
              Cohorts succeed when prerequisites are met and the format fits. We&apos;d rather
              refund someone early than have them struggle through six weeks. The schedule below
              applies to cohort fees only.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              Cohort refund schedule
            </h2>
            <p className="text-muted-foreground mb-4">
              Days are counted from the official cohort start date (the first live session).
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li><strong>Before cohort starts (Day 0 and earlier):</strong> 100% refund — no questions asked.</li>
              <li><strong>Days 1–3 of the cohort:</strong> 100% refund.</li>
              <li><strong>Days 4–9 of the cohort:</strong> 50% refund.</li>
              <li><strong>Day 10 onwards:</strong> No refund, no deferral.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              Pre-cohort assessment failures
            </h2>
            <p className="text-muted-foreground mb-4">
              If you reserve a seat and subsequently do not pass our pre-cohort skill assessment,
              you receive a <strong>100% refund</strong> regardless of timing — including
              up to the day before the cohort starts. The assessment is a fit check, not a
              gotcha; we don&apos;t profit from misalignment.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              Workshop refunds (NA in-person)
            </h2>
            <p className="text-muted-foreground mb-4">
              For 3-day in-person workshops in Toronto, San Francisco, Dubai, and other cities:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li><strong>14+ days before the workshop:</strong> 100% refund.</li>
              <li><strong>7–13 days before:</strong> 50% refund.</li>
              <li><strong>Less than 7 days before:</strong> No refund; you may transfer your seat to a colleague at no additional cost.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              Resume Lens, Application Assist, and other paid products
            </h2>
            <p className="text-muted-foreground mb-4">
              For paid products that are not cohorts (e.g., Resume Lens roadmaps, Application
              Assist subscriptions), refunds are available within 7 days of purchase if the
              product has not been delivered. After delivery, refunds are not provided. We will
              cancel any active subscription on request, effective at the end of the current
              billing period.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              How to request a refund
            </h2>
            <p className="text-muted-foreground mb-4">
              Email <a href="mailto:learn@pteachtech.in" className="text-primary hover:underline">learn@pteachtech.in</a> with:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Your full name and the email used at purchase</li>
              <li>Application ID or Razorpay Payment ID (from your confirmation email)</li>
              <li>Cohort or product</li>
              <li>Reason for the refund (helps us improve; not required)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              Processing time
            </h2>
            <p className="text-muted-foreground mb-4">
              Once approved, refunds are processed within <strong>5–7 business days</strong> via
              the original payment method (Razorpay for INR; Stripe for international transactions
              when available). The bank or card issuer may take additional time to reflect the
              credit on your statement.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              Pro-rated refunds and edge cases
            </h2>
            <p className="text-muted-foreground mb-4">
              The schedule above is non-negotiable for self-served cancellations. However, if you
              have an extenuating circumstance (medical emergency, family emergency, documented
              employer-mandated travel), email us. We will review case-by-case and have, in many
              such situations, offered cohort deferral as an alternative to refund.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              Disciplinary removal
            </h2>
            <p className="text-muted-foreground mb-4">
              If you are removed from a cohort for violation of our Code of Conduct (see{' '}
              <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>{' '}
              §8), no refund is provided.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              Contact
            </h2>
            <p className="text-muted-foreground mb-4">
              All refund requests: <a href="mailto:learn@pteachtech.in" className="text-primary hover:underline">learn@pteachtech.in</a>
              <br />
              General contact: <Link href="/contact" className="text-primary hover:underline">pteachtech.in/contact</Link>
            </p>
            <p className="text-muted-foreground mb-4">
              Refunds are issued by the same Pernicia entity that processed the original
              payment (Pernicia Pvt Ltd for INR; Pernicia Corp for international currencies when
              available).
            </p>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
