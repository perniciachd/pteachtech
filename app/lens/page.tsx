'use client'

import { useState } from 'react'
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Target,
  Map,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const howItWorks = [
  {
    icon: FileText,
    step: '01',
    title: 'Upload your resume',
    body: 'PDF or text paste. We parse it into structured fields — skills, experience, keywords.',
  },
  {
    icon: Target,
    step: '02',
    title: 'Paste up to 3 dream JDs',
    body: 'Job posts you actually want to apply to. We parse them too.',
  },
  {
    icon: Sparkles,
    step: '03',
    title: 'Get your ATS score in 60 seconds',
    body: 'A hybrid score (keyword overlap + LLM semantic match) per JD, plus a gap analysis. The first 3 scans are free.',
  },
  {
    icon: Map,
    step: '04',
    title: 'Upgrade to a personalized roadmap',
    body: '12-week learning plan tailored to your specific gaps. Curated free + paid resources. Cohort recommendation if there&apos;s a structural gap. ₹1,500–3,000.',
  },
]

const whyDifferent = [
  'Hybrid scoring: keyword overlap + Claude-based semantic match, not just keyword counting',
  'Roadmaps are LLM-generated then human-reviewed for premium tier — no template-spam',
  'Direct funnel into our cohorts when a structural gap is detected (with a discount code, not a sales pitch)',
  'No spam. No upsell emails. The score is the product; the roadmap is the upsell. You decide.',
]

export default function LensPage() {
  const [email, setEmail] = useState('')
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
          source: 'resume-lens',
          cohort: 'Resume Lens early access',
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
              Launching February 2027 · early access waitlist open
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Resume <span className="text-primary">Lens</span>
            </h1>
            <p className="mt-3 text-xl font-medium text-foreground">
              Free ATS check against the jobs you actually want.
            </p>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Most resume tools score against generic templates. Resume Lens scores your
              resume against your <em>dream JDs</em> — the actual roles you&apos;d apply to —
              and tells you exactly where the gap is. Then gives you a personalized
              12-week roadmap to close it.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              How it&apos;ll work
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Four steps. Sixty seconds for the scan. 24 hours for the roadmap.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {howItWorks.map((step) => (
              <Card key={step.step} className="relative">
                <CardContent className="pt-6">
                  <div className="absolute right-4 top-4 text-3xl font-bold text-primary/20">
                    {step.step}
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing summary */}
      <section className="bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Honest pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Most of what you need is free. The roadmap is the upsell — and it&apos;s priced for working professionals.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">Free</Badge>
                <CardTitle>ATS Resume Check</CardTitle>
                <CardDescription>3 free scans, then ₹500 for a 5-pack</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    Hybrid keyword + LLM semantic score (0–100)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    Top 5 matches + top 5 gaps with severity
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    PDF report + email summary
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-primary/30">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-accent text-accent-foreground">Most useful</Badge>
                <CardTitle>Personalized Roadmap</CardTitle>
                <CardDescription>₹1,500 basic · ₹3,000 premium with human review</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    12-week plan tailored to your specific gaps
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    Curated free + paid resources per week
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    Cohort recommendation when a structural gap is detected
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    Reassessment checkpoints at weeks 4, 8, 12
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">Coming later</Badge>
                <CardTitle>Application Assist</CardTitle>
                <CardDescription>~₹6K/month · launching Q3 2027</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    ATS-optimized application kits per role
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    20 prepared applications / month
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <em>You</em> apply (we don&apos;t auto-submit) — protects your candidacy
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why this exists */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Why this exists
            </h2>
            <div className="mt-6 space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>
                We built Resume Lens to invert how cohort marketing usually works.
                Instead of telling you to enrol then hoping it&apos;s the right fit,
                we let you assess the actual gap between your resume and your dream
                jobs — for free.
              </p>
              <p>
                If the gap turns out to be small, our roadmap (₹1,500) might be all
                you need. If it&apos;s structural — say, you don&apos;t have production
                RAG experience — we&apos;ll point you to the cohort that closes it,
                with a discount code, not a sales pitch.
              </p>
              <p>
                Free tools should be useful, not lead-magnet bait. We&apos;ll know
                this is working when most users don&apos;t convert to a cohort — because
                they didn&apos;t need to.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-foreground">What makes Lens different</h3>
              <ul className="mt-4 space-y-3">
                {whyDifferent.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
                Get early access
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed text-pretty">
                Resume Lens launches February 2027. Waitlist members get the first 100 free scans (1 month of free use) and a founding discount on the roadmap.
              </p>
              <p className="mt-4 text-sm text-primary-foreground/70">
                Already a cohort applicant or enrollee? You&apos;ll get Resume Lens included — no signup needed.
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
                    We&apos;ll email you at launch in February 2027.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary-foreground">
                    Join the Resume Lens waitlist
                  </h3>
                  <div>
                    <label htmlFor="lens-email" className="sr-only">
                      Email
                    </label>
                    <Input
                      id="lens-email"
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
                        Get early access
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-primary-foreground/60 text-center">
                    Single email when Resume Lens launches. No newsletters. Unsubscribe anytime.
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
