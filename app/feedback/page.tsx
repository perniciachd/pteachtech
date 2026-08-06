import { MarketingLayout } from '@/components/layout'
import { FeedbackForm } from '@/components/feedback/feedback-form'

/**
 * Generic feedback link — no session context, so the participant types the
 * training name themselves. Session QRs go to /f/<code> instead.
 */
export default function FeedbackPage() {
  return (
    <MarketingLayout>
      <FeedbackForm />
    </MarketingLayout>
  )
}
