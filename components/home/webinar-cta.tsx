'use client'

import { useState } from 'react'
import { ArrowRight, Calendar, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function WebinarCTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setErrorMessage('')

    try {
      const res = await fetch('/api/webinar/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Could not register. Please try again or email learn@pteachtech.in.')
      }

      setSubmitted(true)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden bg-primary py-16 lg:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-primary-foreground">
              <Calendar className="h-4 w-4" />
              Free monthly webinar
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
              Not sure yet? Start with a free webinar.
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed text-pretty">
              One topic per month, presented live by our Instructor. No recording sold as a course —
              attend live or read the writeup. We&apos;ll email you when the next one is
              scheduled.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Topic-deep, not overview — production patterns explored properly',
                'Live Q&A with our Instructor',
                'Notes + curated reading list emailed after',
                'No spam — only the next webinar invite + 1 monthly update',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-primary-foreground/90">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
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
              <>
                <h3 className="text-xl font-semibold text-primary-foreground">
                  Get the next webinar invite
                </h3>
                <p className="mt-2 text-sm text-primary-foreground/70">
                  First topic: &ldquo;Build a Production RAG in 60 Minutes&rdquo; · launching June 2026
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="webinar-email" className="sr-only">
                      Email address
                    </label>
                    <Input
                      id="webinar-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent focus:ring-accent"
                    />
                  </div>
                  {errorMessage && (
                    <p className="text-sm text-accent" role="alert">
                      {errorMessage}
                    </p>
                  )}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      'Adding you...'
                    ) : (
                      <>
                        Get the next invite
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
                <p className="mt-4 text-center text-xs text-primary-foreground/60">
                  By registering, you agree to receive webinar invites + one monthly update.
                  Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
