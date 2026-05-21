import Link from 'next/link'
import { ArrowRight, Brain, Cloud, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cohorts, type Cohort } from '@/lib/data/cohorts'

const iconMap = {
  brain: Brain,
  cloud: Cloud,
  rocket: Rocket,
}

interface CohortCardProps {
  cohort: Cohort
}

export function CohortCard({ cohort }: CohortCardProps) {
  const Icon = iconMap[cohort.icon]
  
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <Badge variant={cohort.status === 'open' ? 'default' : 'secondary'}>
            {cohort.status === 'open' ? 'Open' : 'Coming Soon'}
          </Badge>
        </div>
        <CardTitle className="text-xl">{cohort.name}</CardTitle>
        <CardDescription className="text-base">{cohort.tagline}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="mb-6 space-y-2">
          {cohort.highlights.slice(0, 3).map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
              {highlight}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-muted-foreground">Starts </span>
            <span className="font-medium text-foreground">{cohort.startDate}</span>
          </div>
          <Button asChild variant="ghost" className="gap-1 group-hover:bg-accent">
            <Link href={`/cohorts/${cohort.slug}`}>
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function CohortCardsSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Three cohorts. Pick your path.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            AI Engineering · AWS Cloud-DevSecOps · AI Deployment (Combined, placement-anchored). Live, instructor-led, six weeks each — except Combined, which is four.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cohorts.map((cohort) => (
            <CohortCard key={cohort.id} cohort={cohort} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/compare">
              Compare cohorts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
