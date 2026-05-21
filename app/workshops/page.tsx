'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, Wrench } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function WorkshopsPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // TODO: Connect to API
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubmitted(true)
  }

  return (
    <MarketingLayout>
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20 text-accent-foreground mb-8">
              <Wrench className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Workshops
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Intensive weekend workshops on focused topics. Deep dives into specific 
              skills without the full cohort commitment. Coming soon.
            </p>
            
            <Card className="mt-12">
              <CardHeader>
                <CardTitle>Get Notified</CardTitle>
                <CardDescription>
                  Be the first to know when we launch our workshop series
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <CheckCircle className="h-5 w-5" />
                    <span>You&apos;re on the list!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button type="submit" className="gap-2">
                      Notify Me
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
