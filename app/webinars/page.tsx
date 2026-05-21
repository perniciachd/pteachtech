'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, Video, Calendar, Clock, Users } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const upcomingWebinars = [
  {
    title: 'Introduction to AI Engineering',
    date: 'Every Saturday',
    time: '10:00 AM IST',
    description: 'An overview of what it takes to become a production AI engineer',
    type: 'recurring',
  },
  {
    title: 'RAG Systems Deep Dive',
    date: 'Coming Soon',
    time: 'TBA',
    description: 'Building production-ready retrieval augmented generation systems',
    type: 'upcoming',
  },
  {
    title: 'Cloud Architecture Fundamentals',
    date: 'Coming Soon',
    time: 'TBA',
    description: 'Understanding modern cloud infrastructure patterns',
    type: 'upcoming',
  },
]

export default function WebinarsPage() {
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
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-8">
              <Video className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Free Webinars
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Join our free weekly sessions to learn about AI engineering, cloud architecture, 
              and career development. Get a taste of our teaching style before committing to a program.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Upcoming Sessions</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingWebinars.map((webinar) => (
              <Card key={webinar.title}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={webinar.type === 'recurring' ? 'default' : 'secondary'}>
                      {webinar.type === 'recurring' ? 'Weekly' : 'Coming Soon'}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{webinar.title}</CardTitle>
                  <CardDescription>{webinar.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {webinar.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {webinar.time}
                    </div>
                  </div>
                  <Button className="w-full" disabled={webinar.type !== 'recurring'}>
                    {webinar.type === 'recurring' ? 'Register Now' : 'Notify Me'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration */}
      <section className="bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Register for Weekly Webinars</CardTitle>
                <CardDescription>
                  Get calendar invites and reminders for all our free sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center gap-2 py-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                    <span className="text-foreground font-medium">You&apos;re registered!</span>
                    <span className="text-sm text-muted-foreground">Check your inbox for details</span>
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
                      Register
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
