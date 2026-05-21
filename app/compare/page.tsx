import Link from 'next/link'
import { Check, X, ArrowRight, Minus } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cohorts } from '@/lib/data/cohorts'

export const metadata = {
  title: 'Compare cohorts · pTeachTech vs other bootcamps',
  description:
    'Honest comparison of pTeachTech with premium bootcamps (Bosscoder, Scaler) and self-paced platforms (Coursera, Udemy). For working professionals choosing an AI or AWS cohort.',
  alternates: { canonical: 'https://pteachtech.in/compare' },
}

const decisionMatrix = [
  {
    intent: 'A premium career-switcher bootcamp targeting MAANG roles, willing to pay ₹1+ L',
    suggestion: 'Premium bootcamps (Bosscoder, Scaler, Newton)',
    isUs: false,
  },
  {
    intent: 'Evening-paced upskilling alongside a full-time job, at accessible pricing',
    suggestion: 'pTeachTech',
    isUs: true,
  },
  {
    intent: 'Deep BFSI / fintech AI specialization with RBI / SEBI / DPDP awareness',
    suggestion: 'pTeachTech',
    isUs: true,
  },
  {
    intent: 'Self-paced video lectures with no live instructor',
    suggestion: 'Coursera, Udemy, DeepLearning.AI',
    isUs: false,
  },
  {
    intent: 'Fine-tuning, multimodal AI, or system design at scale',
    suggestion: 'Premium bootcamps or specialized courses (out of scope for us)',
    isUs: false,
  },
  {
    intent: 'A free ATS resume check before paying for anything',
    suggestion: 'pTeachTech Resume Lens (launching Feb 2027)',
    isUs: true,
  },
  {
    intent: 'A placement track with named partner introductions',
    suggestion: 'pTeachTech Cohort 3 (selection-gated)',
    isUs: true,
  },
]

const vsPremiumRows: { feature: string; us: string; them: string; usWins?: boolean; themWins?: boolean }[] = [
  { feature: 'Standard price', us: '₹30,000–40,000', them: '₹1,00,000–1,50,000', usWins: true },
  { feature: 'Format', us: 'Live cohorts · 2 hrs/day × 5 days × 6 weeks', them: 'Live cohorts · varies (often full-time pacing)' },
  { feature: 'Cadence fit for working pros', us: 'Yes (7–9 PM IST evenings)', them: 'Sometimes — verify before paying', usWins: true },
  { feature: 'Instructor model', us: 'Single lead trainer + 6 industry guests (continuity)', them: 'Team of named senior engineers (rotation)', themWins: true },
  { feature: 'Curriculum breadth', us: 'RAG · agents · eval · observability · deployment · governance', them: 'Adds fine-tuning · multimodal · system design at scale', themWins: true },
  { feature: 'Capstone', us: '1 deep production-grade system (50+ hours)', them: 'Often 4–6 shorter projects' },
  { feature: 'Vertical specialization', us: 'BFSI compliance (RBI / SEBI / DPDP) baked in', them: 'Generic', usWins: true },
  { feature: 'Placement support', us: 'Cohort 3 selection-gated → vetted partner intros', them: 'Resume building + mock interviews; "success portal"' },
  { feature: 'Placement track record', us: 'New — we publish actuals, not aspirations', them: 'Established players cite 1,000+ placements', themWins: true },
  { feature: 'Geographic delivery', us: 'India + Middle East + US/EU online + NA in-person', them: 'Primarily India' },
  { feature: 'Free entry product', us: 'Resume Lens — free ATS check (launching Feb 2027)', them: 'None' },
]

const vsSelfPacedRows: { feature: string; us: string; them: string; usWins?: boolean; themWins?: boolean }[] = [
  { feature: 'Price', us: '₹30,000–40,000 per cohort', them: 'Free – ₹15,000', themWins: true },
  { feature: 'Format', us: 'Live cohort', them: 'Pre-recorded' },
  { feature: 'Live instructor present', us: 'Yes', them: 'No', usWins: true },
  { feature: 'Accountability', us: 'Weekly labs · mid-cohort review · peer cohort', them: 'Self-driven only' },
  { feature: 'Capstone with deployment', us: 'Yes — graded by panel', them: 'Rarely; usually optional' },
  { feature: 'Completion rate (industry data)', us: '~75% in cohorts', them: '<10% in MOOCs', usWins: true },
  { feature: 'Placement support', us: 'Yes (Cohort 3 placement track)', them: 'No' },
  { feature: 'Industry connects', us: '5–6 live sessions per cohort', them: 'Not offered' },
  { feature: 'Time to outcome', us: '6 weeks fixed', them: 'Often years (uncompleted)' },
]

