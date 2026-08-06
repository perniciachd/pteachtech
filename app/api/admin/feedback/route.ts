import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSql, DatabaseNotConfiguredError } from '@/lib/db'

export const runtime = 'nodejs'
// Access is gated by middleware (/api/admin/* requires a valid admin session).

/** Turn a thrown error into a response the dashboard can actually display. */
function errorResponse(err: unknown, fallback: string) {
  // eslint-disable-next-line no-console
  console.error('[admin/feedback]', err)
  if (err instanceof DatabaseNotConfiguredError) {
    return NextResponse.json({ error: err.message }, { status: 503 })
  }
  return NextResponse.json({ error: fallback }, { status: 500 })
}

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

/** A feedback row plus the joined session, if it came in through a QR. */
type FeedbackRow = Record<string, unknown> & {
  session: { code: string; training_name: string } | null
}

export async function GET() {
  try {
    const sql = getSql()
    const data = await sql`
      select
        f.*,
        s.code          as session_code,
        s.training_name as session_training_name
      from training_feedback f
      left join training_sessions s on s.id = f.session_id
      order by f.created_at desc
    `

    // Re-shape the join into the nested { session } the dashboard expects.
    const rows: FeedbackRow[] = data.map((r) => ({
      ...r,
      session: r.session_code
        ? { code: r.session_code as string, training_name: r.session_training_name as string }
        : null,
    }))

    const perQuestion = RATING_COLS.map((c) => ({
      key: c.key,
      label: c.label,
      avg: Number(avg(rows.map((r) => r[c.key]).filter((n): n is number => n != null)).toFixed(2)),
    }))

    const npsVals = rows.map((r) => r.nps).filter((n): n is number => n != null)
    const promoters = npsVals.filter((n) => n >= 9).length
    const detractors = npsVals.filter((n) => n <= 6).length
    const nps = npsVals.length ? Math.round(((promoters - detractors) / npsVals.length) * 100) : null

    const trainings = Array.from(new Set(rows.map((r) => r.training_name as string).filter(Boolean)))

    // Sessions that actually have responses — drives the dashboard filter.
    const sessionMap = new Map<string, { code: string; trainingName: string; count: number }>()
    for (const r of rows) {
      if (!r.session) continue
      const entry = sessionMap.get(r.session.code)
        ?? { code: r.session.code, trainingName: r.session.training_name, count: 0 }
      entry.count += 1
      sessionMap.set(r.session.code, entry)
    }
    const sessions = Array.from(sessionMap.values()).sort((a, b) => b.count - a.count)

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
        sessions,
      },
      fetchedAt: new Date().toISOString(),
    })
  } catch (err) {
    return errorResponse(err, 'Could not load feedback.')
  }
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
  try {
    const sql = getSql()
    await sql`
      update training_feedback
      set featured = ${parsed.data.featured}
      where id = ${parsed.data.id}
    `
    return NextResponse.json({ success: true })
  } catch (err) {
    return errorResponse(err, 'Could not update the response.')
  }
}
