'use client'

import { useState } from 'react'
import { Mail, MapPin, MessageSquare, Send, CheckCircle } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Drop us a line anytime',
    value: 'hello@pteachtech.com',
    href: 'mailto:hello@pteachtech.com',
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Available Mon-Fri, 9am-6pm IST',
    value: 'Start a conversation',
    href: '#',
  },
  {
    icon: MapPin,
    title: 'Office',
    description: 'Come say hello',
    value: 'Bangalore, India',
    href: '#',
  },
]

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    
    // TODO: Connect to API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setFormState('success')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Have questions about our programs? Want to discuss corporate training? 
              Or just want to say hi? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {contactMethods.map((method) => (
              <Card key={method.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <method.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{method.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{method.description}</p>
                  <a 
                    href={method.href} 
                    className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                  >
                    {method.value}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Calendar */}
      <section className="bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {formState === 'success' ? (
                  <div className="text-center py-8">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">Message sent!</h3>
                    <p className="mt-2 text-muted-foreground">
                      Thanks for reaching out. We&apos;ll get back to you soon.
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
                        placeholder="How can we help?"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full gap-2" disabled={formState === 'loading'}>
                      {formState === 'loading' ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Calendar Embed Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule a Call</CardTitle>
                <CardDescription>
                  Book a 15-minute call with our team to discuss your learning goals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-80 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50">
                  <div className="text-center">
                    <p className="text-muted-foreground">Cal.com embed will appear here</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Connect your Cal.com account to enable booking
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
