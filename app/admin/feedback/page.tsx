'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { RefreshCw, Star, ArrowLeft, ThumbsUp, AlertTriangle, Quote, QrCode } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type Row = {
  id: string
  created_at: string
  training_name: string
  training_topic: string | null
  trainer: string | null
  organization: string | null
  location: string | null
  overall: number | null
  nps: number | null
  liked_most: string | null
  improve: string | null
  suggestions: string | null
  featured: boolean
  session: { code: string; training_name: string } | null
  [k: string]: unknown
}
type SessionOption = { code: string; trainingName: string; count: number }
type Summary = {
  count: number
  overall: number
  perQuestion: { key: string; label: string; avg: number }[]
  nps: number | null
  npsCount: number
  featured: number
  trainings: string[]
  sessions: SessionOption[]
}
type Resp = { rows: Row[]; summary: Summary; fetchedAt: string; error?: string }

const barColor = (v: number) => (v >= 4.5 ? 'bg-emerald-500' : v >= 4 ? 'bg-blue-500' : v >= 3 ? 'bg-amber-500' : 'bg-red-500')

const RATING_COLS = [
  { key: 'met_expectations', label: 'Met my expectations' },
  { key: 'relevance', label: 'Relevant to my role' },
  { key: 'content_quality', label: 'Content clear & organized' },
  { key: 'trainer_rating', label: 'Trainer knowledgeable' },
  { key: 'queries_answered', label: 'Questions answered well' },
  { key: 'overall', label: 'Overall rating' },
] as const

const nums = (rows: Row[], key: string) =>
  rows.map((r) => r[key]).filter((n): n is number => typeof n === 'number')
const mean = (v: number[]) => (v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0)

