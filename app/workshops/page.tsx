'use client'

import { useState } from 'react'
import {
  ArrowRight,
  CheckCircle,
  MapPin,
  Plane,
  Users,
  Calendar,
} from 'lucide-react'
import Link from 'next/link'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Note: page metadata is exported from a separate file when 'use client' is set;
// we set the title via <head> tags in MarketingLayout's parent layout instead.
// Keeping the page client-side because of the waitlist form state.

const cities = [
  {
    name: 'Toronto',
    timing: 'Nov 2026 (planning)',
    note: 'First confirmed venue · senior peer audience curated for the city',
  },
  {
    name: 'San Francisco',
    timing: 'Q1 2027',
    note: 'Targeted at Bay-area fintech and AI-platform engineers',
  },
  {
    name: 'Dubai',
    timing: 'Q2 2027',
    note: 'Middle East BFSI specialty · RBI/SEBI/DPDP context for global banks',
  },
]

const whoFor = [
  '5+ year engineers and tech leads wanting concentrated depth without the 6-week commitment',
  'Senior architects evaluating production AI/cloud decisions before recommending them',
  'BFSI engineers needing in-person peer discussion on regulated AI deployments',
  'Founders / CTOs adding AI capability and wanting a 3-day immersive primer',
]

const whoNotFor = [
  'Engineers new to production AI or AWS — start with our 6-week cohorts first',
  'Career-switchers with no prior backend or cloud experience',
  'Anyone hoping for a placement-anchored program — that\'s our Cohort 3, not this',
]

const formatTopics = [
  {
    icon: Plane,
    title: 'In-person, intensive',
    body: '3 full days, ~8 hours/day. Manan travels to deliver. No remote attendance — peer presence is part of the value.',
  },
  {
    icon: Users,
    title: 'Curated peer audience',
    body: '15–20 senior engineers per workshop. Same room. Same coffee breaks. Same questions about production reality.',
  },
  {
    icon: CheckCircle,
    title: 'Compressed production focus',
    body: 'Distilled curriculum from our 6-week cohorts — the production decisions, the eval setup, the BFSI compliance posture. Less hand-holding, more depth.',
  },
]

export default function WorkshopsPage() {
  const [email, setEmail] = useState('')
  const [city, setCity] = useState<string>('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'workshops',
          cohort: city || 'NA in-person workshops',
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Could not add you to the list. Try again or email learn@pteachtech.in.')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="secondary">
              Pernicia in-person workshops
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              3-day intensives for senior engineers.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Our in-person workshop series — Toronto, San Francisco, Dubai. Curated 15–20 senior engineers per room. Production AI or AWS depth, compressed into three days.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Workshops run under the{' '}
              <a
                href="https://pernicia.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary"
              >
                Pernicia
              </a>{' '}
              corporate brand · cohorts run under pTeachTech
            </p>
          </div>
        </div>
      </section>

      {/* Format */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              The format
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Not a webinar dressed as a workshop. Not a generic conference talk.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3 max-w-5xl mx-auto">
            {formatTopics.map((item) => (
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

      {/* Upcoming cities */}
      <section className="bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Cities in planning
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              We&apos;ll announce specific dates as venue and partner confirmations land. Join the waitlist for the city you&apos;d attend.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {cities.map((c) => (
              <Card key={c.name}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{c.name}</CardTitle>
                  </div>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4" />
                    {c.timing}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{c.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Who this is for
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {whoFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-muted-foreground">
                  Who this is <span className="text-foreground">NOT</span> for
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {whoNotFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-muted-foreground">
                  Take our <Link href="/cohorts" className="text-primary hover:underline">6-week cohorts</Link> instead — they&apos;re designed for engineers earlier in the production journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Waitlist + pricing routing */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
                Join the city waitlist
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed text-pretty">
                We announce dates first to the waitlist. Founding-event pricing applies to the first 15 attendees per city.
              </p>
              <p className="mt-4 text-sm text-primary-foreground/70">
                For pricing in your currency, book a 15-minute call with Manan via{' '}
                <Link href="/contact" className="underline">/contact</Link>.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
              {submitted ? (
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                    <CheckCircle className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-primary-foreground">
                    You&apos;re on the list.
                  </h3>
                  <p className="mt-2 text-primary-foreground/80">
                    We&apos;ll email you when {city || 'workshop'} dates are confirmed.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary-foreground">
                    Reserve your spot on the waitlist
                  </h3>
                  <div>
                    <label htmlFor="workshop-city" className="sr-only">
                      City of interest
                    </label>
                    <select
                      id="workshop-city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-12 rounded-md bg-white/10 border border-white/20 px-3 text-primary-foreground"
                    >
                      <option value="">Which city?</option>
                      <option value="Toronto" className="text-foreground">Toronto</option>
                      <option value="San Francisco" className="text-foreground">San Francisco</option>
                      <option value="Dubai" className="text-foreground">Dubai</option>
                      <option value="Any" className="text-foreground">Any of the above</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="workshop-email" className="sr-only">
                      Email
                    </label>
                    <Input
                      id="workshop-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-accent" role="alert">{error}</p>
                  )}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                    disabled={loading}
                  >
                    {loading ? 'Adding you...' : (
                      <>
                        Join the waitlist
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-primary-foreground/60 text-center">
                    We&apos;ll email you when the next event is dated. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
