import { MarketingLayout } from '@/components/layout'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy',
  description:
    'How pTeachTech (operated by Pernicia Pvt Ltd · India + Pernicia Corp · Canada) collects, uses, and protects your data. DPDP Act 2023 (India) + GDPR-aware.',
  alternates: { canonical: 'https://pteachtech.in/privacy' },
}

export default function PrivacyPage() {
  return (
    <MarketingLayout showCohortBar={false}>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: May 21, 2026
          </p>

          {/* Draft notice */}
          <div className="mt-8 rounded-lg border-l-4 border-accent bg-accent/10 p-4 text-sm">
            <p className="font-semibold">Draft pending legal review.</p>
            <p className="mt-1 text-muted-foreground">
              This privacy policy is a working draft drafted in good faith but not yet reviewed
              by a qualified attorney. If you&apos;re engaging with us commercially before the
              final version is published, email{' '}
              <a href="mailto:privacy@pernicia.in" className="underline">privacy@pernicia.in</a>{' '}
              with any questions.
            </p>
          </div>

          <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              1. Who we are
            </h2>
            <p className="text-muted-foreground mb-4">
              pTeachTech is the cohort-based education brand operated by:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li><strong>Pernicia Pvt Ltd</strong> — registered in India, handles INR billing and India-resident data.</li>
              <li><strong>Pernicia Corp</strong> — registered in Canada, handles international currency billing (USD / CAD / EUR) and the corresponding data.</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              These entities are jointly the data controllers for your information under the applicable laws (DPDP Act 2023 in India; GDPR in the EU; PIPEDA in Canada). Together we are referred to as &ldquo;Pernicia&rdquo; or &ldquo;we&rdquo; below.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              2. Information we collect
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Information you provide:</strong>
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Name, email, phone, country (via /apply, /contact, waitlist forms)</li>
              <li>Pre-cohort assessment artifacts (GitHub repository URLs you submit)</li>
              <li>Why-this-cohort responses and other free-text in application forms</li>
              <li>Payment details — processed directly by <strong>Razorpay</strong> (for INR) or our payment partners; we do <em>not</em> store your card number, CVV, or bank credentials</li>
              <li>Communications you send us (emails, Cal.com booking notes, Slack messages in our cohort community)</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              <strong>Information collected automatically:</strong>
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>IP address, user agent, and rough geolocation (city-level) via standard server logs and analytics</li>
              <li>Cookies and similar technologies for session management, security, and (if enabled) analytics</li>
              <li>Behavioral data on this website if PostHog analytics is active (page views, feature usage; no personally identifying content)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              3. How we use your information
            </h2>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>To process your application and payment for a cohort</li>
              <li>To deliver the cohort program, including communication, materials, and capstone reviews</li>
              <li>To send transactional emails (application confirmation, payment receipt, cohort kickoff, etc.)</li>
              <li>To improve our curriculum and operations</li>
              <li>To comply with legal obligations (tax records, GST/HST filings, regulatory inquiries)</li>
              <li>To protect against fraud, abuse, or violations of our Terms</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              We do <strong>not</strong> sell your personal data to third parties. We do <strong>not</strong> use your information to train third-party AI models.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              4. Who we share information with
            </h2>
            <p className="text-muted-foreground mb-4">
              We share limited information with service providers (data processors) acting on our behalf, strictly for the purposes listed above:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li><strong>Razorpay</strong> (India) — payment processing for INR transactions</li>
              <li><strong>Stripe</strong> (USA / global) — payment processing for international transactions (planned; not currently used as ME/US pricing is not yet public)</li>
              <li><strong>Resend</strong> — transactional email delivery</li>
              <li><strong>Supabase</strong> — authentication and database hosting (when activated)</li>
              <li><strong>Vercel</strong> — website hosting and edge delivery</li>
              <li><strong>Cloudflare</strong> — DNS, DDoS protection, and edge caching</li>
              <li><strong>Cal.com</strong> — booking infrastructure for discovery calls</li>
              <li><strong>PostHog</strong> — product analytics (when enabled)</li>
              <li><strong>Sentry</strong> — error tracking (when enabled)</li>
              <li><strong>Cohort community providers</strong> — Slack and/or Circle for cohort communication once enrolled</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              Each of these providers has their own privacy policy and data-protection commitments. Where required by law, we have or will have a Data Processing Agreement in place.
            </p>
            <p className="text-muted-foreground mb-4">
              We may also disclose your information if required by a valid legal request, to protect against fraud, or to enforce our Terms.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              5. International transfers
            </h2>
            <p className="text-muted-foreground mb-4">
              Because Pernicia operates from India and Canada, your information may be transferred and processed in both jurisdictions, as well as in any country where our service providers operate (notably the United States, where Vercel, Stripe, Resend, PostHog, and Sentry are headquartered).
            </p>
            <p className="text-muted-foreground mb-4">
              We rely on standard contractual safeguards from these providers. By using our services, you consent to these international transfers.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              6. Data retention
            </h2>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li><strong>Active applications and enrolments:</strong> kept while you are an applicant or active cohort participant, plus 3 years afterwards for tax and audit purposes (GST/HST filings require record retention).</li>
              <li><strong>Payment records:</strong> retained for 8 years per Indian tax law.</li>
              <li><strong>Marketing / waitlist emails:</strong> retained until you unsubscribe or 24 months of inactivity, whichever is sooner.</li>
              <li><strong>Server logs:</strong> retained for 90 days.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              7. Your rights
            </h2>
            <p className="text-muted-foreground mb-4">
              Depending on your jurisdiction (India / EU / Canada / others), you have rights to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Access the information we hold about you</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your information (subject to legal retention requirements)</li>
              <li>Object to or restrict certain processing</li>
              <li>Withdraw consent for marketing emails at any time (unsubscribe link in every marketing email)</li>
              <li>Lodge a complaint with the relevant data protection authority</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              To exercise any of these rights, email <a href="mailto:privacy@pernicia.in" className="text-primary hover:underline">privacy@pernicia.in</a>. We respond within 30 days.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              8. Cookies
            </h2>
            <p className="text-muted-foreground mb-4">
              We use cookies for: (a) essential functionality like session management and security; (b) preferences such as your selected cohort filter; (c) when enabled, anonymous analytics.
            </p>
            <p className="text-muted-foreground mb-4">
              You can disable cookies in your browser settings. Disabling essential cookies will prevent payment and login from working.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              9. Children
            </h2>
            <p className="text-muted-foreground mb-4">
              Our services are not directed at individuals under 18. If you believe we have collected information from a minor, please email <a href="mailto:privacy@pernicia.in" className="text-primary hover:underline">privacy@pernicia.in</a> and we will delete it.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              10. Security
            </h2>
            <p className="text-muted-foreground mb-4">
              We use reasonable technical and organisational measures: HTTPS/TLS for all web traffic, encrypted-at-rest databases through our cloud providers, access controls, and the security defaults provided by Supabase, Vercel, and our payment processors. No system is perfectly secure; if you suspect a breach, contact us immediately.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              11. Changes to this policy
            </h2>
            <p className="text-muted-foreground mb-4">
              We may update this policy as our practices change. Material changes will be communicated via email to active users. The &ldquo;Last updated&rdquo; date at the top of this page always reflects the current version.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              12. Contact
            </h2>
            <p className="text-muted-foreground mb-4">
              Privacy-related inquiries: <a href="mailto:privacy@pernicia.in" className="text-primary hover:underline">privacy@pernicia.in</a>
              <br />
              General contact: <Link href="/contact" className="text-primary hover:underline">pteachtech.in/contact</Link>
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Data Controllers:</strong>
              <br />
              Pernicia Pvt Ltd (India) — [Registered office address pending]
              <br />
              Pernicia Corp (Canada) — [Registered office address pending]
            </p>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