export default function FeedbackAdmin() {
  const [data, setData] = useState<Resp | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')

  const load = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/admin/feedback', { cache: 'no-store' })
      if (res.status === 401) { window.location.href = '/admin/login?redirect=/admin/feedback'; return }
      const j = (await res.json()) as Resp
      if (!res.ok) { setError(j.error || 'Failed to load'); return }
      setData(j)
    } catch { setError('Network error') } finally { setLoading(false) }
  }, [])
  useEffect(() => { load() }, [load])

  // Deep link from the sessions manager: /admin/feedback?session=<code>
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('session')
    if (code) setFilter(`session:${code}`)
  }, [])

  async function toggleFeature(id: string, featured: boolean) {
    setData((d) => (d ? { ...d, rows: d.rows.map((r) => (r.id === id ? { ...r, featured } : r)) } : d))
    await fetch('/api/admin/feedback', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, featured }),
    }).catch(() => {})
  }

  // Filter values: 'all', 'session:<code>' (one QR / one delivery),
  // or 'training:<name>' (every delivery of that training).
  const rows = useMemo(() => {
    const all = data?.rows ?? []
    if (filter === 'all') return all
    if (filter.startsWith('session:')) {
      const code = filter.slice('session:'.length)
      return all.filter((r) => r.session?.code === code)
    }
    if (filter.startsWith('training:')) {
      const name = filter.slice('training:'.length)
      return all.filter((r) => r.training_name === name)
    }
    return all
  }, [data, filter])

  // Recomputed from the filtered rows — the numbers always match the selection.
  const stats = useMemo(() => {
    const npsVals = nums(rows, 'nps')
    const promoters = npsVals.filter((n) => n >= 9).length
    const detractors = npsVals.filter((n) => n <= 6).length
    return {
      overall: Number(mean(nums(rows, 'overall')).toFixed(2)),
      perQuestion: RATING_COLS.map((c) => ({
        key: c.key,
        label: c.label,
        avg: Number(mean(nums(rows, c.key)).toFixed(2)),
      })),
      nps: npsVals.length ? Math.round(((promoters - detractors) / npsVals.length) * 100) : null,
      npsCount: npsVals.length,
    }
  }, [rows])

  const goodThings = rows.filter((r) => r.liked_most?.trim())
  const concerns = rows.filter((r) => r.improve?.trim() || r.suggestions?.trim())

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Admin
            </Link>
            <h1 className="mt-1 text-2xl font-bold text-foreground">Training feedback</h1>
          </div>
          <div className="flex items-center gap-2">
            {data && (data.summary.trainings.length > 0 || data.summary.sessions.length > 0) && (
              <select value={filter} onChange={(e) => setFilter(e.target.value)}
                className="max-w-[16rem] rounded-md border bg-background px-3 py-1.5 text-sm">
                <option value="all">All feedback</option>
                {data.summary.sessions.length > 0 && (
                  <optgroup label="Sessions (one QR)">
                    {data.summary.sessions.map((s) => (
                      <option key={s.code} value={`session:${s.code}`}>
                        {s.trainingName} · /f/{s.code} ({s.count})
                      </option>
                    ))}
                  </optgroup>
                )}
                {data.summary.trainings.length > 0 && (
                  <optgroup label="All deliveries of a training">
                    {data.summary.trainings.map((t) => (
                      <option key={t} value={`training:${t}`}>{t}</option>
                    ))}
                  </optgroup>
                )}
              </select>
            )}
            <Button variant="outline" size="sm" asChild className="gap-1">
              <Link href="/admin/feedback/sessions"><QrCode className="h-4 w-4" /> Sessions &amp; QR</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={load} className="gap-1">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </Button>
          </div>
        </div>

        {error && <p className="mt-6 rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
        {loading && !data && <p className="mt-8 text-muted-foreground">Loading…</p>}

        {data && (
          <>
            {/* KPIs */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Kpi label="Responses" value={String(rows.length)} />
              <Kpi label="Overall / 5" value={stats.overall ? stats.overall.toFixed(2) : '—'} />
              <Kpi label={`NPS (${stats.npsCount})`} value={stats.nps == null ? '—' : String(stats.nps)} />
              <Kpi label="Featured (public)" value={String(rows.filter((r) => r.featured).length)} />
            </div>

            {/* Per-question averages */}
            <Card className="mt-6">
              <CardHeader><CardTitle className="text-base">Ratings by question</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {stats.perQuestion.map((q) => (
                  <div key={q.key} className="flex items-center gap-3">
                    <span className="w-52 shrink-0 text-right text-sm text-muted-foreground">{q.label}</span>
                    <div className="h-3 flex-1 overflow-hidden rounded bg-muted">
                      <div className={`h-full ${barColor(q.avg)}`} style={{ width: `${(q.avg / 5) * 100}%` }} />
                    </div>
                    <span className="w-10 text-sm font-semibold">{q.avg || '—'}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Good things + Concerns */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-base"><ThumbsUp className="h-4 w-4 text-emerald-600" /> What they valued ({goodThings.length})</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {goodThings.length === 0 && <p className="text-sm text-muted-foreground">No comments yet.</p>}
                  {goodThings.map((r) => (
                    <div key={r.id} className="border-l-2 border-emerald-200 pl-3 text-sm">
                      <p className="text-foreground">“{r.liked_most}”</p>
                      <p className="mt-1 text-xs text-muted-foreground">{r.training_name}{r.location ? ` · ${r.location}` : ''}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-base"><AlertTriangle className="h-4 w-4 text-amber-600" /> Concerns &amp; suggestions ({concerns.length})</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {concerns.length === 0 && <p className="text-sm text-muted-foreground">No concerns raised.</p>}
                  {concerns.map((r) => (
                    <div key={r.id} className="border-l-2 border-amber-200 pl-3 text-sm">
                      {r.improve && <p className="text-foreground"><b>Improve:</b> {r.improve}</p>}
                      {r.suggestions && <p className="text-foreground"><b>Suggestion:</b> {r.suggestions}</p>}
                      <p className="mt-1 text-xs text-muted-foreground">{r.training_name}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* All responses + feature toggle */}
            <Card className="mt-6">
              <CardHeader><CardTitle className="text-base">All responses — feature for the public wall</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {rows.length === 0 && <p className="text-sm text-muted-foreground">No feedback yet.</p>}
                {rows.map((r) => (
                  <div key={r.id} className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-foreground">{r.training_name}</span>
                        {r.session?.code && (
                          <Badge variant="outline" className="font-mono text-[10px]">/f/{r.session.code}</Badge>
                        )}
                        {r.overall && (
                          <span className="inline-flex items-center gap-0.5 text-sm text-amber-600">
                            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> {r.overall}
                          </span>
                        )}
                        {r.featured && <Badge className="bg-emerald-600">On public wall</Badge>}
                      </div>
                      {r.liked_most && <p className="mt-1 flex gap-1 text-sm text-muted-foreground"><Quote className="h-3.5 w-3.5 shrink-0" /> {r.liked_most}</p>}
                      <p className="mt-1 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</p>
                    </div>
                    <Button size="sm" variant={r.featured ? 'secondary' : 'outline'} onClick={() => toggleFeature(r.id, !r.featured)} className="shrink-0">
                      {r.featured ? 'Unfeature' : 'Feature publicly'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card p-4 text-center">
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  )
}
