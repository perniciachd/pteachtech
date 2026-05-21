import { Header } from './header'
import { Footer } from './footer'
import { StickyCohortBar } from './sticky-cohort-bar'

interface MarketingLayoutProps {
  children: React.ReactNode
  showCohortBar?: boolean
}

export function MarketingLayout({ children, showCohortBar = true }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {showCohortBar && <StickyCohortBar />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
