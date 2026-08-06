import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'
// Access is gated by middleware (/api/admin/* requires a valid admin session).

const RATING_COLS = [
  { key: 'met_expectations', label: 'Met my expectations' },
  { key: 'relevance', label: 'Relevant to my role' },
  { key: 'content_quality', label: 'Content clear & organized' },
  { key: 'trainer_rating', label: 'Trainer knowledgeable' },
  { key: 'queries_answered', label: 'Questions answered well' },
  { key: 'overall', label: 'Overall rating' },
] as const

function avg(nums: number[]) {
  const v = nums.filter((n) => typeof n === 'number')
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0
}

export async function GET() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('training_feedback')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  const rows = data ?? []

  const perQuestion = RATING_COLS.map((c) => ({
    key: c.key,
    label: c.label,
    avg: Number(avg(rows.map((r) => r[c.key]).filter((n): n is number => n != null)).toFixed(2)),
  }))

  const npsVals = rows.map((r) => r.nps).filter((n): n is number => n != null)
  const promoters = npsVals.filter((n) => n >= 9).length
  const detractors = npsVals.filter((n) => n <= 6).length
  const nps = npsVals.length ? Math.round(((promoters - detractors) / npsVals.length) * 100) : null

  const trainings = Array.from(new Set(rows.map((r) => r.training_name).filter(Boolean)))

  return NextResponse.json({
    rows,
    summary: {
      count: rows.length,
      overall: Number(avg(rows.map((r) => r.overall).filter((n): n is number => n != null)).toFixed(2)),
      perQuestion,
      nps,
      npsCount: npsVals.length,
      featured: rows.filter((r) => r.featured).length,
      trainings,
    },
    fetchedAt: new Date().toISOString(),
  })
}

const ToggleSchema = z.object({
  id: z.string().uuid(),
  featured: z.boolean(),
})

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const parsed = ToggleSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('training_feedback')
    .update({ featured: parsed.data.featured })
    .eq('id', parsed.data.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
