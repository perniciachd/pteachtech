import Link from 'next/link'
import { MarketingLayout } from '@/components/layout'

export const metadata = {
  title: 'Terms of Service',
  description:
    'Terms of service for pTeachTech cohort programs, operated by Pernicia Pvt Ltd (India) and Pernicia Corp (Canada).',
  alternates: { canonical: 'https://pteachtech.in/terms' },
}

export default function TermsPage() {
  return (
    <MarketingLayout showCohortBar={false}>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Terms of Service</h1>
          <p className="mt-4 text-muted-foreground">Last updated: May 21, 2026</p>

          {/* Draft notice */}
          <div className="mt-8 rounded-lg border-l-4 border-accent bg-accent/10 p-4 text-sm">
            <p className="font-semibold">Draft pending legal review.</p>
            <p className="mt-1 text-muted-foreground">
              These terms are a working draft drafted in good faith but not yet reviewed by a
              qualified attorney. If you&apos;re engaging with us commercially before the final
              version is published, email{' '}
              <a href="mailto:legal@pernicia.in" className="underline">legal@pernicia.in</a> with any questions.
            </p>
          </div>

          <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing or using pTeachTech (operated by Pernicia Pvt Ltd, India, and Pernicia Corp, Canada — together, &ldquo;Pernicia&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, do not use our services.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Services description</h2>
            <p className="text-muted-foreground mb-4">
              We offer cohort-based engineering education and consulting:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Six-week live cohort programs in AI Engineering and AWS Cloud-DevSecOps</li>
              <li>A combined cohort on AI deployment to AWS and Azure</li>
              <li>In-person workshops (delivered under the Pernicia brand at <a href="https://pernicia.in" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">pernicia.in</a>)</li>
              <li>Custom corporate training engagements</li>
              <li>The Resume Lens product (currently in pre-launch waitlist phase)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Eligibility</h2>
            <p className="text-muted-foreground mb-4">
              You must be 18 or older to use our services. By using the services, you represent that you meet this requirement and that the information you provide is accurate.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Applications and admission</h2>
            <p className="text-muted-foreground mb-4">
              Cohort admission requires completing our pre-cohort skill assessment. We reserve the right to decline applications that do not meet the prerequisite bar, with a full refund issued. We do not guarantee admission, completion, employment, or any specific career outcome.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Payment</h2>
            <p className="text-muted-foreground mb-4">
              All cohort fees are payable upfront at the time of application via our payment provider (Razorpay for INR transactions). Pricing displayed at the time of your application is binding for that application. Founding-cohort pricing is reserved for the first 20 applicants per batch.
            </p>
            <p className="text-muted-foreground mb-4">
              For Indian transactions, billing is by Pernicia Pvt Ltd and includes applicable GST. International transactions, when available, will be billed by Pernicia Corp.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Refunds and cancellation</h2>
            <p className="text-muted-foreground mb-4">
              Our refund policy is published separately at <Link href="/refund" className="text-primary hover:underline">pteachtech.in/refund</Link> and incorporated into these terms by reference.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Intellectual property</h2>
            <p className="text-muted-foreground mb-4">
              <strong>Course materials we provide</strong> — including slide decks, lab repositories, written documentation, and recordings — are owned by Pernicia and licensed to you for personal, non-commercial use during and after the cohort. You may not reproduce, redistribute, resell, or create derivative works without our written permission.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Capstone projects you build</strong> are owned 100% by you. Pernicia retains a non-exclusive, perpetual licence to showcase your capstone (with attribution) in marketing materials, with your explicit consent at submission.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Pernicia and pTeachTech</strong> are trademarks of Pernicia Pvt Ltd / Pernicia Corp. You may not use these marks without permission.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">8. Code of conduct</h2>
            <p className="text-muted-foreground mb-4">
              You agree to conduct yourself professionally and respectfully in all interactions with instructors, staff, guests, and fellow cohort members. Harassment, discrimination, plagiarism (passing off others&apos; work as your own in the capstone), or disruptive behaviour are grounds for removal from the cohort without refund.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>AI tool usage:</strong> You are permitted (and encouraged) to use AI tools during the cohort to learn and build. However, your capstone code must be your own work. Copying another candidate&apos;s repository constitutes plagiarism.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">9. Recordings and content sharing</h2>
            <p className="text-muted-foreground mb-4">
              Lab sessions may be recorded for cohort use only. Concept session recordings are posted to the LMS for missed-session catchup. You may not share these recordings outside the cohort. Violations result in immediate cohort removal and alumni network ban.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">10. No guarantees</h2>
            <p className="text-muted-foreground mb-4">
              We do not guarantee employment, job offers, salary outcomes, certification pass rates, or any specific career advancement as a result of completing our programs. We provide cohort instruction, capstone supervision, and (for Cohort 3 Tier 2 graduates) introductions to placement partners — the outcome of those interviews is between you and the partner.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">11. Limitation of liability</h2>
            <p className="text-muted-foreground mb-4">
              To the maximum extent permitted by law, Pernicia&apos;s aggregate liability arising out of or relating to these terms or your use of our services is limited to the amount you paid us in the 12 months preceding the claim. We are not liable for indirect, incidental, special, consequential, or punitive damages.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">12. Privacy</h2>
            <p className="text-muted-foreground mb-4">
              Our handling of your personal data is described in our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, which is incorporated into these terms by reference.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">13. Changes to these terms</h2>
            <p className="text-muted-foreground mb-4">
              We may update these terms from time to time. Material changes will be communicated to active cohort participants by email. The &ldquo;Last updated&rdquo; date at the top reflects the current version. Continued use of services after a material change constitutes acceptance.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">14. Governing law and jurisdiction</h2>
            <p className="text-muted-foreground mb-4">
              For services billed by Pernicia Pvt Ltd (INR transactions), these terms are governed by the laws of India, with exclusive jurisdiction of courts in [city pending].
            </p>
            <p className="text-muted-foreground mb-4">
              For services billed by Pernicia Corp (CAD/USD/EUR transactions, when available), these terms are governed by the laws of the Province of [Ontario/British Columbia — pending], Canada.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">15. Contact</h2>
            <p className="text-muted-foreground mb-4">
              Legal inquiries: <a href="mailto:legal@pernicia.in" className="text-primary hover:underline">legal@pernicia.in</a>
              <br />
              General contact: <Link href="/contact" className="text-primary hover:underline">pteachtech.in/contact</Link>
            </p>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
