'use client'

import { useState } from 'react'
import { Star, CheckCircle2, Send } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const RATINGS = [
  { key: 'metExpectations', label: 'The training met my expectations' },
  { key: 'relevance', label: 'Relevant to my role / work' },
  { key: 'contentQuality', label: 'Content was clear and well-organized' },
  { key: 'trainerRating', label: 'The trainer was knowledgeable and engaging' },
  { key: 'queriesAnswered', label: 'My questions were answered well' },
  { key: 'overall', label: 'Overall rating' },
] as const

type RatingKey = (typeof RATINGS)[number]['key']

function Stars({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          className="p-0.5 text-muted-foreground transition-colors hover:text-accent"
        >
          <Star className={`h-6 w-6 ${n <= value ? 'fill-accent text-accent' : ''}`} />
        </button>
      ))}
    </div>
  )
}

export default function FeedbackPage() {
  const [text, setText] = useState({
    trainingName: '', trainingTopic: '', trainer: '', organization: '', location: '',
    trainingDate: '', likedMost: '', improve: '', suggestions: '', website: '',
  })
  const [ratings, setRatings] = useState<Record<RatingKey, number>>({
    metExpectations: 0, relevance: 0, contentQuality: 0, trainerRating: 0, queriesAnswered: 0, overall: 0,
  })
  const [nps, setNps] = useState<number | null>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [err, setErr] = useState('')

  const set = (k: keyof typeof text) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setText((t) => ({ ...t, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    if (!text.trainingName.trim()) { setErr('Please enter the training name.'); return }
    if (!ratings.overall) { setErr('Please give an overall rating.'); return }
    setStatus('submitting')
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...text, ...ratings, nps: nps ?? undefined }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setErr(j.error || 'Could not submit. Please try again.')
        setStatus('error')
        return
      }
      setStatus('done')
    } catch {
      setErr('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <MarketingLayout>
        <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
          <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
          <h1 className="mt-6 text-3xl font-bold text-foreground">Thank you!</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your feedback has been recorded anonymously. It genuinely helps us improve every session.
          </p>
        </section>
      </MarketingLayout>
    )
  }

  return (
    <MarketingLayout>
      <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Training feedback</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Anonymous — we don&apos;t ask your name. Takes ~2 minutes. Your honest input shapes future sessions.
          </p>
        </div>

        <form onSubmit={submit} className="mt-10 space-y-6">
          {/* Honeypot */}
          <input
            type="text" tabIndex={-1} autoComplete="off" value={text.website}
            onChange={set('website')}
            className="absolute -left-[9999px] h-0 w-0" aria-hidden="true"
          />

          <Card>
            <CardHeader><CardTitle className="text-lg">About the training</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="trainingName">Training name <span className="text-primary">*</span></Label>
                <Input id="trainingName" value={text.trainingName} onChange={set('trainingName')}
                  placeholder="e.g., Multi-Agent Copilot & Enterprise AI Architecture" className="mt-1.5" required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="trainingTopic">Training topic / module</Label>
                  <Input id="trainingTopic" value={text.trainingTopic} onChange={set('trainingTopic')}
                    placeholder="e.g., Orchestration & routing" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="trainer">Trainer</Label>
                  <Input id="trainer" value={text.trainer} onChange={set('trainer')}
                    placeholder="e.g., Manan Jindal" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="organization">Organization (optional)</Label>
                  <Input id="organization" value={text.organization} onChange={set('organization')} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="location">Location (optional)</Label>
                  <Input id="location" value={text.location} onChange={set('location')} className="mt-1.5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Your ratings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {RATINGS.map((r) => (
                <div key={r.key} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-foreground">
                    {r.label}{r.key === 'overall' && <span className="text-primary"> *</span>}
                  </span>
                  <Stars value={ratings[r.key]} onChange={(v) => setRatings((p) => ({ ...p, [r.key]: v }))} />
                </div>
              ))}
              <div className="border-t pt-4">
                <p className="text-sm text-foreground">How likely are you to recommend this training? (0–10)</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {Array.from({ length: 11 }, (_, i) => i).map((n) => (
                    <button key={n} type="button" onClick={() => setNps(n)}
                      className={`h-9 w-9 rounded-md border text-sm font-medium transition-colors ${
                        nps === n ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-accent'
                      }`}>{n}</button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">In your words</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="likedMost">What did you like most?</Label>
                <Textarea id="likedMost" value={text.likedMost} onChange={set('likedMost')} className="mt-1.5" rows={3} />
              </div>
              <div>
                <Label htmlFor="improve">What could be improved?</Label>
                <Textarea id="improve" value={text.improve} onChange={set('improve')} className="mt-1.5" rows={3} />
              </div>
              <div>
                <Label htmlFor="suggestions">Any suggestions?</Label>
                <Textarea id="suggestions" value={text.suggestions} onChange={set('suggestions')} className="mt-1.5" rows={3} />
              </div>
            </CardContent>
          </Card>

          {err && <p className="text-sm font-medium text-destructive">{err}</p>}

          <Button type="submit" size="lg" className="w-full gap-2" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Submitting…' : <>Submit feedback <Send className="h-4 w-4" /></>}
          </Button>
          <p className="text-center text-xs text-muted-foreground">Anonymous · no name collected · ~2 minutes</p>
        </form>
      </section>
    </MarketingLayout>
  )
}
