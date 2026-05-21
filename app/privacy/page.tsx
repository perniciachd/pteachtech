import { MarketingLayout } from '@/components/layout'

export const metadata = {
  title: 'Privacy Policy',
  description: 'pTeachTech privacy policy - how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <MarketingLayout showCohortBar={false}>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect information you provide directly to us, including when you create an account, 
              enroll in a program, contact us, or participate in our community forums.
            </p>
            <p className="text-muted-foreground mb-4">
              This information may include: name, email address, phone number, payment information, 
              and any other information you choose to provide.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Communicate with you about programs, services, and events</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground mb-4">
              We do not share your personal information with third parties except as described 
              in this privacy policy. We may share information with service providers who perform 
              services on our behalf, such as payment processing and email delivery.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We take reasonable measures to help protect your personal information from loss, 
              theft, misuse, unauthorized access, disclosure, alteration, and destruction.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              You may access, update, or delete your account information at any time by logging 
              into your account. You may also contact us to request access to, correction of, 
              or deletion of personal information.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy, please contact us at 
              privacy@pteachtech.com or through our contact page.
            </p>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
