import { Users, ArrowRight, Mail, Calendar } from 'lucide-react'
import Link from 'next/link'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Alumni',
  description:
    'pTeachTech alumni network — early days. First cohort completes August 2026. Honest outcomes will be published here as they happen, not before.',
  alternates: { canonical: 'https://pteachtech.in/alumni' },
}

const whatTheNetworkOffers = [
  {
    icon: Calendar,
    title: 'Permanent community access',
    body: 'Lifetime access to the pTeachTech Slack/Circle community — peer help, monthly AMAs, job-board, hiring leads from partners.',
  },
  {
    icon: Mail,
    title: '60-day post-cohort placement support',
    body: 'Mock interviews, resume reviews, portfolio polish, partner introductions (where applicable). Active for 60 days after your cohort ends.',
  },
  {
    icon: Users,
    title: 'Cross-cohort connections',
    body: 'Alumni from AI, AWS, and Combined cohorts share one community. The network compounds as cohorts ship.',
  },
]

export default function AlumniPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="secondary">
              Cohort 1 starts July 20, 2026 · Cohort 1 graduates Aug 29, 2026
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              No alumni yet.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              We launched mid-2026. First cohort completes August 2026. The alumni outcomes you
              read on this page going forward will be <em>real</em> — with names (where the
              alumnus consents), real LinkedIn links, real companies, real testimonials. No stock
              photos. No &ldquo;5,000+ engineers transformed.&rdquo; No fabricated stats.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Until then, here&apos;s what the alumni network actually offers.
            </p>
          </div>
        </div>
      </section>

      {/* What network offers */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
            {whatTheNetworkOffers.map((item) => (
              <Card key={item.title}>
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's coming */}
      <section className="bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance text-center">
              What we&apos;ll publish here
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty text-center">
              Over the next 6–12 months, this page fills with real outcomes.
            </p>

            <div className="mt-10 space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground">Named capstone showcases</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Each cohort graduate produces a deployed production system (RAG, reference
                    architecture, multi-cloud deployment). Top performers — with their consent —
                    get featured with photo, role, capstone repo link, and short writeup.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground">Honest outcome reports</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Once enough cohorts have run, we&apos;ll publish aggregate placement data:
                    how many graduates, how many placed within 60 days, into what companies,
                    median CTC delta. Real numbers, not vanity claims. If a cohort underperforms,
                    we&apos;ll publish that too.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground">Career trajectories</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Where alumni are 6 months, 1 year, 2 years later. Promoted to senior?
                    Switched companies? Built a side project? Started something themselves? The
                    network value compounds as alumni outcomes do.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Want to be a founding alumnus?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              The first 20 founding-cohort enrollees will literally be Cohort 1. Reserve a seat,
              ship a real capstone, and your name and outcomes might be the first ones featured
              on this page in September 2026.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/cohorts">
                  View cohorts
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/compare">Compare cohorts</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
