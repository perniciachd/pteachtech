import Link from 'next/link'
import { ArrowRight, Rocket, ShieldCheck, Clock, IndianRupee } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'About',
  description:
    'pTeachTech is the cohort-based training division of Pernicia (India Pvt Ltd + Canada Corp). Production-grade AI and AWS Cloud training for working professionals.',
}

const pillars = [
  {
    icon: Rocket,
    title: 'Production-first',
    description:
      'One deployed, observable, defendable system on your GitHub beats six tutorial demos. Recruiters open URLs — they skim portfolios of slides.',
  },
  {
    icon: ShieldCheck,
    title: 'BFSI vertical depth',
    description:
      'RBI, SEBI, DPDP, and GDPR baked into every relevant module. Most cohorts skip regulated-industry context; for BFSI engineers, this is the unlock.',
  },
  {
    icon: Clock,
    title: 'Working-pro cadence',
    description:
      '2 hours per day · 5 evenings per week · 6 weeks. 7–9 PM IST covers India and the Middle East. Designed for engineers with day jobs.',
  },
  {
    icon: IndianRupee,
    title: 'Accessible pricing',
    description:
      '₹30,000–40,000 vs ₹1+ Lakh premium bootcamps. Made possible by low-CAC funnels and lean ops — passed to learners as lower price, not lower quality.',
  },
]

export default function AboutPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              From notebooks to production.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              pTeachTech is the cohort-based learner brand operated by{' '}
              <a
                href="https://pernicia.in"
                className="font-medium text-foreground hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pernicia
              </a>
              {' '}— a dual-entity engineering training and consulting business with offices in India and Canada.
            </p>
          </div>
        </div>
      </section>

      {/* Why we exist */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Why we exist
            </h2>
            <div className="mt-6 space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>
                Most AI courses stop at notebooks. Most AWS courses stop at certifications.
                In a real production system at a BFSI or fintech, neither is enough.
              </p>
              <p>
                pTeachTech is built around one question: what does an engineer actually
                need to deploy, defend, and operate AI and cloud systems in regulated
                environments? We chose what to be sharp on — and we&apos;ll tell you
                upfront what we don&apos;t do.
              </p>
              <p>
                Every cohort ends with a deployed, observable, citation-grounded system
                on your GitHub. Not slides. Not screenshots. A real URL recruiters can open.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Four pillars */}
      <section className="bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              How we&apos;re different
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Four positioning pillars · the same ones in every cohort, every workshop.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <Card key={pillar.title}>
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <pillar.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founders / Team */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              The team
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Small, deliberate, hands-on. No marketing-led growth team. The instructor
              answers your DMs himself.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-foreground">Abhir Jindal</h3>
                <p className="text-sm font-medium text-primary">Founder &amp; CEO, Pernicia</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Leads the company side — strategy, partnerships, enterprise
                  relationships, and the BFSI vertical we&apos;re building toward 2027.
                  For enterprise enquiries or partnerships, reach Abhir directly.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  <a
                    href="mailto:abhir@pernicia.in"
                    className="font-medium text-foreground hover:text-primary"
                  >
                    abhir@pernicia.in
                  </a>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-foreground">Manan Jindal</h3>
                <p className="text-sm font-medium text-primary">Lead Trainer, pTeachTech</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Designs and delivers all cohort curriculum — AI Engineering, AWS Cloud,
                  and AI Deployment. Focuses on the production patterns most courses skip:
                  RAG observability, MLOps governance, IAM hardening, BFSI compliance.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  <a
                    href="mailto:manan@pteachtech.in"
                    className="font-medium text-foreground hover:text-primary"
                  >
                    manan@pteachtech.in
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
            Each cohort also includes 5–6 industry-connect sessions with senior practitioners
            from BFSI, fintech, and product companies — confirmed per batch.
          </p>
        </div>
      </section>

      {/* Pernicia */}
      <section className="bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Why a dual-entity structure?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Pernicia operates from two registered entities: <strong>Pernicia Pvt Ltd</strong> (India)
              and <strong>Pernicia Corp</strong> (Canada). The dual-jurisdiction footprint lets us
              serve teams across India, the Middle East, and North America with native billing
              in INR, USD, CAD, and EUR — useful for global enterprises and captive centres
              needing flexible vendor structures.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
              Cohort programs (this site, pTeachTech) run under Pernicia. Enterprise training,
              consulting, and in-person workshops in Toronto, San Francisco, and Dubai run
              under the corporate Pernicia brand at{' '}
              <a
                href="https://pernicia.in"
                className="font-medium text-foreground hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                pernicia.in
              </a>
              .
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">
                  Talk to us
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
