import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendEmail, escapeHtml, isValidEmail } from '@/lib/email'

export const runtime = 'nodejs'

const WaitlistSchema = z.object({
  email: z.string().trim().toLowerCase().max(200),
  source: z.string().trim().max(100).optional(),
  cohort: z.string().trim().max(100).optional(),
  // Honeypot
  website: z.string().max(0).optional(),
})

const rateLimits = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 10
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

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Try again in a few minutes.' },
        { status: 429 }
      )
    }

    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const parsed = WaitlistSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Please use a valid email.' }, { status: 400 })
    }

    const { email, source, cohort, website } = parsed.data

    if (website && website.length > 0) {
      return NextResponse.json({ success: true })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please use a valid email.' }, { status: 400 })
    }

    const safeEmail = escapeHtml(email)
    const safeSource = escapeHtml(source ?? 'unknown')
    const safeCohort = cohort ? escapeHtml(cohort) : null

    // Notify internal team
    await sendEmail({
      to: 'manan@pteachtech.in',
      subject: `Waitlist signup — ${email}${cohort ? ` (${cohort})` : ''}`,
      html: `
        <h2 style="font-family:Manrope,system-ui,sans-serif;color:#1B2D6B">
          New waitlist signup
        </h2>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${safeCohort ? `<p><strong>Cohort of interest:</strong> ${safeCohort}</p>` : ''}
        <p><strong>Source:</strong> ${safeSource}</p>
      `,
      text: `New waitlist signup: ${email}${cohort ? ` · cohort: ${cohort}` : ''} · source: ${source ?? 'unknown'}`,
    })

    // Auto-reply
    await sendEmail({
      to: email,
      subject: 'You\'re on the pTeachTech waitlist',
      html: `
        <h2 style="font-family:Manrope,system-ui,sans-serif;color:#1B2D6B">
          You're on the waitlist.
        </h2>
        <p>We'll email you when seats open${safeCohort ? ` for the ${safeCohort} cohort` : ''}.</p>
        <p>Founding-cohort pricing applies to the first 20 seats — earliest on the waitlist gets first dibs.</p>
        <p style="margin-top:24px">— Manan<br/>Lead Trainer, pTeachTech</p>
        <p style="color:#4A4F5A;font-size:12px;margin-top:32px">
          pTeachTech · by Pernicia<br/>
          <a href="https://pteachtech.in">pteachtech.in</a>
        </p>
      `,
      text: `You're on the waitlist. We'll email you when seats open${cohort ? ` for the ${cohort} cohort` : ''}.\n\n— Manan\npteachtech.in`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[waitlist] Unhandled error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please email learn@pteachtech.in directly.' },
      { status: 500 }
    )
  }
}
