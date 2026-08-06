import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSql, DatabaseNotConfiguredError } from '@/lib/db'
import { generateUniqueCode, sessionUrl } from '@/lib/feedback/session'

export const runtime = 'nodejs'
// Access is gated by middleware (/api/admin/* requires a valid admin session).

/** Turn a thrown error into a response the dashboard can actually display. */
function errorResponse(err: unknown, fallback: string) {
  // eslint-disable-next-line no-console
  console.error('[admin/sessions]', err)
  if (err instanceof DatabaseNotConfiguredError) {
    return NextResponse.json({ error: err.message }, { status: 503 })
  }
  return NextResponse.json({ error: fallback }, { status: 500 })
}

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(''))
const orNull = (v?: string) => (v && v.trim().length > 0 ? v.trim() : null)

const CreateSchema = z.object({
  trainingName: z.string().trim().min(1).max(160),
  trainingTopic: optionalText(200),
  trainer: optionalText(120),
  organization: optionalText(160),
  location: optionalText(120),
  trainingDate: optionalText(60),
  notes: optionalText(2000),
})

const UpdateSchema = z.object({
  id: z.string().uuid(),
  trainingName: z.string().trim().min(1).max(160).optional(),
  trainingTopic: optionalText(200),
  trainer: optionalText(120),
  organization: optionalText(160),
  location: optionalText(120),
  trainingDate: optionalText(60),
  notes: optionalText(2000),
  active: z.boolean().optional(),
})

/** List sessions, newest first, each with its response count and average. */
export async function GET() {
  try {
    const sql = getSql()
    const rows = await sql`
      select
        s.*,
        count(f.id)::int      as response_count,
        avg(f.overall)::float as avg_overall
      from training_sessions s
      left join training_feedback f on f.session_id = s.id
      group by s.id
      order by s.created_at desc
    `

    const sessions = rows.map((s) => ({
      ...s,
      url: sessionUrl(s.code as string),
      responseCount: s.response_count as number,
      avgOverall: s.avg_overall == null ? null : Number((s.avg_overall as number).toFixed(2)),
    }))

    return NextResponse.json({ sessions, fetchedAt: new Date().toISOString() })
  } catch (err) {
    return errorResponse(err, 'Could not load sessions.')
  }
}

/** Create a session and allocate its short code. */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const parsed = CreateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please provide at least a training name.' }, { status: 400 })
  }
  const d = parsed.data

  try {
    const code = await generateUniqueCode()
    const sql = getSql()
    const rows = await sql`
      insert into training_sessions (
        code, training_name, training_topic, trainer, organization, location, training_date, notes
      ) values (
        ${code}, ${d.trainingName}, ${orNull(d.trainingTopic)}, ${orNull(d.trainer)},
        ${orNull(d.organization)}, ${orNull(d.location)}, ${orNull(d.trainingDate)}, ${orNull(d.notes)}
      )
      returning *
    `
    return NextResponse.json({
      session: { ...rows[0], url: sessionUrl(code), responseCount: 0, avgOverall: null },
    })
  } catch (err) {
    return errorResponse(err, 'Could not create the session.')
  }
}

/**
 * Edit a session — this is what makes a printed QR fixable: the code and the
 * poster URL never change, only the context behind them.
 *
 * Two shapes, matching how the UI calls it: an `active`-only toggle
 * (close / reopen), or a full edit of the context fields.
 */
export async function PATCH(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const parsed = UpdateSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  const d = parsed.data
  const isToggleOnly = d.active !== undefined && d.trainingName === undefined

  if (!isToggleOnly && !d.trainingName) {
    return NextResponse.json({ error: 'Training name is required.' }, { status: 400 })
  }

  try {
    const sql = getSql()
    const rows = isToggleOnly
      ? await sql`
          update training_sessions set active = ${d.active} where id = ${d.id} returning *
        `
      : await sql`
          update training_sessions set
            training_name  = ${d.trainingName},
            training_topic = ${orNull(d.trainingTopic)},
            trainer        = ${orNull(d.trainer)},
            organization   = ${orNull(d.organization)},
            location       = ${orNull(d.location)},
            training_date  = ${orNull(d.trainingDate)},
            notes          = ${orNull(d.notes)}
          where id = ${d.id}
          returning *
        `

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Session not found.' }, { status: 404 })
    }
    return NextResponse.json({ session: { ...rows[0], url: sessionUrl(rows[0].code as string) } })
  } catch (err) {
    return errorResponse(err, 'Could not save the session.')
  }
}
