import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature } from '@/lib/payments/razorpay'
import { sendEmail, escapeHtml } from '@/lib/email'

export const runtime = 'nodejs'

/**
 * Razorpay webhook handler.
 *
 * Setup steps:
 *  1. Deploy this route to production
 *  2. Razorpay Dashboard → Settings → Webhooks → Add Webhook
 *     URL:    https://pteachtech.in/api/payments/webhook/razorpay
 *     Events: payment.captured, payment.failed, refund.created
 *     Secret: copy → paste into RAZORPAY_WEBHOOK_SECRET on Vercel
 *
 * Webhook payload reference:
 *   https://razorpay.com/docs/webhooks/payloads/
 */

type RazorpayWebhookEvent = {
  event: string
  payload: {
    payment?: {
      entity: {
        id: string
        order_id: string
        amount: number
        currency: string
        status: string
        email?: string
        contact?: string
        notes?: Record<string, string>
        method?: string
        captured_at?: number
        error_description?: string
      }
    }
    refund?: {
      entity: {
        id: string
        payment_id: string
        amount: number
        status: string
      }
    }
  }
  created_at: number
}

export async function POST(request: NextRequest) {
  let rawBody: string
  try {
    rawBody = await request.text()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const signature = request.headers.get('x-razorpay-signature') ?? ''

  if (!signature || !verifyWebhookSignature(rawBody, signature)) {
    // eslint-disable-next-line no-console
    console.warn('[razorpay-webhook] Invalid signature — rejecting')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event: RazorpayWebhookEvent
  try {
    event = JSON.parse(rawBody) as RazorpayWebhookEvent
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // eslint-disable-next-line no-console
  console.log(`[razorpay-webhook] event=${event.event}`)

  try {
    switch (event.event) {
      case 'payment.captured': {
        const payment = event.payload.payment?.entity
        if (!payment) break

        const notes = payment.notes ?? {}
        const applicantEmail = payment.email ?? notes.applicant_email ?? ''
        const applicantName = notes.applicant_name ?? 'there'
        const cohortName = notes.cohort_name ?? 'your cohort'
        const applicationId = notes.application_id ?? payment.order_id

        const amountInr = (payment.amount / 100).toLocaleString('en-IN')

        // Notify internal team
        await sendEmail({
          to: ['manan@pteachtech.in', 'abhir@pernicia.in'],
          subject: `💰 Payment captured · ${applicantName} · ${cohortName}`,
          html: `
            <h2 style="font-family:Manrope,system-ui,sans-serif;color:#1B2D6B">
              Payment captured
            </h2>
            <p><strong>Applicant:</strong> ${escapeHtml(applicantName)} &lt;${escapeHtml(applicantEmail)}&gt;</p>
            <p><strong>Cohort:</strong> ${escapeHtml(cohortName)}</p>
            <p><strong>Amount:</strong> ₹${amountInr}</p>
            <p><strong>Payment ID:</strong> ${payment.id}</p>
            <p><strong>Order ID:</strong> ${payment.order_id}</p>
            <p><strong>Application ID:</strong> ${escapeHtml(applicationId)}</p>
            <p><strong>Method:</strong> ${payment.method ?? '—'}</p>
            <p style="color:#4A4F5A;font-size:12px;margin-top:24px">
              Send welcome pack manually until /admin dashboard is built.
              Razorpay dashboard: <a href="https://dashboard.razorpay.com/app/payments/${payment.id}">View payment</a>
            </p>
          `,
          text: `Payment captured\nApplicant: ${applicantName} <${applicantEmail}>\nCohort: ${cohortName}\nAmount: ₹${amountInr}\nPayment ID: ${payment.id}\nApplication ID: ${applicationId}`,
        })

        // Auto-reply to candidate
        if (applicantEmail) {
          await sendEmail({
            to: applicantEmail,
            subject: `You're enrolled · ${cohortName} · pTeachTech`,
            html: `
              <h2 style="font-family:Manrope,system-ui,sans-serif;color:#1B2D6B">
                You're in, ${escapeHtml(applicantName)}.
              </h2>
              <p>Your founding-cohort seat in <strong>${escapeHtml(cohortName)}</strong> is reserved.</p>
              <p><strong>Amount paid:</strong> ₹${amountInr}<br/>
                 <strong>Payment reference:</strong> ${payment.id}<br/>
                 <strong>Application reference:</strong> ${escapeHtml(applicationId)}</p>
              <h3 style="font-family:Manrope,system-ui,sans-serif;color:#1B2D6B;margin-top:32px">
                What happens next
              </h3>
              <ol>
                <li>Within 48 hours, we'll send the welcome pack — Slack/Circle invite, pre-work, cohort kickoff date confirmation.</li>
                <li>Pre-cohort assessment review (if you've submitted your GitHub repo).</li>
                <li>Kickoff Saturday session before Day 1 — tooling check + capstone reveal.</li>
              </ol>
              <p style="margin-top:24px">
                Refund policy: full refund if requested before Day 3 of the cohort.
                Detailed policy at <a href="https://pteachtech.in/refund">pteachtech.in/refund</a>.
              </p>
              <p style="margin-top:24px">Production is the standard. From notebooks to production.</p>
              <p style="margin-top:8px">— Team pTeachTech</p>
              <p style="color:#4A4F5A;font-size:12px;margin-top:32px">
                pTeachTech · by Pernicia · <a href="https://pteachtech.in">pteachtech.in</a>
              </p>
            `,
            text: `You're in, ${applicantName}.\n\nYour founding-cohort seat in ${cohortName} is reserved.\n\nAmount paid: ₹${amountInr}\nPayment ref: ${payment.id}\nApplication ref: ${applicationId}\n\nWhat happens next:\n1. Welcome pack within 48 hours\n2. Pre-cohort assessment review\n3. Kickoff Saturday before Day 1\n\nRefund: full if requested before Day 3.\n\n— Team pTeachTech\npteachtech.in`,
          })
        }
        break
      }

      case 'payment.failed': {
        const payment = event.payload.payment?.entity
        if (!payment) break

        const notes = payment.notes ?? {}
        const applicantEmail = payment.email ?? notes.applicant_email ?? '—'

        await sendEmail({
          to: 'manan@pteachtech.in',
          subject: `⚠️ Payment failed · ${notes.applicant_name ?? 'unknown applicant'}`,
          html: `
            <h2 style="font-family:Manrope,system-ui,sans-serif;color:#1B2D6B">
              Payment failed
            </h2>
            <p><strong>Applicant:</strong> ${escapeHtml(notes.applicant_name ?? '—')} &lt;${escapeHtml(applicantEmail)}&gt;</p>
            <p><strong>Cohort:</strong> ${escapeHtml(notes.cohort_name ?? '—')}</p>
            <p><strong>Order ID:</strong> ${payment.order_id}</p>
            <p><strong>Reason:</strong> ${escapeHtml(payment.error_description ?? 'Unknown')}</p>
            <p style="color:#4A4F5A;font-size:12px;margin-top:24px">
              Consider reaching out to the applicant directly to help them retry.
            </p>
          `,
          text: `Payment failed\nApplicant: ${notes.applicant_name ?? '—'} <${applicantEmail}>\nCohort: ${notes.cohort_name ?? '—'}\nOrder: ${payment.order_id}\nReason: ${payment.error_description ?? 'Unknown'}`,
        })
        break
      }

      case 'refund.created': {
        const refund = event.payload.refund?.entity
        if (!refund) break

        const amountInr = (refund.amount / 100).toLocaleString('en-IN')

        await sendEmail({
          to: 'manan@pteachtech.in',
          subject: `↩️ Refund created · ₹${amountInr}`,
          html: `
            <p><strong>Refund ID:</strong> ${refund.id}</p>
            <p><strong>Payment ID:</strong> ${refund.payment_id}</p>
            <p><strong>Amount:</strong> ₹${amountInr}</p>
            <p><strong>Status:</strong> ${refund.status}</p>
          `,
          text: `Refund created: ${refund.id} · ₹${amountInr} · status=${refund.status}`,
        })
        break
      }

      default:
        // eslint-disable-next-line no-console
        console.log(`[razorpay-webhook] Unhandled event: ${event.event}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[razorpay-webhook] Handler error:', error)
    // Return 200 so Razorpay doesn't retry — we logged the error and can investigate.
    // (200 vs 500 is a judgment call; for now, prefer not to spam-retry.)
    return NextResponse.json({ received: true, handled: false })
  }
}
