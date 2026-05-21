import { MarketingLayout } from '@/components/layout'
import {
  HeroSection,
  CohortCardsSection,
  FourPillarsSection,
  InstructorsSection,
  WebinarCTASection,
} from '@/components/home'

export default function HomePage() {
  return (
    <MarketingLayout showCohortBar={true}>
      <HeroSection />
      <CohortCardsSection />
      <FourPillarsSection />
      <InstructorsSection />
      <WebinarCTASection />
    </MarketingLayout>
  )
}
