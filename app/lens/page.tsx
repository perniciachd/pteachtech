'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, Newspaper } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LensPage() {
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
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-8">
              <Newspaper className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Lens Newsletter
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Weekly insights on AI engineering, cloud architecture, and career development. 
              Curated by our instructors with real-world perspectives you won&apos;t find elsewhere.
            </p>
            
            <Card className="mt-12">
              <CardHeader>
                <CardTitle>Subscribe to Lens</CardTitle>
                <CardDescription>
                  Join 5,000+ engineers getting smarter about AI every week
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <CheckCircle className="h-5 w-5" />
                    <span>Check your inbox to confirm!</span>
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
                      Subscribe
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div className="rounded-lg bg-secondary/50 p-4">
                <div className="text-2xl font-bold text-foreground">5,000+</div>
                <div className="text-sm text-muted-foreground">Subscribers</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-4">
                <div className="text-2xl font-bold text-foreground">Weekly</div>
                <div className="text-sm text-muted-foreground">Every Tuesday</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-4">
                <div className="text-2xl font-bold text-foreground">Free</div>
                <div className="text-sm text-muted-foreground">Always</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
