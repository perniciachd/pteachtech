import { MarketingLayout } from '@/components/layout'
import {
  HeroSection,
  CohortCardsSection,
  DeliveredForSection,
  LiveFeedbackSection,
  FourPillarsSection,
  InstructorsSection,
  WebinarCTASection,
} from '@/components/home'

// Revalidate so the public feedback wall stays fresh without per-request cost.
export const revalidate = 600

export default function HomePage() {
  return (
    <MarketingLayout showCohortBar={true}>
      <HeroSection />
      <CohortCardsSection />
      <DeliveredForSection />
      <LiveFeedbackSection />
      <FourPillarsSection />
      <InstructorsSection />
      <WebinarCTASection />
    </MarketingLayout>
  )
}
