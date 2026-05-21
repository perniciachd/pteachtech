'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Shield } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { cohorts } from '@/lib/data/cohorts'

// Founding-cohort prices in paise (mirror of server-side FOUNDING_PRICING_PAISE).
// Kept here for display only — server is the authority on the actual charge.
const DISPLAY_PRICING_PAISE: Record<string, number> = {
  'ai-engineering': 30000 * 100,
  'aws-cloud': 22000 * 100,
  'ai-deployment': 15000 * 100,
}

declare global {
  interface Window {
    Razorpay: new (opts: RazorpayCheckoutOptions) => { open: () => void }
  }
}

interface RazorpayCheckoutOptions {
  key: string | undefined
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  prefill: { name: string; email: string; contact?: string }
  theme: { color: string }
  handler: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => void
  modal: { ondismiss: () => void }
  notes?: Record<string, string>
}

function ApplyPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialCohort = searchParams.get('cohort') ?? 'ai-engineering'

  const [cohortSlug, setCohortSlug] = useState(initialCohort)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('India')
  const [githubAssessmentUrl, setGithubAssessmentUrl] = useState('')
  const [whyThisCohort, setWhyThisCohort] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const selectedCohort = cohorts.find((c) => c.slug === cohortSlug)
  const amountPaise = DISPLAY_PRICING_PAISE[cohortSlug] ?? 0

  // Block ME/US/EU prospects from self-serve flow per locked policy
  const isIndia = country === 'India'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!selectedCohort) {
      setError('Please select a cohort.')
      return
    }

    if (!isIndia) {
      setError(
        'Self-serve payment is currently India-only. Use /contact to book a 15-minute call with our Instructor — we\'ll route you through the right flow for your region.'
      )
      return
    }

    setLoading(true)

    try {
      // 1. Create Razorpay order on the server
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cohortSlug,
          applicantName: name,
          applicantEmail: email,
          applicantPhone: phone,
          applicantCountry: country,
          githubAssessmentUrl,
          whyThisCohort,
          website, // honeypot
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Could not create the order. Please try again.')
        setLoading(false)
        return
      }

      // 2. Open Razorpay Checkout
      if (typeof window === 'undefined' || !window.Razorpay) {
        setError('Payment SDK not loaded. Please refresh and try again.')
        setLoading(false)
        return
      }

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'pTeachTech',
        description: `${data.cohortName} · founding cohort`,
        order_id: data.orderId,
        prefill: { name, email, contact: phone },
        theme: { color: '#1B2D6B' },
        notes: {
          application_id: data.applicationId,
          cohort_slug: cohortSlug,
        },
        handler: (response) => {
          // Payment succeeded client-side; webhook will fire server-side for confirmation
          router.push(
            `/apply/success?payment_id=${encodeURIComponent(response.razorpay_payment_id)}&application_id=${encodeURIComponent(data.applicationId)}&cohort=${encodeURIComponent(cohortSlug)}`
          )
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
          },
        },
      })

      rzp.open()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <MarketingLayout>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="secondary">
              Founding cohort · first 20 seats per batch
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Reserve your seat
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
              Full refund if you cancel before Day 3 · 50% refund through Day 9 · See <Link href="/refund" className="underline">refund policy</Link> for details.
            </p>
          </div>
        </div>
      </section>

      {/* Form + payment summary */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Application form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Application + payment</CardTitle>
                  <CardDescription>
                    All fields are required unless marked optional. Take 5 minutes — get it right rather than fast.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot — hidden from real users */}
                    <input
                      type="text"
                      name="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
                      aria-hidden="true"
                    />

                    {/* Cohort */}
                    <div className="space-y-2">
                      <Label htmlFor="cohort">Cohort</Label>
                      <select
                        id="cohort"
                        value={cohortSlug}
                        onChange={(e) => setCohortSlug(e.target.value)}
                        className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                        required
                      >
                        {cohorts.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name} · starts {c.startDate}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Name + email row */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full name</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="As on your government ID"
                          required
                          maxLength={120}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          maxLength={200}
                        />
                      </div>
                    </div>

                    {/* Phone + country */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone (WhatsApp preferred)</Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 XXXXXXXXXX"
                          required
                          maxLength={30}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <select
                          id="country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                          required
                        >
                          <option value="India">India</option>
                          <option value="Other">Other (use /contact for pricing)</option>
                        </select>
                      </div>
                    </div>

                    {!isIndia && (
                      <div className="rounded-lg border-l-4 border-accent bg-accent/10 p-4 text-sm">
                        <p className="font-medium">Self-serve payment is India-only right now.</p>
                        <p className="mt-1 text-muted-foreground">
                          For pricing in your currency and a routed flow, please{' '}
                          <Link href="/contact" className="text-primary hover:underline">
                            book a 15-minute call with our Instructor
                          </Link>
                          .
                        </p>
                      </div>
                    )}

                    {/* GitHub assessment URL */}
                    <div className="space-y-2">
                      <Label htmlFor="github">Pre-cohort assessment GitHub URL <span className="text-muted-foreground font-normal">(optional · can submit later)</span></Label>
                      <Input
                        id="github"
                        type="url"
                        value={githubAssessmentUrl}
                        onChange={(e) => setGithubAssessmentUrl(e.target.value)}
                        placeholder="https://github.com/yourname/pteachtech-application-yourname"
                        maxLength={300}
                      />
                      <p className="text-xs text-muted-foreground">
                        If you haven&apos;t completed the assessment yet, that&apos;s fine — submit your seat reservation and we&apos;ll follow up with the assessment link.
                      </p>
                    </div>

                    {/* Why this cohort */}
                    <div className="space-y-2">
                      <Label htmlFor="why">Why this cohort? <span className="text-muted-foreground font-normal">(min 20 chars)</span></Label>
                      <Textarea
                        id="why"
                        value={whyThisCohort}
                        onChange={(e) => setWhyThisCohort(e.target.value)}
                        rows={5}
                        placeholder="Where you are in your career · what you want to build · what would success look like in 6 weeks"
                        required
                        minLength={20}
                        maxLength={2000}
                      />
                    </div>

                    {error && (
                      <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive" role="alert">
                        {error}
                      </div>
                    )}

                    <Button type="submit" size="lg" className="w-full gap-2" disabled={loading || !isIndia}>
                      {loading ? 'Preparing checkout...' : (
                        <>
                          Pay ₹{(amountPaise / 100).toLocaleString('en-IN')} · Reserve seat
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      By submitting, you agree to our{' '}
                      <Link href="/terms" className="underline">Terms</Link>,{' '}
                      <Link href="/privacy" className="underline">Privacy Policy</Link>, and{' '}
                      <Link href="/refund" className="underline">Refund Policy</Link>.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar: order summary */}
            <div>
              <Card className="sticky top-32">
                <CardHeader>
                  <CardTitle className="text-lg">Order summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Cohort</p>
                    <p className="font-semibold text-foreground">{selectedCohort?.name ?? '—'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start date</p>
                    <p className="font-medium text-foreground">{selectedCohort?.startDate ?? '—'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Format</p>
                    <p className="text-sm">{selectedCohort?.duration ?? '—'}</p>
                  </div>

                  <hr />

                  <div>
                    <p className="text-sm text-muted-foreground">Founding-cohort pricing</p>
                    <p className="text-3xl font-bold text-foreground">
                      ₹{(amountPaise / 100).toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes · billed by Pernicia Pvt Ltd</p>
                  </div>

                  <hr />

                  <ul className="space-y-2 text-sm">
                    {[
                      'Live, instructor-led — no recordings sold as cohorts',
                      'Production-grade capstone',
                      '5–6 industry-connect sessions',
                      '60-day post-cohort placement support',
                      'Alumni network for life',
                    ].map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <hr />

                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <p>
                      Payments processed by Razorpay over secure 256-bit TLS. Your card details never touch our servers.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <MarketingLayout>
        <section className="py-24 text-center">
          <p className="text-muted-foreground">Loading application form...</p>
        </section>
      </MarketingLayout>
    }>
      <ApplyPageInner />
    </Suspense>
  )
}
