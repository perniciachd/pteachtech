import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendEmail, escapeHtml, isValidEmail } from '@/lib/email'

export const runtime = 'nodejs'

// Marketing attribution, sent by the client from localStorage. Entirely optional
// and entirely untrusted — it originates from URL params, so every field is
// length-capped and it is escaped before it reaches the notification email.
const TouchSchema = z
  .object({
    source: z.string().max(200).optional(),
    medium: z.string().max(200).optional(),
    campaign: z.string().max(200).optional(),
    content: z.string().max(200).optional(),
    term: z.string().max(200).optional(),
    referrer: z.string().max(200).optional(),
    landingPath: z.string().max(200).optional(),
    firstTouchAt: z.string().max(200).optional(),
  })
  .optional()

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().toLowerCase().max(200),
  message: z.string().trim().min(10).max(5000),
  // Honeypot field — should always be empty. Bots fill all fields.
  website: z.string().max(0).optional(),
  attribution: z
    .object({ first: TouchSchema, last: TouchSchema })
    .optional(),
})

type Touch = NonNullable<z.infer<typeof TouchSchema>>

/** Renders a touch as email HTML. Returns '' when there's nothing to show. */
function renderTouch(label: string, touch: Touch | undefined): string {
  if (!touch) return ''
  const rows: [string, string | undefined][] = [
    ['Source', touch.source],
    ['Medium', touch.medium],
    ['Campaign', touch.campaign],
    ['Post / content', touch.content],
    ['Term', touch.term],
    ['Landed on', touch.landingPath],
    ['Referrer', touch.referrer],
    ['Date', touch.firstTouchAt],
  ]
  const filled = rows.filter(([, v]) => v)
  if (filled.length === 0) return ''

  return `
    <p style="margin:16px 0 4px"><strong>${escapeHtml(label)}</strong></p>
    <table style="border-collapse:collapse;font-size:13px">
      ${filled
        .map(
          ([k, v]) =>
            `<tr><td style="padding:2px 12px 2px 0;color:#4A4F5A">${escapeHtml(k)}</td>
             <td style="padding:2px 0"><code>${escapeHtml(v as string)}</code></td></tr>`
        )
        .join('')}
    </table>`
}

function renderTouchText(label: string, touch: Touch | undefined): string {
  if (!touch) return ''
  const parts = [
    touch.source && `source=${touch.source}`,
    touch.medium && `medium=${touch.medium}`,
    touch.campaign && `campaign=${touch.campaign}`,
    touch.content && `content=${touch.content}`,
    touch.landingPath && `landed=${touch.landingPath}`,
    touch.referrer && `referrer=${touch.referrer}`,
    touch.firstTouchAt && `date=${touch.firstTouchAt}`,
  ].filter(Boolean)
  return parts.length ? `\n${label}: ${parts.join(' · ')}` : ''
}

// In-memory rate limit per process (good enough until Redis/Upstash is wired).
// Keyed by IP; resets when the serverless instance recycles.
const rateLimits = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 5 // requests
const WINDOW_MS = 10 * 60 * 1000 // 10 minutes

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

    const parsed = ContactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Please check your inputs and try again.' },
        { status: 400 }
      )
    }

    const { name, email, message, website, attribution } = parsed.data

    // Honeypot — silently succeed for bots.
    if (website && website.length > 0) {
      return NextResponse.json({ success: true })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please use a valid email.' }, { status: 400 })
    }

    // Notification to internal team
    const internalRecipients = [
      'abhir@pernicia.in', // cohort questions go here primarily
      'abhir@pernicia.in',   // enterprise / partnerships
    ]

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>')

    // First touch is the credit-worthy one; last touch is shown only when it
    // differs, so a straightforward single-visit lead stays easy to read.
    const first = attribution?.first
    const last = attribution?.last
    const lastDiffers =
      last &&
      (last.source !== first?.source ||
        last.campaign !== first?.campaign ||
        last.content !== first?.content)

    const attributionHtml =
      renderTouch('First touch (credited)', first) +
      (lastDiffers ? renderTouch('Most recent touch', last) : '')
    const attributionText =
      renderTouchText('First touch', first) +
      (lastDiffers ? renderTouchText('Most recent touch', last) : '')

    const internalResult = await sendEmail({
      to: internalRecipients,
      subject: `pTeachTech contact form — ${name}`,
      replyTo: email,
      html: `
        <h2 style="font-family:Manrope,system-ui,sans-serif;color:#1B2D6B">
          New contact form submission
        </h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><strong>Message:</strong></p>
        <div style="background:#FAF7F0;padding:12px;border-left:4px solid #F4C430">
          ${safeMessage}
        </div>
        ${
          attributionHtml
            ? `<div style="margin-top:24px;padding-top:16px;border-top:1px solid #E5E2DA">
                 <p style="margin:0;color:#1B2D6B;font-weight:600">Where this lead came from</p>
                 ${attributionHtml}
               </div>`
            : `<p style="color:#4A4F5A;font-size:12px;margin-top:24px">
                 No campaign attribution recorded (direct visit, or storage unavailable).
               </p>`
        }
        <p style="color:#4A4F5A;font-size:12px;margin-top:24px">
          Reply directly to this email to respond.
        </p>
      `,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}\n${attributionText || '\nNo campaign attribution recorded.'}`,
    })

    // Auto-reply to user
    await sendEmail({
      to: email,
      subject: 'We got your message · pTeachTech',
      html: `
        <h2 style="font-family:Manrope,system-ui,sans-serif;color:#1B2D6B">
          Thanks for reaching out, ${safeName}.
        </h2>
        <p>We've received your message and will reply within 24 hours on weekdays.</p>
        <p>If you wanted to talk live first, you can also grab a 15-minute slot here:
           <a href="https://pteachtech.in/contact">pteachtech.in/contact</a>
        </p>
        <p style="margin-top:24px">— Team pTeachTech</p>
        <p style="color:#4A4F5A;font-size:12px;margin-top:32px">
          pTeachTech · by Pernicia<br/>
          From notebooks to production.<br/>
          <a href="https://pteachtech.in">pteachtech.in</a>
        </p>
      `,
      text: `Thanks for reaching out, ${name}.\n\nWe've received your message and will reply within 24 hours on weekdays.\n\n— Team pTeachTech\npteachtech.in`,
    })

    if (!internalResult.ok && !('skipped' in internalResult)) {
      // eslint-disable-next-line no-console
      console.error('[contact] Email send failed', internalResult)
      // Still respond success to the user — we logged the failure server-side.
      // Better than exposing internal errors.
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[contact] Unhandled error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please email learn@pteachtech.in directly.' },
      { status: 500 }
    )
  }
}
