import Link from 'next/link'
import { ArrowRight, Brain, Cloud, Rocket, Calendar, Users } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cohorts, type Cohort } from '@/lib/data/cohorts'

const iconMap = {
  brain: Brain,
  cloud: Cloud,
  rocket: Rocket,
}

function CohortOverviewCard({ cohort }: { cohort: Cohort }) {
  const Icon = iconMap[cohort.icon]
  
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
      {/* Status indicator */}
      <div className="absolute right-4 top-4">
        <Badge variant={cohort.status === 'open' ? 'default' : 'secondary'}>
          {cohort.status === 'open' ? 'Accepting Applications' : 'Coming Soon'}
        </Badge>
      </div>
      
      <CardHeader className="pb-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
          <Icon className="h-7 w-7" />
        </div>
        <CardTitle className="text-2xl">{cohort.name}</CardTitle>
        <CardDescription className="text-base">{cohort.tagline}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
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
            <span>{cohort.availableSeats} seats available</span>
          </div>
        </div>
        
        {/* Highlights */}
        <ul className="space-y-2">
          {cohort.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
              <span className="text-muted-foreground">{highlight}</span>
            </li>
          ))}
        </ul>
        
        {/* Pricing preview */}
        <div className="rounded-lg bg-secondary/50 p-4">
          <p className="text-sm text-muted-foreground">Starting from</p>
          <p className="text-2xl font-bold text-foreground">
            {cohort.pricing[0].currency === 'INR' ? '₹' : '$'}
            {cohort.pricing[0].price.toLocaleString()}
            <span className="text-sm font-normal text-muted-foreground"> {cohort.pricing[0].currency}</span>
          </p>
          {cohort.pricing[0].installments && (
            <p className="text-xs text-muted-foreground">
              or {cohort.pricing[0].installments} installments of ₹{cohort.pricing[0].installmentAmount?.toLocaleString()}
            </p>
          )}
        </div>
        
        {/* CTA */}
        <div className="flex gap-3">
          <Button asChild className="flex-1 gap-2">
            <Link href={`/cohorts/${cohort.slug}`}>
              View Details
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          {cohort.status === 'open' && (
            <Button asChild variant="outline">
              <Link href={`/cohorts/${cohort.slug}#apply`}>Apply</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function CohortsPage() {
  const openCohorts = cohorts.filter(c => c.status === 'open')
  const upcomingCohorts = cohorts.filter(c => c.status === 'upcoming')
  
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Our Programs
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Intensive, cohort-based programs designed to take you from fundamentals to 
              production-ready skills. Each program combines expert instruction, hands-on 
              projects, and career support.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="/compare">Compare Programs</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/webinars">Watch Free Webinar</Link>
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
              <h2 className="text-2xl font-bold text-foreground">Now Accepting Applications</h2>
              <p className="mt-2 text-muted-foreground">Apply now to secure your spot in our current cohorts</p>
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
              <h2 className="text-2xl font-bold text-foreground">Coming Soon</h2>
              <p className="mt-2 text-muted-foreground">Get notified when applications open for upcoming cohorts</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {upcomingCohorts.map((cohort) => (
                <CohortOverviewCard key={cohort.id} cohort={cohort} />
              ))}
            </div>
          </div>
        </section>
      )}
    </MarketingLayout>
  )
}
