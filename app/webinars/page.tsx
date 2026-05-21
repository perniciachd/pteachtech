'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, Video, Calendar, MessageSquare, FileText } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const firstWebinar = {
  title: 'Build a Production RAG in 60 Minutes',
  scheduled: 'June 2026 · exact date TBD',
  description:
    'Live walkthrough of building a retrieval system that actually ships — ingest, chunking calibrated to the embedding window, hybrid retrieval (vector + BM25 + RRF), reranking, citations, latency budget. Most of the "RAG demos" you see online skip the parts that break in production. We do the opposite.',
  takeaways: [
    'A working RAG architecture you can defend in an interview',
    'The chunking-vs-truncation bug most teams ship without noticing',
    'Why hybrid retrieval beats vector-only by 20–40% recall',
    'Live Q&A — bring your real RAG questions',
  ],
}

const topicsUnderConsideration = [
  {
    title: 'BFSI AI Compliance — RBI / SEBI / DPDP for engineers',
    note: 'For engineers shipping AI in regulated environments',
  },
  {
    title: 'When to fine-tune (and when to absolutely not)',
    note: 'A cost-benefit framework anchored to real production cases',
  },
  {
    title: 'Eval-on-PR — making AI deploys regression-safe',
    note: 'Ragas, golden datasets, LLM-as-judge in CI/CD',
  },
  {
    title: 'AWS for AI workloads — Bedrock + Lambda vs ECS vs Modal',
    note: 'Architecture decisions with cost + latency tradeoffs',
  },
  {
    title: 'The agent-failure-mode playbook',
    note: 'Loops, hallucinated tools, cost spirals — and what to do about them',
  },
]

const formatExpectations = [
  {
    icon: Calendar,
    title: 'Monthly, not weekly',
    body: 'Topic-deep, not survey. Each webinar takes real prep so we run one a month, not one a week.',
  },
  {
    icon: Video,
    title: '60–90 minutes live',
    body: 'Demo + code + Q&A. Our Instructor delivers personally. No marketing intro reels.',
  },
  {
    icon: MessageSquare,
    title: 'Real Q&A — bring your work',
    body: 'Last 20 minutes are reserved for live questions. Bring your actual stack, stuck PR, or eval results.',
  },
  {
    icon: FileText,
    title: 'Notes + reading list emailed after',
    body: 'You don\'t need to take notes during the session. Curated writeup + further reading lands in your inbox within 48 hours.',
  },
]

export default function WebinarsPage() {
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
      const res = await fetch('/api/webinar/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
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
              Launching June 2026
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Free monthly webinars.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              One topic per month, presented live by our Instructor. No recordings sold as a course
              — attend live or read the writeup. Topic-deep, not survey.
            </p>
          </div>
        </div>
      </section>

      {/* First webinar feature */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              First webinar
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              The series kicks off with the topic most people ask us about.
            </p>

            <Card className="border-primary/30">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-accent text-accent-foreground">First in the series</Badge>
                  <span className="text-sm text-muted-foreground">{firstWebinar.scheduled}</span>
                </div>
                <CardTitle className="text-2xl">{firstWebinar.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {firstWebinar.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold text-foreground mb-3">
                  What you&apos;ll walk away with:
                </p>
                <ul className="space-y-2">
                  {firstWebinar.takeaways.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      {t}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Format expectations */}
      <section className="bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              What to expect
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Not a sales pitch with a slide deck. A working session.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {formatExpectations.map((item) => (
              <Card key={item.title}>
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
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

      {/* Topics under consideration */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance text-center">
              Topics under consideration
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty text-center">
              These are on our shortlist for upcoming months — not committed dates yet. Subscribers get to vote.
            </p>

            <div className="mt-10 space-y-4">
              {topicsUnderConsideration.map((topic, i) => (
                <Card key={i}>
                  <CardContent className="pt-6 flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold flex-shrink-0">
                      {String(i + 2).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{topic.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{topic.note}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
                Get the next webinar invite
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed text-pretty">
                Single email when the next webinar is scheduled. No newsletters, no upsell sequences. Unsubscribe anytime.
              </p>
              <p className="mt-3 text-sm text-primary-foreground/70">
                Already enrolled in a cohort? You&apos;re automatically on the list.
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
                    We&apos;ll email you when the next webinar is scheduled.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary-foreground">
                    Subscribe to webinar invites
                  </h3>
                  <div>
                    <label htmlFor="webinar-list-email" className="sr-only">
                      Email
                    </label>
                    <Input
                      id="webinar-list-email"
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
                        Subscribe
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
