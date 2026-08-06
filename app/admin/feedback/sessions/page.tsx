'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, RefreshCw, Plus, Copy, Check, ExternalLink, Download,
  QrCode, Star, Pencil, X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type Session = {
  id: string
  code: string
  created_at: string
  training_name: string
  training_topic: string | null
  trainer: string | null
  organization: string | null
  location: string | null
  training_date: string | null
  active: boolean
  notes: string | null
  url: string
  responseCount: number
  avgOverall: number | null
}

type Form = {
  trainingName: string
  trainingTopic: string
  trainer: string
  organization: string
  location: string
  trainingDate: string
  notes: string
}

const EMPTY: Form = {
  trainingName: '', trainingTopic: '', trainer: '', organization: '', location: '', trainingDate: '', notes: '',
}

const toForm = (s: Session): Form => ({
  trainingName: s.training_name,
  trainingTopic: s.training_topic ?? '',
  trainer: s.trainer ?? '',
  organization: s.organization ?? '',
  location: s.location ?? '',
  trainingDate: s.training_date ?? '',
  notes: s.notes ?? '',
})

function Fields({ value, onChange }: { value: Form; onChange: (f: Form) => void }) {
  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...value, [k]: e.target.value })
  return (
    <div className="space-y-4">
      <div>
        <Label>Training name <span className="text-primary">*</span></Label>
        <Input value={value.trainingName} onChange={set('trainingName')} className="mt-1.5"
          placeholder="e.g., Multi-Agent Copilot & Enterprise AI Architecture" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Topic / module</Label>
          <Input value={value.trainingTopic} onChange={set('trainingTopic')} className="mt-1.5"
            placeholder="e.g., Orchestration & routing" />
        </div>
        <div>
          <Label>Trainer</Label>
          <Input value={value.trainer} onChange={set('trainer')} className="mt-1.5" placeholder="e.g., Manan Jindal" />
        </div>
        <div>
          <Label>Organization</Label>
          <Input value={value.organization} onChange={set('organization')} className="mt-1.5" placeholder="e.g., Acme Corp" />
        </div>
        <div>
          <Label>Location</Label>
          <Input value={value.location} onChange={set('location')} className="mt-1.5" placeholder="e.g., Bengaluru / Online" />
        </div>
        <div>
          <Label>Training date</Label>
          <Input value={value.trainingDate} onChange={set('trainingDate')} className="mt-1.5" placeholder="e.g., 12 Aug 2026" />
        </div>
        <div>
          <Label>Internal notes (never shown to participants)</Label>
          <Textarea value={value.notes} onChange={set('notes')} className="mt-1.5" rows={1} />
        </div>
      </div>
    </div>
  )
}

