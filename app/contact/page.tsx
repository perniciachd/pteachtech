'use client'

import { useState } from 'react'
import { Mail, MapPin, Calendar, Send, CheckCircle } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || 'pteachtech/15min'

const contactMethods = [
  {
    icon: Mail,
    title: 'For cohorts',
    description: 'Curriculum, applications, cohort questions',
    value: 'manan@pteachtech.in',
    href: 'mailto:manan@pteachtech.in',
  },
  {
    icon: Mail,
    title: 'For enterprise',
    description: 'Custom team training · partnerships · NA workshops',
    value: 'abhir@pernicia.in',
    href: 'mailto:abhir@pernicia.in',
  },
  {
    icon: MapPin,
    title: 'Offices',
    description: 'Dual-entity operational footprint',
    value: 'India · Canada',
    href: 'https://pernicia.in',
  },
]

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Something went wrong. Please try again or email us directly.')
      }

      setFormState('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      setFormState('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Talk to us
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Cohort questions go to Manan. Enterprise and partnership conversations go to Abhir.
              Reply within 24 hours on weekdays.
            </p>
          </div>
        </div>
      </section>

      {/* Contact methods */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {contactMethods.map((method) => (
              <Card key={method.title}>
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <method.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{method.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{method.description}</p>
                  <a
                    href={method.href}
                    className="mt-2 inline-block text-sm font-medium text-primary hover:underline break-all"
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {method.value}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cal.com booking + Contact form */}
      <section className="bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Cal.com booking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Talk to Manan (15 min)
                </CardTitle>
                <CardDescription>
                  Book a 15-minute discovery call. We&apos;ll discuss cohort fit, your background, and answer any questions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden border bg-background">
                  <iframe
                    src={`https://cal.com/${CAL_LINK}?embedType=inline&theme=light`}
                    width="100%"
                    height="600"
                    frameBorder="0"
                    title="Book a 15-minute call with Manan"
                    className="block w-full"
                  />
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Prefer to book directly?{' '}
                  <a
                    href={`https://cal.com/${CAL_LINK}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Open Cal.com in a new tab →
                  </a>
                </p>
              </CardContent>
            </Card>

            {/* Contact form */}
            <Card>
              <CardHeader>
                <CardTitle>Or send a message</CardTitle>
                <CardDescription>
                  We respond within 24 hours on weekdays. For enterprise / partnership topics, email{' '}
                  <a href="mailto:abhir@pernicia.in" className="font-medium text-foreground hover:text-primary">
                    abhir@pernicia.in
                  </a>{' '}
                  directly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {formState === 'success' ? (
                  <div className="text-center py-8">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">Message sent.</h3>
                    <p className="mt-2 text-muted-foreground">
                      You&apos;ll hear back within 24 hours on weekdays.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => setFormState('idle')}
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="What would you like to discuss?"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        required
                        minLength={10}
                      />
                    </div>
                    {formState === 'error' && (
                      <p className="text-sm text-destructive" role="alert">
                        {errorMessage}
                      </p>
                    )}
                    <Button type="submit" className="w-full gap-2" disabled={formState === 'loading'}>
                      {formState === 'loading' ? (
                        'Sending...'
                      ) : (
                        <>
                          Send message
                          <Send className="h-4 w-4" />
                        </>
                      )}
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
