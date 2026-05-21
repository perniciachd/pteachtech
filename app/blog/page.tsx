import { BookOpen, ArrowRight, Calendar } from 'lucide-react'
import Link from 'next/link'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Blog',
  description:
    'Engineering writeups from pTeachTech — production AI, AWS Cloud, BFSI compliance, eval, observability. Starts publishing June 2026.',
  alternates: { canonical: 'https://pteachtech.in/blog' },
}

const draftTopics = [
  {
    title: 'The chunking-vs-truncation bug most RAG teams ship without noticing',
    note: 'Why your chunks need to be calibrated to the embedding model\'s token window, not the LLM\'s context window. The silent failure mode.',
  },
  {
    title: 'When to fine-tune — and when to absolutely not',
    note: 'A cost-benefit framework. The 80% of cases where RAG + better prompts beat $50K of fine-tuning. The 20% where it doesn\'t.',
  },
  {
    title: 'Hybrid retrieval that beats vector-only — without LangChain',
    note: 'BM25 + vector + RRF in 200 lines of Python. The retrieval pattern Azure AI Search uses internally.',
  },
  {
    title: 'BFSI AI compliance: what RBI / SEBI / DPDP actually require',
    note: 'Stripping the legalese. What needs to be in your AI deployment architecture if you ship for an Indian bank.',
  },
  {
    title: 'Eval-on-PR — making AI deploys regression-safe',
    note: 'A GitHub Actions workflow that runs Ragas on your golden dataset, fails the PR if faithfulness drops &gt; 5%.',
  },
  {
    title: 'The agent failure-mode playbook',
    note: 'Loops, hallucinated tools, cost spirals — and the cheap guardrails that prevent them.',
  },
]

export default function BlogPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
              <BookOpen className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Blog
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Production engineering writeups from pTeachTech — RAG, agents, MLOps, AWS, BFSI
              compliance. The kind of detail you&apos;d find in an engineering post-mortem, not
              a marketing blog.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Starts publishing June 2026 — alongside our first webinar.
            </p>
          </div>
        </div>
      </section>

      {/* Topics in pipeline */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Topics in the pipeline</h2>
            <p className="mt-2 text-muted-foreground">
              Drafts in progress. Subscribers get the heads-up when each one lands.
            </p>

            <div className="mt-8 space-y-4">
              {draftTopics.map((topic, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold flex-shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">Draft</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Coming
                          </span>
                        </div>
                        <h3 className="font-semibold text-foreground">{topic.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: topic.note }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe via webinar list */}
      <section className="bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Get notified when posts go live
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              We use the same email list for webinars and new blog posts — one monthly email, not
              a daily newsletter. Subscribe via the webinars page.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/webinars">
                  Subscribe via webinars
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/cohorts">View cohorts</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