const dontDoYet = [
  'No 2,000+ placement track record. We launched mid-2026. Cohort 3 placement partner intros begin November 2026.',
  'No MAANG employees on staff. Our instructor is a senior AI/Cloud engineer with multi-year production experience. Industry guests rotate in.',
  'No fine-tuning, multimodal, or system-design-at-scale curriculum. Valuable skills, but out of scope for our production-first approach.',
  'No placement guarantee. No honest training program guarantees jobs. We do guarantee placement-partner introductions for Cohort 3 Tier 2 graduates.',
  'No brand recognition (yet). We\'re new. We trade the brand premium for accessible pricing and BFSI vertical depth.',
]

const promises = [
  'A deployed, observable, citation-grounded production AI system on your GitHub by Week 6. Real public URL.',
  'A live instructor who knows your name by Day 3. Sessions are not recorded-then-resold; they are delivered.',
  'A BFSI-aware curriculum with RBI / SEBI / DPDP / GDPR governance threaded through every relevant week.',
  'A placement ladder (Cohort 3 selection-gated) with named partners — not a vague "career support" line.',
  'A free entry point (Resume Lens) so you can assess your skill gaps before paying us a rupee.',
]

const compareFaqs = [
  {
    question: 'How can your cohort be so much cheaper than premium bootcamps? Is the quality lower?',
    answer:
      'Different segment, different cost structure. We don\'t spend ₹15K per lead on ads — Resume Lens (our free ATS check, launching Feb 2027) will be our top-of-funnel. We don\'t have a 20-person bench — we have one dedicated Instructor. Lower CAC + lean ops = lower price. Quality is set by the curriculum, not the price tag.',
  },
  {
    question: 'Why is your placement track record worse than Bosscoder or Scaler?',
    answer:
      'We launched in mid-2026. They started years earlier. We\'re not pretending to have data we don\'t. By Year 2 we\'ll publish actual named alumni outcomes from Cohort 1, 2, and 3 placements.',
  },
  {
    question: 'Why don\'t you teach fine-tuning?',
    answer:
      'Because most production AI work in 2026 doesn\'t need it. Foundation models + good RAG + strong evals + observability cover 80% of real work. We pick depth over breadth. If you specifically need fine-tuning, take this cohort first (you\'ll have stronger foundations) then specialize.',
  },
  {
    question: 'Why only one capstone vs six elsewhere?',
    answer:
      'One deployed production system that recruiters can open in a browser beats six tutorial-grade demos. We\'ve talked to enough hiring managers to know which they value more.',
  },
  {
    question: 'What if I want to attend pTeachTech but also need fine-tuning + multimodal eventually?',
    answer:
      'Take Cohort 1 (AI Engineering) now. Then take Cohort 3 (AI Deployment) for the placement track. By Year 2 we\'ll likely have a Cohort 4 (Advanced AI: fine-tuning + multimodal + system design at scale). Climb at your pace.',
  },
  {
    question: 'Should I take pTeachTech or wait for a premium bootcamp scholarship?',
    answer:
      'If you\'re employed and the ₹30–40K is fundable: take pTeachTech now. Time-to-outcome matters more than brand. If you\'re unemployed and a scholarship is realistic: that path could work too.',
  },
]

function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Choosing an AI bootcamp? Here&apos;s how we compare.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
            There are good AI programs in the market. We&apos;re not the right fit for everyone — and we&apos;ll tell you when we aren&apos;t. This page is our honest take on where pTeachTech wins, where we don&apos;t, and how to decide.
          </p>
        </div>
      </div>
    </section>
  )
}

