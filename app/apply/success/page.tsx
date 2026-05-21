'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Mail, Slack, Calendar } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function ApplySuccessInner() {
  const searchParams = useSearchParams()
  const paymentId = searchParams.get('payment_id') ?? ''
  const applicationId = searchParams.get('application_id') ?? ''
  const cohort = searchParams.get('cohort') ?? ''

  return (
    <MarketingLayout>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Success header */}
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              You&apos;re in.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
              Your founding-cohort seat is reserved. A confirmation email is on its way — usually arrives within 2 minutes.
            </p>
          </div>

          {/* Reference numbers */}
          <Card className="mt-10">
            <CardContent className="pt-6 space-y-3">
              <h2 className="text-lg font-semibold text-foreground">Save these references</h2>
              {paymentId && (
                <div>
                  <p className="text-sm text-muted-foreground">Payment ID</p>
                  <p className="font-mono text-sm text-foreground break-all">{paymentId}</p>
                </div>
              )}
              {applicationId && (
                <div>
                  <p className="text-sm text-muted-foreground">Application ID</p>
                  <p className="font-mono text-sm text-foreground break-all">{applicationId}</p>
                </div>
              )}
              {cohort && (
                <div>
                  <p className="text-sm text-muted-foreground">Cohort</p>
                  <p className="text-foreground">{cohort}</p>
                </div>
              )}
              <p className="text-xs text-muted-foreground pt-2">
                Razorpay also sends a receipt PDF to your email. Keep one of these references handy if you ever need to contact us about your enrolment.
              </p>
            </CardContent>
          </Card>

          {/* Next steps */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">What happens next</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Within 2 minutes</h3>
                  <p className="text-sm text-muted-foreground">
                    Confirmation email lands in your inbox with payment receipt + next-step checklist.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                  <Slack className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Within 48 hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Welcome pack — Slack/Circle community invite, pre-work checklist, kickoff Saturday calendar invite.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Before Day 1</h3>
                  <p className="text-sm text-muted-foreground">
                    Saturday kickoff session: tooling check, capstone reveal, meet your cohort. Then live sessions begin Monday 7–9 PM IST.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pre-cohort assessment reminder */}
          <Card className="mt-12 border-accent/30">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-foreground">
                Haven&apos;t completed the pre-cohort assessment yet?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                If you didn&apos;t submit a GitHub repo URL during application, we&apos;ll email you a link to the
                30-minute self-paced assessment in the welcome pack. Complete it before Day 1 — passing
                is mandatory for cohort entry. Full refund if you don&apos;t pass.
              </p>
            </CardContent>
          </Card>

          {/* CTAs */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild>
              <Link href="/">Back to home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/cohorts">View other cohorts</Link>
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Question or change needed? Email{' '}
            <a href="mailto:learn@pteachtech.in" className="text-primary hover:underline">
              learn@pteachtech.in
            </a>
            {' '}— we respond within 24 hours.
          </p>
        </div>
      </section>
    </MarketingLayout>
  )
}

export default function ApplySuccessPage() {
  return (
    <Suspense fallback={
      <MarketingLayout>
        <section className="py-24 text-center">
          <p className="text-muted-foreground">Loading confirmation...</p>
        </section>
      </MarketingLayout>
    }>
      <ApplySuccessInner />
    </Suspense>
  )
}
