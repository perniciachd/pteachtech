/**
 * Resend email helper — uses native fetch instead of @resend SDK
 * to avoid an extra dependency. Resend's REST API is trivially simple.
 *
 * Required env:
 *   RESEND_API_KEY        — from https://resend.com/api-keys
 *   RESEND_FROM_EMAIL     — verified sender on resend.com (default: learn@pteachtech.in)
 *
 * Behavior when RESEND_API_KEY is not set:
 *   - Functions return { ok: false, skipped: true }
 *   - Logs to console (so dev environment still gives feedback)
 *   - Does NOT throw — calling code stays robust
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

type SendArgs = {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
  from?: string
}

type SendResult =
  | { ok: true; id: string }
  | { ok: false; skipped: true; reason: string }
  | { ok: false; error: string }

export async function sendEmail(args: SendArgs): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY
  const defaultFrom = process.env.RESEND_FROM_EMAIL ?? 'pTeachTech <learn@pteachtech.in>'

  if (!apiKey) {
    // eslint-disable-next-line no-console
    console.warn('[email] RESEND_API_KEY not set — skipping send. Args:', {
      to: args.to,
      subject: args.subject,
    })
    return { ok: false, skipped: true, reason: 'RESEND_API_KEY not configured' }
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: args.from ?? defaultFrom,
        to: Array.isArray(args.to) ? args.to : [args.to],
        subject: args.subject,
        html: args.html,
        ...(args.text ? { text: args.text } : {}),
        ...(args.replyTo ? { reply_to: args.replyTo } : {}),
      }),
    })

    if (!response.ok) {
      const errText = await response.text().catch(() => '')
      // eslint-disable-next-line no-console
      console.error('[email] Resend API error', response.status, errText)
      return { ok: false, error: `Resend returned ${response.status}: ${errText}` }
    }

    const data = (await response.json()) as { id?: string }
    return { ok: true, id: data.id ?? '' }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[email] Resend request failed', err)
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}

/** Minimal HTML escape for user-supplied content embedded in templates. */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/** Validate an email address with a conservative regex. */
export function isValidEmail(email: string): boolean {
  // RFC 5322-ish — good enough for form validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}
