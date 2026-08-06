import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSql } from '@/lib/db'
import { getSessionByCode } from '@/lib/feedback/session'

export const runtime = 'nodejs'

const rating = z.coerce.number().int().min(1).max(5).optional()

const FeedbackSchema = z.object({
  // Present when the participant arrived via a session QR (/f/<code>).
  sessionCode: z.string().trim().min(1).max(32).optional(),
  // Only used for the generic /feedback link; ignored when sessionCode is set.
  trainingName: z.string().trim().max(160).optional(),
  trainingTopic: z.string().trim().max(200).optional().or(z.literal('')),
  trainer: z.string().trim().max(120).optional().or(z.literal('')),
  organization: z.string().trim().max(160).optional().or(z.literal('')),
  location: z.string().trim().max(120).optional().or(z.literal('')),
  trainingDate: z.string().trim().max(60).optional().or(z.literal('')),
  metExpectations: rating,
  relevance: rating,
  contentQuality: rating,
  trainerRating: rating,
  queriesAnswered: rating,
  overall: rating,
  nps: z.coerce.number().int().min(0).max(10).optional(),
  likedMost: z.string().trim().max(5000).optional().or(z.literal('')),
  improve: z.string().trim().max(5000).optional().or(z.literal('')),
  suggestions: z.string().trim().max(5000).optional().or(z.literal('')),
  // Honeypot — bots fill it; humans never see it.
  website: z.string().max(0).optional(),
})

const rateLimits = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 8
const WINDOW_MS = 10 * 60 * 1000

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  )
}
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimits.get(ip)
  if (!entry || entry.reset < now) {
    rateLimits.set(ip, { count: 1, reset: now + WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count += 1
  return true
}

const orNull = (v?: string) => (v && v.trim().length > 0 ? v.trim() : null)

export async function POST(request: NextRequest) {
  try {
    if (!checkRateLimit(getClientIp(request))) {
      return NextResponse.json({ error: 'Too many submissions. Try again later.' }, { status: 429 })
    }
    const body = await request.json().catch(() => null)
    if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

    const parsed = FeedbackSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Please check your inputs and try again.' }, { status: 400 })
    }
    const d = parsed.data
    if (d.website && d.website.length > 0) {
      // Honeypot tripped — pretend success, store nothing.
      return NextResponse.json({ success: true })
    }

    // Session context is read from the DB, never trusted from the client — a
    // scanned QR can't be edited into a different training's numbers.
    let context: {
      session_id: string | null
      training_name: string
      training_topic: string | null
      trainer: string | null
      organization: string | null
      location: string | null
      training_date: string | null
    }

    if (d.sessionCode) {
      const session = await getSessionByCode(d.sessionCode)
      if (!session) {
        return NextResponse.json({ error: 'This feedback link is no longer valid.' }, { status: 404 })
      }
      if (!session.active) {
        return NextResponse.json({ error: 'This session is closed for feedback.' }, { status: 410 })
      }
      context = {
        session_id: session.id,
        training_name: session.training_name,
        training_topic: session.training_topic,
        trainer: session.trainer,
        organization: session.organization,
        location: session.location,
        training_date: session.training_date,
      }
    } else {
      if (!d.trainingName || !d.trainingName.trim()) {
        return NextResponse.json({ error: 'Please enter the training name.' }, { status: 400 })
      }
      context = {
        session_id: null,
        training_name: d.trainingName.trim(),
        training_topic: orNull(d.trainingTopic),
        trainer: orNull(d.trainer),
        organization: orNull(d.organization),
        location: orNull(d.location),
        training_date: orNull(d.trainingDate),
      }
    }

    const sql = getSql()
    await sql`
      insert into training_feedback (
        session_id, training_name, training_topic, trainer, organization, location, training_date,
        met_expectations, relevance, content_quality, trainer_rating, queries_answered, overall,
        nps, liked_most, improve, suggestions
      ) values (
        ${context.session_id}, ${context.training_name}, ${context.training_topic},
        ${context.trainer}, ${context.organization}, ${context.location}, ${context.training_date},
        ${d.metExpectations ?? null}, ${d.relevance ?? null}, ${d.contentQuality ?? null},
        ${d.trainerRating ?? null}, ${d.queriesAnswered ?? null}, ${d.overall ?? null},
        ${d.nps ?? null}, ${orNull(d.likedMost)}, ${orNull(d.improve)}, ${orNull(d.suggestions)}
      )
    `
    return NextResponse.json({ success: true })
  } catch (err) {
    // Participants see a retryable message; the cause goes to the server log.
    // eslint-disable-next-line no-console
    console.error('[feedback] save failed:', err)
    return NextResponse.json({ error: 'Could not save your feedback. Please try again.' }, { status: 500 })
  }
}
