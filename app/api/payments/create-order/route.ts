import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { createRazorpayOrder } from '@/lib/payments/razorpay'
import { getCohortBySlug } from '@/lib/data/cohorts'
import { sendEmail, escapeHtml, isValidEmail } from '@/lib/email'

export const runtime = 'nodejs'

const CreateOrderSchema = z.object({
  cohortSlug: z.string().trim().min(1).max(60),
  applicantName: z.string().trim().min(1).max(120),
  applicantEmail: z.string().trim().toLowerCase().max(200),
  applicantPhone: z.string().trim().max(30).optional(),
  applicantCountry: z.string().trim().max(60).optional(),
  githubAssessmentUrl: z.string().trim().max(300).optional(),
  whyThisCohort: z.string().trim().min(20).max(2000),
  // Honeypot
  website: z.string().max(0).optional(),
})

// Per-IP rate limit
const rateLimits = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 5
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

/**
 * Founding-cohort pricing (paise = INR × 100).
 * Source: PERNICIA_AI_COHORT_SYLLABUS.md and PERNICIA_*_CURRICULUM.md.
 * These are the ONLY publicly-displayed/charged prices; ME/US tiers are hidden.
 */
const FOUNDING_PRICING_PAISE: Record<string, number> = {
  'ai-engineering': 30000 * 100,      // ₹30,000
  'aws-cloud': 22000 * 100,           // ₹22,000
  'ai-deployment': 15000 * 100,       // ₹15,000 (Tier 1)
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

    const parsed = CreateOrderSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Please check your inputs and try again.' },
        { status: 400 }
      )
    }

    const {
      cohortSlug,
      applicantName,
      applicantEmail,
      applicantPhone,
      applicantCountry,
      githubAssessmentUrl,
      whyThisCohort,
      website,
    } = parsed.data

    if (website && website.length > 0) {
      return NextResponse.json({ error: 'Bot detected' }, { status: 400 })
    }

    if (!isValidEmail(applicantEmail)) {
      return NextResponse.json({ error: 'Please use a valid email.' }, { status: 400 })
    }

    // Verify cohort + pricing
    const cohort = getCohortBySlug(cohortSlug)
    if (!cohort) {
      return NextResponse.json({ error: 'Unknown cohort.' }, { status: 400 })
    }

    const amountPaise = FOUNDING_PRICING_PAISE[cohortSlug]
    if (!amountPaise) {
      return NextResponse.json(
        { error: 'Pricing not configured for this cohort. Please contact us.' },
        { status: 400 }
      )
    }

    // Generate application ID — used as Razorpay receipt + for tracking
    const applicationId = randomUUID()

    // Create Razorpay order
    const orderResult = await createRazorpayOrder({
      amountPaise,
      receipt: applicationId.slice(0, 38),
      notes: {
        application_id: applicationId,
        cohort_slug: cohortSlug,
        cohort_name: cohort.name,
        applicant_email: applicantEmail,
        applicant_name: applicantName,
        applicant_phone: applicantPhone ?? '',
        applicant_country: applicantCountry ?? '',
        github_assessment_url: githubAssessmentUrl ?? '',
      },
    })

    if (!orderResult.ok) {
      if ('skipped' in orderResult) {
        return NextResponse.json(
          {
            error:
              'Payments are not yet enabled in this environment. We received your interest — we will reach out directly.',
          },
          { status: 503 }
        )
      }
      return NextResponse.json(
        { error: 'Could not create payment. Please try again or email learn@pteachtech.in.' },
        { status: 500 }
      )
    }

    // Send internal notification (application submitted, awaiting payment)
    const safeName = escapeHtml(applicantName)
    const safeEmail = escapeHtml(applicantEmail)
    const safePhone = escapeHtml(applicantPhone ?? '—')
    const safeCountry = escapeHtml(applicantCountry ?? '—')
    const safeWhy = escapeHtml(whyThisCohort).replace(/\n/g, '<br/>')
    const safeGithub = escapeHtml(githubAssessmentUrl ?? 'Not provided')

    await sendEmail({
      to: ['manan@pteachtech.in', 'abhir@pernicia.in'],
      subject: `Application: ${cohort.name} — ${applicantName} (awaiting payment)`,
      replyTo: applicantEmail,
      html: `
        <h2 style="font-family:Manrope,system-ui,sans-serif;color:#1B2D6B">
          New application — payment in progress
        </h2>
        <p><strong>Cohort:</strong> ${escapeHtml(cohort.name)}</p>
        <p><strong>Amount:</strong> ₹${(amountPaise / 100).toLocaleString('en-IN')}</p>
        <p><strong>Application ID:</strong> ${applicationId}</p>
        <hr style="margin:16px 0;border:none;border-top:1px solid #ddd"/>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Country:</strong> ${safeCountry}</p>
        <p><strong>Assessment GitHub URL:</strong> ${safeGithub}</p>
        <p><strong>Why this cohort:</strong></p>
        <div style="background:#FAF7F0;padding:12px;border-left:4px solid #F4C430">${safeWhy}</div>
        <p style="color:#4A4F5A;font-size:12px;margin-top:24px">
          Payment status will be reflected when Razorpay sends the webhook (or check the dashboard).
        </p>
      `,
      text: `New application (payment pending)\n\nCohort: ${cohort.name}\nAmount: ₹${(amountPaise / 100).toLocaleString('en-IN')}\nApplication ID: ${applicationId}\n\nName: ${applicantName}\nEmail: ${applicantEmail}\nPhone: ${applicantPhone ?? '—'}\nCountry: ${applicantCountry ?? '—'}\nAssessment: ${githubAssessmentUrl ?? '—'}\n\nWhy: ${whyThisCohort}`,
    })

    return NextResponse.json({
      orderId: orderResult.orderId,
      amount: orderResult.amount,
      currency: orderResult.currency,
      applicationId,
      cohortName: cohort.name,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[create-order] Unhandled error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please email learn@pteachtech.in directly.' },
      { status: 500 }
    )
  }
}
