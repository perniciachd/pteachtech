'use client'

import { useState } from 'react'
import { ArrowRight, Calendar, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function WebinarCTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setLoading(true)
    // TODO: Connect to API
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubmitted(true)
    setLoading(false)
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
              Free Webinar Series
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
              Not ready to commit? Start with a free webinar.
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed text-pretty">
              Join our weekly sessions where we cover real-world AI engineering topics, 
              answer questions, and give you a taste of what our programs offer.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Live Q&A with instructors',
                'Real project walkthroughs',
                'Career guidance sessions',
                'No commitment required',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-primary-foreground/90">
                  <CheckCircle className="h-5 w-5 text-accent" />
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
                  You&apos;re on the list!
                </h3>
                <p className="mt-2 text-primary-foreground/80">
                  We&apos;ll send you details about our next webinar.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-primary-foreground">
                  Register for the next webinar
                </h3>
                <p className="mt-2 text-sm text-primary-foreground/70">
                  Every Saturday at 10 AM IST / 11:30 PM EST
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
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      'Registering...'
                    ) : (
                      <>
                        Reserve Your Spot
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
                <p className="mt-4 text-center text-xs text-primary-foreground/60">
                  By registering, you agree to receive updates about our programs.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
