import { Users, Linkedin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Alumni',
  description: 'Meet our global community of pTeachTech alumni making an impact in tech.',
}

// Placeholder alumni - will be replaced with real data
const featuredAlumni = [
  {
    name: 'Alumni Name',
    role: 'AI Engineer',
    company: 'Tech Company',
    cohort: 'AI Engineering - Cohort 1',
    testimonial: 'The program completely transformed my career. I went from a traditional developer to an AI engineer in just 12 weeks.',
    image: null,
    linkedin: '#',
  },
  {
    name: 'Alumni Name',
    role: 'Cloud Architect',
    company: 'Tech Company',
    cohort: 'AWS Cloud - Cohort 2',
    testimonial: 'The hands-on projects and mentorship were exactly what I needed to level up my cloud skills.',
    image: null,
    linkedin: '#',
  },
  {
    name: 'Alumni Name',
    role: 'MLOps Engineer',
    company: 'Tech Company',
    cohort: 'AI Deployment - Cohort 1',
    testimonial: 'Finally understood how to take models from notebooks to production. Game changer.',
    image: null,
    linkedin: '#',
  },
]

const stats = [
  { value: '500+', label: 'Total Alumni' },
  { value: '25+', label: 'Countries' },
  { value: '85%', label: 'Career Growth' },
  { value: '92%', label: 'Would Recommend' },
]

export default function AlumniPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-8">
              <Users className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Alumni Network
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Join a global community of ambitious engineers who&apos;ve transformed their careers 
              through pTeachTech programs. Our alumni network spans companies worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Alumni */}
      <section className="bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Featured Alumni</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredAlumni.map((alumni) => (
              <Card key={alumni.name}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={alumni.image || undefined} alt={alumni.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {alumni.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{alumni.name}</CardTitle>
                      <CardDescription>{alumni.role} at {alumni.company}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="mb-4">{alumni.cohort}</Badge>
                  <p className="text-sm text-muted-foreground italic">
                    &ldquo;{alumni.testimonial}&rdquo;
                  </p>
                  <Button asChild variant="ghost" size="sm" className="mt-4 gap-2">
                    <Link href={alumni.linkedin}>
                      <Linkedin className="h-4 w-4" />
                      Connect
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Ready to join the community?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start your journey with one of our cohort programs and become part of our growing alumni network.
            </p>
            <Button asChild size="lg" className="mt-8 gap-2">
              <Link href="/cohorts">
                Explore Programs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
