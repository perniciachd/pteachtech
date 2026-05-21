import { MarketingLayout } from '@/components/layout'

export const metadata = {
  title: 'Refund Policy',
  description: 'pTeachTech refund policy - our commitment to your satisfaction.',
}

export default function RefundPage() {
  return (
    <MarketingLayout showCohortBar={false}>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Refund Policy
          </h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Our Commitment</h2>
            <p className="text-muted-foreground mb-4">
              We are committed to your success and satisfaction. We believe in the quality of our 
              programs and want you to feel confident in your investment.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Full Refund Period</h2>
            <p className="text-muted-foreground mb-4">
              You may request a full refund within <strong>7 days</strong> of your cohort start date, 
              no questions asked. If you find that the program isn&apos;t the right fit, simply contact us 
              and we&apos;ll process your refund.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Partial Refunds</h2>
            <p className="text-muted-foreground mb-4">
              After the 7-day full refund period:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Days 8-14: 75% refund</li>
              <li>Days 15-21: 50% refund</li>
              <li>After day 21: No refund, but you may defer to a future cohort</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Deferral Option</h2>
            <p className="text-muted-foreground mb-4">
              If you&apos;re unable to complete a program due to unforeseen circumstances, you may 
              defer your enrollment to a future cohort at no additional cost. Deferral requests 
              must be made before the end of week 4 of your program.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Workshop Refunds</h2>
            <p className="text-muted-foreground mb-4">
              For standalone workshops (not part of a full cohort program), refunds are available 
              up to 48 hours before the workshop start time.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">How to Request a Refund</h2>
            <p className="text-muted-foreground mb-4">
              To request a refund, please contact us at refunds@pteachtech.com with your name, 
              email, and program details. Refunds are typically processed within 5-7 business days 
              and will be credited to your original payment method.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Exceptions</h2>
            <p className="text-muted-foreground mb-4">
              We understand that life happens. If you have extenuating circumstances that don&apos;t fit 
              within our standard policy, please reach out to us. We&apos;ll do our best to work with 
              you on a fair resolution.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Contact</h2>
            <p className="text-muted-foreground mb-4">
              For any questions about our refund policy, please contact us at refunds@pteachtech.com 
              or through our contact page.
            </p>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
