import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

const rating = z.coerce.number().int().min(1).max(5).optional()

const FeedbackSchema = z.object({
  trainingName: z.string().trim().min(1).max(160),
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

    const supabase = createAdminClient()
    const { error } = await supabase.from('training_feedback').insert({
      training_name: d.trainingName,
      training_topic: orNull(d.trainingTopic),
      trainer: orNull(d.trainer),
      organization: orNull(d.organization),
      location: orNull(d.location),
      training_date: orNull(d.trainingDate),
      met_expectations: d.metExpectations ?? null,
      relevance: d.relevance ?? null,
      content_quality: d.contentQuality ?? null,
      trainer_rating: d.trainerRating ?? null,
      queries_answered: d.queriesAnswered ?? null,
      overall: d.overall ?? null,
      nps: d.nps ?? null,
      liked_most: orNull(d.likedMost),
      improve: orNull(d.improve),
      suggestions: orNull(d.suggestions),
    })
    if (error) {
      // eslint-disable-next-line no-console
      console.error('[feedback] insert error:', error.message)
      return NextResponse.json({ error: 'Could not save your feedback. Please try again.' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[feedback] unhandled:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