export default function SessionsAdmin() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<Form>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Form>(EMPTY)

  const load = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/admin/sessions', { cache: 'no-store' })
      if (res.status === 401) { window.location.href = '/admin/login?redirect=/admin/feedback/sessions'; return }
      const j = await res.json()
      if (!res.ok) { setError(j.error || 'Failed to load'); return }
      setSessions(j.sessions ?? [])
    } catch { setError('Network error') } finally { setLoading(false) }
  }, [])
  useEffect(() => { load() }, [load])

  async function create() {
    if (!form.trainingName.trim()) { setError('Training name is required.'); return }
    setSaving(true); setError('')
    try {
      const res = await fetch('/api/admin/sessions', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      const j = await res.json()
      if (!res.ok) { setError(j.error || 'Could not create the session.'); return }
      setSessions((s) => [j.session, ...s])
      setForm(EMPTY); setCreating(false)
    } catch { setError('Network error') } finally { setSaving(false) }
  }

  async function patch(id: string, body: Record<string, unknown>) {
    const res = await fetch('/api/admin/sessions', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...body }),
    })
    const j = await res.json().catch(() => ({}))
    if (!res.ok) { setError(j.error || 'Could not save.'); return false }
    setSessions((list) => list.map((s) => (s.id === id ? { ...s, ...j.session } : s)))
    return true
  }

  async function saveEdit(id: string) {
    if (!editForm.trainingName.trim()) { setError('Training name is required.'); return }
    setSaving(true); setError('')
    const ok = await patch(id, editForm)
    setSaving(false)
    if (ok) setEditingId(null)
  }

  async function copy(url: string, code: string) {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(code)
      setTimeout(() => setCopied((c) => (c === code ? null : c)), 1800)
    } catch { setError('Could not copy — select the link manually.') }
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Link href="/admin/feedback" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Feedback
            </Link>
            <h1 className="mt-1 text-2xl font-bold text-foreground">Training sessions &amp; QR codes</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              One session per training. Print its QR — you can still fix the details afterwards.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => setCreating((c) => !c)} className="gap-1">
              <Plus className="h-4 w-4" /> New session
            </Button>
            <Button variant="outline" size="sm" onClick={load} className="gap-1">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </Button>
          </div>
        </div>

        {error && <p className="mt-6 rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}

        {creating && (
          <Card className="mt-6 border-primary/40">
            <CardHeader><CardTitle className="text-base">New training session</CardTitle></CardHeader>
            <CardContent>
              <Fields value={form} onChange={setForm} />
              <div className="mt-5 flex gap-2">
                <Button onClick={create} disabled={saving}>{saving ? 'Creating…' : 'Create & generate QR'}</Button>
                <Button variant="ghost" onClick={() => { setCreating(false); setForm(EMPTY) }}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {loading && sessions.length === 0 && <p className="mt-8 text-muted-foreground">Loading…</p>}
        {!loading && sessions.length === 0 && (
          <Card className="mt-6">
            <CardContent className="py-12 text-center">
              <QrCode className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-4 font-medium text-foreground">No sessions yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Create one for your next training and its QR is generated for you.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 space-y-4">
          {sessions.map((s) => {
            const meta = [s.trainer, s.organization, s.location, s.training_date].filter(Boolean).join(' · ')
            const isEditing = editingId === s.id
            return (
              <Card key={s.id} className={s.active ? '' : 'opacity-70'}>
                <CardContent className="flex flex-col gap-5 py-5 sm:flex-row">
                  {/* QR thumbnail — served by the admin-gated QR endpoint */}
                  <a href={`/f/${s.code}/qr`} target="_blank" rel="noreferrer"
                    className="shrink-0 self-start rounded-xl border bg-white p-2 transition-shadow hover:shadow-md"
                    title="Open the printable poster">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/api/admin/qr?code=${s.code}&size=150`} alt={`QR for ${s.training_name}`}
                      width={116} height={116} className="h-[116px] w-[116px]" />
                  </a>

                  <div className="min-w-0 flex-1">
                    {isEditing ? (
                      <>
                        <Fields value={editForm} onChange={setEditForm} />
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" onClick={() => saveEdit(s.id)} disabled={saving}>
                            {saving ? 'Saving…' : 'Save changes'}
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditingId(null)} className="gap-1">
                            <X className="h-4 w-4" /> Cancel
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-foreground">{s.training_name}</span>
                          <Badge variant="outline" className="font-mono text-xs">/f/{s.code}</Badge>
                          {s.active
                            ? <Badge className="bg-emerald-600">Collecting</Badge>
                            : <Badge variant="secondary">Closed</Badge>}
                        </div>
                        {s.training_topic && <p className="mt-1 text-sm text-muted-foreground">{s.training_topic}</p>}
                        {meta && <p className="mt-1 text-sm text-muted-foreground">{meta}</p>}

                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                          <span className="text-foreground">
                            <b>{s.responseCount}</b> response{s.responseCount === 1 ? '' : 's'}
                          </span>
                          {s.avgOverall != null && (
                            <span className="inline-flex items-center gap-1 text-amber-600">
                              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> {s.avgOverall} / 5
                            </span>
                          )}
                          <span className="truncate font-mono text-xs text-muted-foreground">{s.url}</span>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button size="sm" variant="outline" onClick={() => copy(s.url, s.code)} className="gap-1">
                            {copied === s.code ? <><Check className="h-4 w-4 text-emerald-600" /> Copied</> : <><Copy className="h-4 w-4" /> Copy link</>}
                          </Button>
                          <Button size="sm" variant="outline" asChild className="gap-1">
                            <a href={`/f/${s.code}/qr`} target="_blank" rel="noreferrer">
                              <QrCode className="h-4 w-4" /> Poster
                            </a>
                          </Button>
                          <Button size="sm" variant="outline" asChild className="gap-1">
                            <a href={`/api/admin/qr?code=${s.code}&format=png&size=1024`}>
                              <Download className="h-4 w-4" /> PNG
                            </a>
                          </Button>
                          <Button size="sm" variant="outline" asChild className="gap-1">
                            <a href={`/admin/feedback?session=${s.code}`}>
                              <ExternalLink className="h-4 w-4" /> Responses
                            </a>
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1"
                            onClick={() => { setEditingId(s.id); setEditForm(toForm(s)); setError('') }}>
                            <Pencil className="h-4 w-4" /> Edit
                          </Button>
                          <Button size="sm" variant={s.active ? 'ghost' : 'secondary'}
                            onClick={() => patch(s.id, { active: !s.active })}>
                            {s.active ? 'Close session' : 'Reopen'}
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
