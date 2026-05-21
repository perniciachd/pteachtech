import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendEmail, escapeHtml, isValidEmail } from '@/lib/email'

export const runtime = 'nodejs'

const WebinarSchema = z.object({
  email: z.string().trim().toLowerCase().max(200),
  name: z.string().trim().max(120).optional(),
  // Honeypot
  website: z.string().max(0).optional(),
})

// Shared per-process rate limit (resets on instance recycle)
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

    const parsed = WebinarSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Please use a valid email.' }, { status: 400 })
    }

    const { email, name, website } = parsed.data

    // Honeypot — silently succeed for bots
    if (website && website.length > 0) {
      return NextResponse.json({ success: true })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please use a valid email.' }, { status: 400 })
    }

    const safeEmail = escapeHtml(email)
    const safeName = escapeHtml(name ?? 'there')

    // Notify internal team
    await sendEmail({
      to: 'manan@pteachtech.in',
      subject: `Webinar signup — ${email}`,
      html: `
        <h2 style="font-family:Manrope,system-ui,sans-serif;color:#1B2D6B">
          New webinar registration
        </h2>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${name ? `<p><strong>Name:</strong> ${safeName}</p>` : ''}
        <p style="color:#4A4F5A;font-size:12px;margin-top:24px">
          Source: pTeachTech webinar CTA · /api/webinar/register
        </p>
      `,
      text: `New webinar signup: ${email}${name ? ` (${name})` : ''}`,
    })

    // Auto-reply to subscriber
    await sendEmail({
      to: email,
      subject: 'You\'re on the webinar list · pTeachTech',
      html: `
        <h2 style="font-family:Manrope,system-ui,sans-serif;color:#1B2D6B">
          You're on the list, ${safeName}.
        </h2>
        <p>We'll email you when the next free webinar is scheduled.</p>
        <p>The first one — <em>Build a Production RAG in 60 Minutes</em> — is launching in June 2026. We'll send a calendar invite once we lock the date.</p>
        <p>If you'd rather skip the wait and just talk to Manan:
           <a href="https://pteachtech.in/contact">pteachtech.in/contact</a>
        </p>
        <p style="margin-top:24px">— Manan<br/>Lead Trainer, pTeachTech</p>
        <p style="color:#4A4F5A;font-size:12px;margin-top:32px">
          pTeachTech · by Pernicia<br/>
          From notebooks to production.<br/>
          <a href="https://pteachtech.in">pteachtech.in</a>
        </p>
      `,
      text: `You're on the list, ${name ?? 'there'}.\n\nWe'll email you when the next free webinar is scheduled. First one: "Build a Production RAG in 60 Minutes" — launching June 2026.\n\n— Manan\npteachtech.in`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[webinar] Unhandled error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please email learn@pteachtech.in directly.' },
      { status: 500 }
    )
  }
}
