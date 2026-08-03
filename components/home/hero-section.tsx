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
            New · Multi-Agent Copilot &amp; Enterprise AI Architecture
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Enterprise AI, built by <span className="text-primary">practitioners.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl leading-relaxed text-pretty">
            Private, hands-on programs that take your team from single Copilots to governed,
            multi-agent systems on Microsoft Copilot Studio &amp; Azure.
            <br className="hidden sm:block" />
            Delivered by 15+ year practitioners who ship this for US &amp; European enterprises.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2 text-base">
              <Link href="/cohorts/enterprise-copilot">
                View the program
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 text-base">
              <Link href="/contact">
                <Calendar className="h-4 w-4" />
                Book a scoping call
              </Link>
            </Button>
          </div>

          {/* Credibility row — factual claims about the offering, not fabricated outcomes */}
          <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">15+ yrs</span>
              <span className="text-sm text-muted-foreground">Practitioner-led delivery</span>
            </div>
            <div className="hidden h-12 w-px bg-border sm:block" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">10+</span>
              <span className="text-sm text-muted-foreground">Multi-agent capstones deployed</span>
            </div>
            <div className="hidden h-12 w-px bg-border sm:block" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">Global</span>
              <span className="text-sm text-muted-foreground">Enterprises served worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
