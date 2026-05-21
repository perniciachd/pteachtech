import Link from 'next/link'
import { ArrowRight, Target, Heart, Lightbulb, Users } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'About',
  description: 'Learn about pTeachTech, our mission, and our commitment to transforming tech education.',
}

const values = [
  {
    icon: Target,
    title: 'Outcome-Driven',
    description: 'We measure success by your career outcomes, not just course completions.',
  },
  {
    icon: Heart,
    title: 'Community-First',
    description: 'Learning is better together. Our cohorts build lasting professional networks.',
  },
  {
    icon: Lightbulb,
    title: 'Real-World Focus',
    description: 'No toy examples. Everything you build here is production-ready.',
  },
  {
    icon: Users,
    title: 'Expert-Led',
    description: 'Learn from practitioners who ship real systems, not just academics.',
  },
]

const stats = [
  { value: '500+', label: 'Alumni Worldwide' },
  { value: '92%', label: 'Completion Rate' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '85%', label: 'Career Advancement' },
]

export default function AboutPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              About pTeachTech
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              We&apos;re on a mission to transform how people learn AI and cloud technologies. 
              No more passive video courses. Just hands-on, cohort-based learning that 
              actually prepares you for the real world.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                Our Mission
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                The tech industry is evolving faster than ever. AI, cloud, and modern 
                engineering practices are reshaping every company. But traditional 
                education can&apos;t keep up.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                We built pTeachTech to bridge this gap. Our programs are designed by 
                industry practitioners, focused on real-world skills, and delivered 
                through intensive cohort experiences that actually work.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Every curriculum is updated continuously. Every project mirrors real 
                production challenges. Every instructor has shipped systems at scale.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-primary">{stat.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Our Values
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pernicia */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              A Pernicia Brands Company
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              pTeachTech is a product of Pernicia Brands Private Limited, a company 
              dedicated to building innovative education and technology solutions. 
              We&apos;re committed to creating programs that make a real difference in 
              people&apos;s careers and lives.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
