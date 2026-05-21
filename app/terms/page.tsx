import { MarketingLayout } from '@/components/layout'

export const metadata = {
  title: 'Terms of Service',
  description: 'pTeachTech terms of service - the rules and guidelines for using our platform.',
}

export default function TermsPage() {
  return (
    <MarketingLayout showCohortBar={false}>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Terms of Service
          </h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing or using pTeachTech&apos;s services, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Description of Services</h2>
            <p className="text-muted-foreground mb-4">
              pTeachTech provides cohort-based educational programs in AI engineering, cloud computing, 
              and related technology fields. Our services include live instruction, recorded content, 
              mentorship, and community access.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground mb-4">
              To access certain features of our services, you must create an account. You are responsible 
              for maintaining the confidentiality of your account credentials and for all activities 
              that occur under your account.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Payment and Enrollment</h2>
            <p className="text-muted-foreground mb-4">
              Payment for programs is due as specified during the enrollment process. We accept various 
              payment methods including credit cards and bank transfers. Installment plans may be 
              available for eligible programs.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              All content provided through our services, including but not limited to videos, documents, 
              code samples, and other materials, is owned by pTeachTech or its licensors. You may not 
              reproduce, distribute, or create derivative works without our express written permission.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Code of Conduct</h2>
            <p className="text-muted-foreground mb-4">
              You agree to conduct yourself professionally and respectfully when interacting with 
              instructors, staff, and fellow learners. Harassment, discrimination, or disruptive 
              behavior will not be tolerated and may result in removal from the program.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              To the maximum extent permitted by law, pTeachTech shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages resulting from your use of 
              our services.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">8. Changes to Terms</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to modify these terms at any time. We will notify you of any 
              material changes by posting the new terms on this page and updating the &ldquo;Last updated&rdquo; date.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">9. Contact</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms of Service, please contact us at 
              legal@pteachtech.com.
            </p>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
