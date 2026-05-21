import Link from 'next/link'
import { ArrowRight, Brain, Cloud, Rocket, Calendar, Users, CheckCircle, FileCheck } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cohorts, type Cohort } from '@/lib/data/cohorts'

export const metadata = {
  title: 'Cohorts',
  description:
    'Three live cohorts: AI Engineering, AWS Cloud-DevSecOps, and AI Deployment on AWS+Azure. 2 hrs/day evenings IST. Founding-cohort pricing for the first 20 seats.',
  alternates: { canonical: 'https://pteachtech.in/cohorts' },
}

const iconMap = {
  brain: Brain,
  cloud: Cloud,
  rocket: Rocket,
}

function CohortOverviewCard({ cohort }: { cohort: Cohort }) {
  const Icon = iconMap[cohort.icon]
  const indiaTier = cohort.pricing.find((p) => p.region.startsWith('India'))
  const isOpen = cohort.status === 'open'

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col">
      {/* Status indicator */}
      <div className="absolute right-4 top-4">
        <Badge variant={isOpen ? 'default' : 'secondary'}>
          {isOpen ? 'Founding seats open' : 'Coming soon'}
        </Badge>
      </div>

      <CardHeader className="pb-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
          <Icon className="h-7 w-7" />
        </div>
        <CardTitle className="text-2xl">{cohort.name}</CardTitle>
        <CardDescription className="text-base">{cohort.tagline}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 space-y-6">
        <p className="text-muted-foreground leading-relaxed">
          {cohort.description}
        </p>

        {/* Quick info */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{cohort.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>
              {isOpen
                ? `${cohort.availableSeats}/${cohort.totalSeats} founding seats`
                : `Capped at ${cohort.totalSeats}`}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <ul className="space-y-2 flex-1">
          {cohort.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
              <span className="text-muted-foreground">{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Pricing preview — India only on the public site */}
        <div className="rounded-lg bg-secondary/50 p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">India pricing</p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            ₹{indiaTier?.price.toLocaleString()}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              {indiaTier?.currency}
            </span>
          </p>
          {indiaTier?.note && (
            <p className="mt-1 text-xs text-muted-foreground">{indiaTier.note}</p>
          )}
          <p className="mt-2 text-xs text-muted-foreground">
            Based outside India? <Link href="/contact" className="text-primary hover:underline">Talk to our Instructor</Link> for pricing.
          </p>
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          <Button asChild className="flex-1 gap-2">
            <Link href={`/cohorts/${cohort.slug}`}>
              View details
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          {isOpen && (
            <Button asChild variant="outline">
              <Link href={`/apply?cohort=${cohort.slug}`}>Reserve seat</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function CohortsPage() {
  const openCohorts = cohorts.filter((c) => c.status === 'open')
  const upcomingCohorts = cohorts.filter((c) => c.status === 'upcoming')

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Three cohorts. Pick your path.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Live, instructor-led programs at 2 hrs/day evening cadence (7–9 PM IST).
              Working-pro friendly. BFSI vertical depth. Founding-cohort pricing for the first 20 seats per batch.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Button asChild variant="outline">
                <Link href="/compare">Compare cohorts</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/contact">Talk to our Instructor (15 min)</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Open Cohorts */}
      {openCohorts.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">Founding seats open</h2>
              <p className="mt-2 text-muted-foreground">
                First 20 seats per cohort at founding pricing. After that, standard pricing applies for the batch.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {openCohorts.map((cohort) => (
                <CohortOverviewCard key={cohort.id} cohort={cohort} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Cohorts */}
      {upcomingCohorts.length > 0 && (
        <section className="bg-secondary/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">Coming next</h2>
              <p className="mt-2 text-muted-foreground">
                Join the waitlist for early access and founding-cohort pricing when seats open.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {upcomingCohorts.map((cohort) => (
                <CohortOverviewCard key={cohort.id} cohort={cohort} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How applications work */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance text-center">
              How applications work
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty text-center">
              We pre-screen because cohorts succeed when prerequisites are met. Three steps, &lt;48 hours from submit to decision.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">Pick a cohort</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Use <Link href="/compare" className="text-primary hover:underline">/compare</Link> if you&apos;re unsure which fits, or book a 15-min call with our Instructor.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">Pre-cohort assessment</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A 30-minute self-paced check (Python, SQL, Git, cloud, judgment).
                    Submitted as a single GitHub repo URL. We review within 48 hours.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">Pay + onboard</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    On acceptance, founding-cohort pricing is locked. Pay via Razorpay (INR) or Stripe (USD/CAD/EUR). Welcome pack arrives within 24 hours.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 rounded-2xl border bg-card p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-primary">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Not sure if you&apos;re ready?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We&apos;d rather redirect you to a foundations track than have you struggle in the cohort.
                If you don&apos;t pass the assessment, we send a free 12-week self-paced track and welcome you to retest.
              </p>
              <div className="mt-6 flex justify-center gap-3 flex-wrap">
                <Button asChild>
                  <Link href="/contact">Talk to our Instructor first</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/compare">Compare cohorts</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's included in every cohort */}
      <section className="bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              In every cohort
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Same standards whether you take AI, AWS, or the Combined cohort.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                title: 'Live, instructor-led',
                detail: 'No recordings sold as cohorts. Sessions are delivered, not replayed.',
              },
              {
                title: 'Production-grade capstone',
                detail: 'A deployed, observable system on your GitHub. Real URL recruiters can open.',
              },
              {
                title: '5–6 industry connects',
                detail: 'Senior practitioners from BFSI, fintech, and product cos — live Q&A per cohort.',
              },
              {
                title: 'BFSI compliance baked in',
                detail: 'RBI, SEBI, DPDP, GDPR threaded through every relevant module.',
              },
              {
                title: '60-day placement support',
                detail: 'Mock interviews, resume reviews, partner intros where applicable (India Y1).',
              },
              {
                title: 'Alumni network for life',
                detail: 'Permanent Slack/Circle community. Monthly AMAs once running.',
              },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
