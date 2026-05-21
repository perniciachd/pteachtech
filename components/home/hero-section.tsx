import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-20 lg:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1B2D6B08_1px,transparent_1px),linear-gradient(to_bottom,#1B2D6B08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] bg-gradient-radial from-accent/20 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Cohort 1 starts July 20 · 20 founding seats open
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            From notebooks to <span className="text-primary">production.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed text-pretty">
            Cohort-based AI and AWS Cloud training for working professionals.
            Live, hands-on, production-grade.
            <br className="hidden sm:block" />
            India · Middle East · Toronto · SF · Dubai.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2 text-base">
              <Link href="/cohorts">
                View Cohorts
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 text-base">
              <Link href="/contact">
                <Calendar className="h-4 w-4" />
                Talk to Manan (15 min)
              </Link>
            </Button>
          </div>

          {/* Credibility row — factual claims about the offering, not fabricated outcomes */}
          <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">60 hrs</span>
              <span className="text-sm text-muted-foreground">Live with the instructor</span>
            </div>
            <div className="hidden h-12 w-px bg-border sm:block" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">1 deployed</span>
              <span className="text-sm text-muted-foreground">Production system as capstone</span>
            </div>
            <div className="hidden h-12 w-px bg-border sm:block" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">2 hrs/day</span>
              <span className="text-sm text-muted-foreground">Evening cadence, IST</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
