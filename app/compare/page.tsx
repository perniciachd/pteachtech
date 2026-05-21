import Link from 'next/link'
import { Check, X, ArrowRight } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cohorts } from '@/lib/data/cohorts'

export const metadata = {
  title: 'Compare Programs',
  description: 'Compare all pTeachTech programs side-by-side to find the right fit for your learning journey.',
}

const comparisonFeatures = [
  { name: 'Duration', key: 'duration' },
  { name: 'Live Sessions', key: 'liveSessions', all: true },
  { name: '1:1 Mentorship', key: 'mentorship', all: true },
  { name: 'Project Reviews', key: 'projectReviews', all: true },
  { name: 'Career Support', key: 'careerSupport', all: true },
  { name: 'Certificate', key: 'certificate', all: true },
  { name: 'Alumni Network', key: 'alumni', all: true },
  { name: 'Capstone Project', key: 'capstone', all: true },
]

const targetAudience = {
  'ai-engineering': ['Software engineers moving to AI', 'Data scientists scaling skills', 'ML researchers going production'],
  'aws-cloud': ['Developers learning cloud', 'IT professionals upskilling', 'DevOps engineers advancing'],
  'ai-deployment': ['ML engineers', 'Data scientists deploying models', 'AI engineers scaling systems'],
}

export default function ComparePage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Compare Programs
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Find the perfect program for your learning journey. Compare features, 
              pricing, and outcomes side-by-side.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table - Desktop */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left w-48"></th>
                  {cohorts.map((cohort) => (
                    <th key={cohort.id} className="p-4 text-center">
                      <div className="space-y-2">
                        <Badge variant={cohort.status === 'open' ? 'default' : 'secondary'}>
                          {cohort.status === 'open' ? 'Open' : 'Coming Soon'}
                        </Badge>
                        <h3 className="text-xl font-bold text-foreground">{cohort.name}</h3>
                        <p className="text-sm text-muted-foreground">{cohort.tagline}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Duration */}
                <tr className="border-t">
                  <td className="p-4 text-sm font-medium text-foreground">Duration</td>
                  {cohorts.map((cohort) => (
                    <td key={cohort.id} className="p-4 text-center text-sm text-muted-foreground">
                      {cohort.duration}
                    </td>
                  ))}
                </tr>
                {/* Start Date */}
                <tr className="border-t bg-secondary/20">
                  <td className="p-4 text-sm font-medium text-foreground">Start Date</td>
                  {cohorts.map((cohort) => (
                    <td key={cohort.id} className="p-4 text-center text-sm text-muted-foreground">
                      {cohort.startDate}
                    </td>
                  ))}
                </tr>
                {/* Seats */}
                <tr className="border-t">
                  <td className="p-4 text-sm font-medium text-foreground">Available Seats</td>
                  {cohorts.map((cohort) => (
                    <td key={cohort.id} className="p-4 text-center text-sm text-muted-foreground">
                      {cohort.availableSeats} of {cohort.totalSeats}
                    </td>
                  ))}
                </tr>
                {/* Features */}
                {comparisonFeatures.filter(f => f.all).map((feature, index) => (
                  <tr key={feature.key} className={`border-t ${index % 2 === 1 ? 'bg-secondary/20' : ''}`}>
                    <td className="p-4 text-sm font-medium text-foreground">{feature.name}</td>
                    {cohorts.map((cohort) => (
                      <td key={cohort.id} className="p-4 text-center">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </td>
                    ))}
                  </tr>
                ))}
                {/* India Price */}
                <tr className="border-t bg-primary/5">
                  <td className="p-4 text-sm font-medium text-foreground">Price (India)</td>
                  {cohorts.map((cohort) => {
                    const pricing = cohort.pricing.find(p => p.region === 'India')
                    return (
                      <td key={cohort.id} className="p-4 text-center">
                        <span className="text-lg font-bold text-foreground">
                          ₹{pricing?.price.toLocaleString()}
                        </span>
                      </td>
                    )
                  })}
                </tr>
                {/* US/EU Price */}
                <tr className="border-t">
                  <td className="p-4 text-sm font-medium text-foreground">Price (US/EU)</td>
                  {cohorts.map((cohort) => {
                    const pricing = cohort.pricing.find(p => p.region === 'US/EU')
                    return (
                      <td key={cohort.id} className="p-4 text-center">
                        <span className="text-lg font-bold text-foreground">
                          ${pricing?.price.toLocaleString()}
                        </span>
                      </td>
                    )
                  })}
                </tr>
                {/* CTA */}
                <tr className="border-t">
                  <td className="p-4"></td>
                  {cohorts.map((cohort) => (
                    <td key={cohort.id} className="p-4 text-center">
                      <Button asChild className="gap-2">
                        <Link href={`/cohorts/${cohort.slug}`}>
                          View Details
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden grid gap-6">
            {cohorts.map((cohort) => (
              <Card key={cohort.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={cohort.status === 'open' ? 'default' : 'secondary'}>
                      {cohort.status === 'open' ? 'Open' : 'Coming Soon'}
                    </Badge>
                  </div>
                  <CardTitle>{cohort.name}</CardTitle>
                  <CardDescription>{cohort.tagline}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Duration</span>
                      <p className="font-medium text-foreground">{cohort.duration}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Start Date</span>
                      <p className="font-medium text-foreground">{cohort.startDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Seats Left</span>
                      <p className="font-medium text-foreground">{cohort.availableSeats}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price (India)</span>
                      <p className="font-medium text-foreground">
                        ₹{cohort.pricing.find(p => p.region === 'India')?.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Button asChild className="w-full gap-2">
                    <Link href={`/cohorts/${cohort.slug}`}>
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Which program is right for you?
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {cohorts.map((cohort) => (
              <Card key={cohort.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{cohort.name}</CardTitle>
                  <CardDescription>Best for:</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {targetAudience[cohort.id as keyof typeof targetAudience]?.map((audience, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        {audience}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