function QuickMatrix() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Quick decision matrix
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            If you want X, look at Y. We&apos;d rather redirect you than mis-sell.
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-secondary/40">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold text-foreground">If you want…</th>
                    <th className="p-4 text-left text-sm font-semibold text-foreground">Look at</th>
                  </tr>
                </thead>
                <tbody>
                  {decisionMatrix.map((row, i) => (
                    <tr key={i} className={`border-t ${row.isUs ? 'bg-accent/10' : ''}`}>
                      <td className="p-4 text-sm text-muted-foreground">{row.intent}</td>
                      <td className="p-4 text-sm font-medium text-foreground">{row.suggestion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function VsTable({
  title,
  subtitle,
  themLabel,
  rows,
}: {
  title: string
  subtitle: string
  themLabel: string
  rows: typeof vsPremiumRows
}) {
  return (
    <section className="bg-secondary/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">{subtitle}</p>
        </div>

        <div className="mx-auto max-w-5xl overflow-x-auto">
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold text-foreground w-1/3">Dimension</th>
                    <th className="p-4 text-left text-sm font-semibold text-primary">pTeachTech</th>
                    <th className="p-4 text-left text-sm font-semibold text-muted-foreground">{themLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className="border-t align-top">
                      <td className="p-4 text-sm font-medium text-foreground">{row.feature}</td>
                      <td className={`p-4 text-sm ${row.usWins ? 'bg-accent/15 font-medium' : ''}`}>
                        {row.us}
                      </td>
                      <td className={`p-4 text-sm text-muted-foreground ${row.themWins ? 'bg-secondary/60' : ''}`}>
                        {row.them}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-muted-foreground">
          Highlighted cells indicate the differentiation we believe is real, not a marketing claim.
        </p>
      </div>
    </section>
  )
}

function HonestyBlock() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* What we don't do */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <X className="h-6 w-6 text-muted-foreground" />
                What we honestly don&apos;t do (yet)
              </CardTitle>
              <CardDescription>
                We believe in earning trust through honesty. Here&apos;s what we&apos;re not yet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {dontDoYet.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <Minus className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* What we promise */}
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Check className="h-6 w-6 text-primary" />
                What we actually promise
              </CardTitle>
              <CardDescription>
                Five commitments — measurable, not marketing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {promises.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
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

function DecisionFramework() {
  return (
    <section className="bg-primary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
            Decide in 30 seconds.
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 text-pretty">
            Three questions. Ask yourself honestly.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3 text-left">
            {[
              {
                num: '01',
                q: 'Am I currently employed?',
                yes: 'pTeachTech (evening cadence)',
                no: 'Either could work if you have ₹1+ L runway',
              },
              {
                num: '02',
                q: 'Do I work in (or want to work in) BFSI / fintech / regulated industries?',
                yes: 'Strongly pTeachTech (vertical depth)',
                no: 'Either could work',
              },
              {
                num: '03',
                q: 'Do I want one production-grade deployment, or six demo projects?',
                yes: 'Production-grade → pTeachTech',
                no: 'Breadth → premium bootcamp',
              },
            ].map((step) => (
              <div key={step.num} className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <p className="text-3xl font-bold text-accent">{step.num}</p>
                <p className="mt-3 font-medium text-primary-foreground">{step.q}</p>
                <div className="mt-4 space-y-2 text-sm text-primary-foreground/80">
                  <p>
                    <span className="font-semibold text-accent">Yes →</span> {step.yes}
                  </p>
                  <p>
                    <span className="font-semibold text-primary-foreground/60">No →</span> {step.no}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-base text-primary-foreground/80">
            Answered &ldquo;pTeachTech&rdquo; to 2 of 3? Start with a free ATS check or talk to our Instructor directly.
          </p>
        </div>
      </div>
    </section>
  )
}

function InternalCohortCompare() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Picking between our three cohorts
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            All three are taught by the same lead trainer. Pick the one matching your career direction.
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left w-40"></th>
                {cohorts.map((cohort) => (
                  <th key={cohort.id} className="p-4 text-center">
                    <div className="space-y-2">
                      <Badge variant={cohort.status === 'open' ? 'default' : 'secondary'}>
                        {cohort.status === 'open' ? 'Open · founding seats' : 'Upcoming'}
                      </Badge>
                      <h3 className="text-lg font-bold text-foreground">{cohort.name}</h3>
                      <p className="text-xs text-muted-foreground">{cohort.tagline}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-4 text-sm font-medium text-foreground">Duration</td>
                {cohorts.map((cohort) => (
                  <td key={cohort.id} className="p-4 text-center text-sm text-muted-foreground">
                    {cohort.duration}
                  </td>
                ))}
              </tr>
              <tr className="border-t bg-secondary/20">
                <td className="p-4 text-sm font-medium text-foreground">Start date</td>
                {cohorts.map((cohort) => (
                  <td key={cohort.id} className="p-4 text-center text-sm text-muted-foreground">
                    {cohort.startDate}
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4 text-sm font-medium text-foreground">India pricing</td>
                {cohorts.map((cohort) => {
                  const indiaTier = cohort.pricing.find((p) => p.region.startsWith('India'))
                  return (
                    <td key={cohort.id} className="p-4 text-center">
                      <span className="text-lg font-bold text-foreground">
                        ₹{indiaTier?.price.toLocaleString()}
                      </span>
                      {indiaTier?.note && (
                        <p className="mt-1 text-xs text-muted-foreground">{indiaTier.note}</p>
                      )}
                    </td>
                  )
                })}
              </tr>
              <tr className="border-t bg-secondary/20">
                <td className="p-4 text-sm font-medium text-foreground">Best for</td>
                {cohorts.map((cohort) => (
                  <td key={cohort.id} className="p-4 text-center text-xs text-muted-foreground">
                    <ul className="space-y-1 text-left max-w-[200px] mx-auto">
                      {cohort.prerequisites.slice(0, 3).map((p, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <Check className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4 text-sm font-medium text-foreground">Capstone</td>
                {cohorts.map((cohort) => (
                  <td key={cohort.id} className="p-4 text-center text-xs text-muted-foreground">
                    {cohort.outcomes[0]}
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4"></td>
                {cohorts.map((cohort) => (
                  <td key={cohort.id} className="p-4 text-center">
                    <Button asChild className="gap-2">
                      <Link href={`/cohorts/${cohort.slug}`}>
                        View details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden grid gap-6">
          {cohorts.map((cohort) => {
            const indiaTier = cohort.pricing.find((p) => p.region.startsWith('India'))
            return (
              <Card key={cohort.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={cohort.status === 'open' ? 'default' : 'secondary'}>
                      {cohort.status === 'open' ? 'Open · founding seats' : 'Upcoming'}
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
                      <span className="text-muted-foreground">Start</span>
                      <p className="font-medium text-foreground">{cohort.startDate}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">India pricing</span>
                      <p className="font-medium text-foreground">
                        ₹{indiaTier?.price.toLocaleString()}{indiaTier?.note ? ` · ${indiaTier.note}` : ''}
                      </p>
                    </div>
                  </div>
                  <Button asChild className="w-full gap-2">
                    <Link href={`/cohorts/${cohort.slug}`}>
                      View details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CompareFAQ() {
  return (
    <section className="bg-secondary/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance text-center mb-10">
            Comparison FAQ
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {compareFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
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

function FinalCTA() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Still deciding? Talk to our Instructor.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            15 minutes, no sales pressure. Bring your dream-job JD and we&apos;ll tell you honestly whether pTeachTech is the right next step — or what is.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                Talk to our Instructor (15 min)
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/cohorts">View all cohorts</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ComparePage() {
  // Schema.org FAQ markup for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: compareFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <MarketingLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <QuickMatrix />
      <VsTable
        title="pTeachTech vs premium bootcamps"
        subtitle="Different segment. Different price. Different commitment expectation. Here&apos;s where each wins."
        themLabel="Bosscoder, Scaler, Newton, etc."
        rows={vsPremiumRows}
      />
      <VsTable
        title="pTeachTech vs self-paced platforms"
        subtitle="If you&apos;ve started 3+ MOOCs and finished 0 — read this section."
        themLabel="Coursera, Udemy, YouTube"
        rows={vsSelfPacedRows}
      />
      <HonestyBlock />
      <DecisionFramework />
      <InternalCohortCompare />
      <CompareFAQ />
      <FinalCTA />
    </MarketingLayout>
  )
}
