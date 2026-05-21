import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Brain, Cloud, Rocket, Calendar, Users, Clock, CheckCircle, ChevronDown } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { getCohortBySlug, cohorts, type Cohort } from '@/lib/data/cohorts'

const iconMap = {
  brain: Brain,
  cloud: Cloud,
  rocket: Rocket,
}

export function generateStaticParams() {
  return cohorts.map((cohort) => ({
    slug: cohort.slug,
  }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const cohort = getCohortBySlug(params.slug)
  if (!cohort) return { title: 'Program Not Found' }
  
  return {
    title: `${cohort.name} Program`,
    description: cohort.description,
  }
}

function CohortHero({ cohort }: { cohort: Cohort }) {
  const Icon = iconMap[cohort.icon]
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-secondary/50 to-background py-16 lg:py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1B2D6B05_1px,transparent_1px),linear-gradient(to_bottom,#1B2D6B05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <Badge variant={cohort.status === 'open' ? 'default' : 'secondary'} className="text-sm">
                {cohort.status === 'open' ? 'Now Accepting Applications' : 'Coming Soon'}
              </Badge>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              {cohort.name}
            </h1>
            <p className="mt-2 text-xl text-primary font-medium">
              {cohort.tagline}
            </p>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              {cohort.description}
            </p>
            
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground font-medium">{cohort.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground font-medium">Starts {cohort.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground font-medium">{cohort.availableSeats} of {cohort.totalSeats} seats left</span>
              </div>
            </div>
            
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="#apply">
                  Reserve a founding seat
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#curriculum">View curriculum</Link>
              </Button>
            </div>
          </div>
          
          {/* Quick highlights card */}
          <Card className="lg:ml-auto lg:max-w-md">
            <CardHeader>
              <CardTitle>What you&apos;ll learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {cohort.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function CurriculumSection({ cohort }: { cohort: Cohort }) {
  return (
    <section id="curriculum" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Curriculum
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            A structured {cohort.duration} journey from fundamentals to production-ready skills
          </p>
        </div>
        
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border lg:left-1/2 lg:-translate-x-1/2" />
            
            {cohort.curriculum.map((week, index) => (
              <div key={week.week} className={`relative mb-8 ${index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:ml-1/2'}`}>
                {/* Timeline dot */}
                <div className="absolute left-4 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background lg:left-1/2" />
                
                <Card className="ml-10 lg:ml-0">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Week {week.week}</Badge>
                    </div>
                    <CardTitle className="text-lg">{week.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {week.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PricingSection({ cohort }: { cohort: Cohort }) {
  const includedFeatures = [
    'Live, instructor-led (no recordings sold as cohorts)',
    'Production-grade capstone deployed to a public URL',
    'Industry-connect sessions with senior practitioners',
    '60-day post-cohort placement support (India)',
    'pTeachTech credential + alumni network access',
  ]

  return (
    <section id="pricing" className="scroll-mt-20 bg-secondary/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Accessible pricing for working professionals · Pernicia Pvt Ltd (INR) or Pernicia Corp (USD)
          </p>
        </div>

        <div className={`grid gap-6 ${cohort.pricing.length <= 3 ? 'sm:grid-cols-1 md:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
          {cohort.pricing.map((tier) => (
            <Card key={tier.region} className="relative">
              {tier.region.startsWith('India') && !tier.region.includes('Tier 2') && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-accent text-accent-foreground">Most accessible</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{tier.region}</CardTitle>
                <CardDescription>
                  {tier.note ?? 'Full cohort access'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-foreground">
                    {tier.currency === 'INR' ? '₹' : '$'}
                    {tier.price.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground ml-1">{tier.currency}</span>
                </div>
                {tier.installments && tier.installmentAmount && (
                  <p className="text-sm text-muted-foreground mb-4">
                    or {tier.installments} installments of{' '}
                    {tier.currency === 'INR' ? '₹' : '$'}
                    {tier.installmentAmount.toLocaleString()}
                  </p>
                )}
                <ul className="space-y-2 text-sm">
                  {includedFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          No placement guarantee — we connect, you interview. See FAQ for details.
        </p>
      </div>
    </section>
  )
}

function FAQSection({ cohort }: { cohort: Cohort }) {
  return (
    <section id="faq" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Frequently Asked Questions
          </h2>
        </div>
        
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {cohort.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

function ApplySection({ cohort }: { cohort: Cohort }) {
  return (
    <section id="apply" className="scroll-mt-20 bg-primary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
            Ready to apply?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 text-pretty">
            {cohort.status === 'open'
              ? `The ${cohort.name} cohort starts ${cohort.startDate}. Founding-cohort pricing locked for the first 20 seats. Begin with our 30-minute pre-cohort skill assessment — we respond within 48 hours.`
              : `The ${cohort.name} cohort opens ${cohort.startDate}. Join the waitlist or book a 15-minute discovery call to discuss fit.`
            }
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
              <Link href="/contact">
                {cohort.status === 'open' ? 'Start the application' : 'Join the waitlist'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/contact">Talk to Manan (15 min)</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default async function CohortDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const cohort = getCohortBySlug(params.slug)
  
  if (!cohort) {
    notFound()
  }
  
  return (
    <MarketingLayout showCohortBar={false}>
      <CohortHero cohort={cohort} />
      <CurriculumSection cohort={cohort} />
      <PricingSection cohort={cohort} />
      <FAQSection cohort={cohort} />
      <ApplySection cohort={cohort} />
    </MarketingLayout>
  )
}
