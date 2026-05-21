/**
 * Razorpay admin helpers — list payments and orders via Razorpay's REST API.
 *
 * Used by /api/admin/payments to surface live data in the admin dashboard
 * without needing our own DB persistence layer.
 *
 * Razorpay API docs:
 *   - https://razorpay.com/docs/api/payments/list-payments/
 *   - https://razorpay.com/docs/api/orders/list-orders/
 */

const RAZORPAY_API_BASE = 'https://api.razorpay.com/v1'

type RazorpayPayment = {
  id: string
  entity: 'payment'
  amount: number // paise
  currency: string
  status: 'created' | 'authorized' | 'captured' | 'refunded' | 'failed'
  order_id: string | null
  invoice_id: string | null
  international: boolean
  method: string
  amount_refunded: number
  refund_status: string | null
  captured: boolean
  description: string | null
  card_id: string | null
  bank: string | null
  wallet: string | null
  vpa: string | null
  email: string | null
  contact: string | null
  notes: Record<string, string> | unknown[]
  fee: number | null
  tax: number | null
  error_code: string | null
  error_description: string | null
  created_at: number
}

export type PaymentRow = {
  id: string
  status: RazorpayPayment['status']
  amountInr: number
  currency: string
  method: string
  email: string | null
  contact: string | null
  applicantName: string | null
  applicantEmail: string | null
  applicantPhone: string | null
  applicantCountry: string | null
  githubAssessmentUrl: string | null
  cohortSlug: string | null
  cohortName: string | null
  applicationId: string | null
  createdAt: Date
  errorDescription: string | null
  international: boolean
  refundStatus: string | null
}

export type ListPaymentsResult =
  | { ok: true; payments: PaymentRow[]; count: number }
  | { ok: false; skipped: true; reason: string }
  | { ok: false; error: string }

export async function listRazorpayPayments(opts?: {
  count?: number
  from?: Date
  to?: Date
}): Promise<ListPaymentsResult> {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    return { ok: false, skipped: true, reason: 'Razorpay credentials not configured' }
  }

  const params = new URLSearchParams()
  params.set('count', String(opts?.count ?? 50)) // Razorpay max is 100
  if (opts?.from) params.set('from', String(Math.floor(opts.from.getTime() / 1000)))
  if (opts?.to) params.set('to', String(Math.floor(opts.to.getTime() / 1000)))

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64')

  try {
    const response = await fetch(`${RAZORPAY_API_BASE}/payments?${params.toString()}`, {
      method: 'GET',
      headers: { Authorization: `Basic ${auth}` },
      // Razorpay's API responds fast; default Vercel function timeout is fine.
      cache: 'no-store',
    })

    if (!response.ok) {
      const errText = await response.text().catch(() => '')
      return { ok: false, error: `Razorpay ${response.status}: ${errText}` }
    }

    const data = (await response.json()) as {
      items: RazorpayPayment[]
      count: number
    }

    const payments: PaymentRow[] = data.items.map((p) => {
      const notes: Record<string, string> = Array.isArray(p.notes) ? {} : (p.notes as Record<string, string>)
      return {
        id: p.id,
        status: p.status,
        amountInr: p.amount / 100,
        currency: p.currency,
        method: p.method,
        email: p.email,
        contact: p.contact,
        applicantName: notes.applicant_name ?? null,
        applicantEmail: notes.applicant_email ?? null,
        applicantPhone: notes.applicant_phone || null,
        applicantCountry: notes.applicant_country || null,
        githubAssessmentUrl: notes.github_assessment_url || null,
        cohortSlug: notes.cohort_slug ?? null,
        cohortName: notes.cohort_name ?? null,
        applicationId: notes.application_id ?? null,
        createdAt: new Date(p.created_at * 1000),
        errorDescription: p.error_description,
        international: p.international,
        refundStatus: p.refund_status,
      }
    })

    return { ok: true, payments, count: data.count }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}
