'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { RefreshCw, LogOut, ExternalLink, AlertCircle, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type PaymentRow = {
  id: string
  status: 'created' | 'authorized' | 'captured' | 'refunded' | 'failed'
  amountInr: number
  currency: string
  method: string
  email: string | null
  contact: string | null
  applicantName: string | null
  applicantEmail: string | null
  applicantPhone: string | null
  applicantCountry: string | null
  githubAssessmentUrl: string | null
  cohortSlug: string | null
  cohortName: string | null
  applicationId: string | null
  createdAt: string
  errorDescription: string | null
  international: boolean
  refundStatus: string | null
}

type CohortSummary = {
  slug: string
  name: string
  totalSeats: number
  capturedCount: number
  capturedRevenueInr: number
}

type ApiResponse = {
  payments: PaymentRow[]
  summary: {
    total: number
    captured: number
    failed: number
    authorized: number
    refunded: number
    totalRevenueInr: number
    mtdRevenueInr: number
    cohorts: CohortSummary[]
  }
  fetchedAt: string
  error?: string
}

const formatInr = (n: number) => `₹${n.toLocaleString('en-IN')}`

export default function AdminDashboard() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterCohort, setFilterCohort] = useState<string>('all')
  const [search, setSearch] = useState('')

  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/payments', { cache: 'no-store' })
      const body = (await res.json()) as ApiResponse
      if (!res.ok) {
        setError(body.error || 'Failed to load')
      }
      setData(body)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  const filtered = useMemo(() => {
    if (!data?.payments) return []
    return data.payments.filter((p) => {
      if (filterStatus !== 'all' && p.status !== filterStatus) return false
      if (filterCohort !== 'all' && p.cohortSlug !== filterCohort) return false
      if (search) {
        const q = search.toLowerCase()
        const haystack = [p.id, p.applicantName, p.applicantEmail, p.email, p.contact, p.cohortName]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [data, filterStatus, filterCohort, search])

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-lg font-bold">p</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">pTeachTech Admin</h1>
              <p className="text-xs text-muted-foreground">
                {data?.fetchedAt && `Last refreshed: ${new Date(data.fetchedAt).toLocaleString('en-IN')}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchData} disabled={loading} className="gap-2">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {error && (
          <div className="rounded-lg border-l-4 border-destructive bg-destructive/10 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Error loading data</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        )}

        {/* KPI cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Captured payments</CardDescription>
              <CardTitle className="text-3xl">{data?.summary.captured ?? '—'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {data?.summary.failed ?? 0} failed · {data?.summary.refunded ?? 0} refunded
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total revenue</CardDescription>
              <CardTitle className="text-3xl">{data ? formatInr(data.summary.totalRevenueInr) : '—'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">All-time captured</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>This month</CardDescription>
              <CardTitle className="text-3xl">{data ? formatInr(data.summary.mtdRevenueInr) : '—'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{new Date().toLocaleString('en-IN', { month: 'long', year: 'numeric' })}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Razorpay dashboard</CardDescription>
              <CardTitle className="text-base">
                <a href="https://dashboard.razorpay.com/app/payments" target="_blank" rel="noopener noreferrer" className="text-primary inline-flex items-center gap-1 hover:underline">
                  Open full dashboard <ExternalLink className="h-3 w-3" />
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">For refunds, settlements, and detailed payment info</p>
            </CardContent>
          </Card>
        </div>

        {/* Cohort capacity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cohort capacity</CardTitle>
            <CardDescription>Captured payments vs founding-cohort capacity (20 seats each)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(data?.summary.cohorts ?? []).map((c) => {
                const pct = Math.min(100, Math.round((c.capturedCount / c.totalSeats) * 100))
                return (
                  <div key={c.slug}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{c.name}</span>
                      <span className="text-muted-foreground">
                        {c.capturedCount}/{c.totalSeats} seats · {formatInr(c.capturedRevenueInr)}
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 w-full rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Payments</CardTitle>
            <CardDescription>Live from Razorpay (last 100). Filter or search to narrow.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 mb-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="all">All statuses</option>
                <option value="captured">Captured</option>
                <option value="authorized">Authorized</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
                <option value="created">Created (no payment yet)</option>
              </select>
              <select
                value={filterCohort}
                onChange={(e) => setFilterCohort(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="all">All cohorts</option>
                {(data?.summary.cohorts ?? []).map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Search name, email, payment ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm flex-1 min-w-[200px]"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left px-3 py-2 font-medium text-foreground">When</th>
                    <th className="text-left px-3 py-2 font-medium text-foreground">Applicant</th>
                    <th className="text-left px-3 py-2 font-medium text-foreground">Cohort</th>
                    <th className="text-right px-3 py-2 font-medium text-foreground">Amount</th>
                    <th className="text-left px-3 py-2 font-medium text-foreground">Status</th>
                    <th className="text-left px-3 py-2 font-medium text-foreground">Method</th>
                    <th className="text-left px-3 py-2 font-medium text-foreground">Payment ID</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr><td colSpan={7} className="px-3 py-8 text-center text-muted-foreground">Loading...</td></tr>
                  )}
                  {!loading && filtered.length === 0 && (
                    <tr><td colSpan={7} className="px-3 py-8 text-center text-muted-foreground">
                      {data?.payments?.length === 0 ? 'No payments yet.' : 'No payments match the current filters.'}
                    </td></tr>
                  )}
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-t hover:bg-secondary/30">
                      <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">
                        {new Date(p.createdAt).toLocaleString('en-IN', {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })}
                      </td>
                      <td className="px-3 py-2">
                        <div className="font-medium text-foreground">{p.applicantName || '—'}</div>
                        <div className="text-xs text-muted-foreground">{p.applicantEmail || p.email || '—'}</div>
                        {p.githubAssessmentUrl && (
                          <a
                            href={p.githubAssessmentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 mt-1 text-xs text-primary hover:underline"
                          >
                            <Github className="h-3 w-3" />
                            Assessment repo
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </td>
                      <td className="px-3 py-2 text-foreground">{p.cohortName || p.cohortSlug || '—'}</td>
                      <td className="px-3 py-2 text-right font-medium text-foreground">{formatInr(p.amountInr)}</td>
                      <td className="px-3 py-2">
                        <StatusBadge status={p.status} />
                      </td>
                      <td className="px-3 py-2 text-muted-foreground capitalize">{p.method}</td>
                      <td className="px-3 py-2">
                        <a
                          href={`https://dashboard.razorpay.com/app/payments/${p.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-primary hover:underline inline-flex items-center gap-1"
                        >
                          {p.id} <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {data && (
              <p className="mt-3 text-xs text-muted-foreground">
                Showing {filtered.length} of {data.payments.length} payments. For more, view in <a href="https://dashboard.razorpay.com/app/payments" target="_blank" rel="noopener noreferrer" className="underline">Razorpay dashboard</a>.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Footer link back to public site */}
        <p className="text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:underline">Back to public site →</Link>
        </p>
      </main>
    </div>
  )
}

function StatusBadge({ status }: { status: PaymentRow['status'] }) {
  const config: Record<PaymentRow['status'], { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    captured: { label: 'Captured', variant: 'default' },
    authorized: { label: 'Authorized', variant: 'secondary' },
    created: { label: 'Pending', variant: 'outline' },
    failed: { label: 'Failed', variant: 'destructive' },
    refunded: { label: 'Refunded', variant: 'secondary' },
  }
  const c = config[status]
  return <Badge variant={c.variant}>{c.label}</Badge>
}
