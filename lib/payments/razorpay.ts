/**
 * Razorpay helper — uses native fetch.
 *
 * Required env:
 *   RAZORPAY_KEY_ID         — public key (rzp_test_xxx or rzp_live_xxx)
 *   RAZORPAY_KEY_SECRET     — secret (server-only)
 *   RAZORPAY_WEBHOOK_SECRET — for verifying inbound webhooks
 *
 * Behavior when RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET unset:
 *   - Functions return { ok: false, skipped: true }
 *   - Logs to console; does not throw
 */
import crypto from 'crypto'

const RAZORPAY_ORDERS_ENDPOINT = 'https://api.razorpay.com/v1/orders'

export type CreateOrderArgs = {
  /** Amount in paise (₹30,000 → 3000000). */
  amountPaise: number
  /** Internal receipt/reference (e.g., application UUID). Max 40 chars. */
  receipt: string
  /** Free-form metadata attached to the order (visible in dashboard). */
  notes?: Record<string, string>
}

export type CreateOrderResult =
  | { ok: true; orderId: string; amount: number; currency: string }
  | { ok: false; skipped: true; reason: string }
  | { ok: false; error: string }

export async function createRazorpayOrder(args: CreateOrderArgs): Promise<CreateOrderResult> {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    // eslint-disable-next-line no-console
    console.warn('[razorpay] RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET not set — skipping order creation', {
      amount: args.amountPaise,
      receipt: args.receipt,
    })
    return { ok: false, skipped: true, reason: 'Razorpay credentials not configured' }
  }

  try {
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64')
    const response = await fetch(RAZORPAY_ORDERS_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: args.amountPaise,
        currency: 'INR',
        receipt: args.receipt.slice(0, 40), // Razorpay limit
        notes: args.notes ?? {},
        // Auto-capture: payment is captured immediately on success (vs. 2-step authorize+capture)
        payment_capture: 1,
      }),
    })

    if (!response.ok) {
      const errText = await response.text().catch(() => '')
      // eslint-disable-next-line no-console
      console.error('[razorpay] Order creation failed', response.status, errText)
      return { ok: false, error: `Razorpay returned ${response.status}: ${errText}` }
    }

    const data = (await response.json()) as { id: string; amount: number; currency: string }
    return { ok: true, orderId: data.id, amount: data.amount, currency: data.currency }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[razorpay] Request failed', err)
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}

/**
 * Verify Razorpay webhook signature.
 * Razorpay sends `X-Razorpay-Signature` header on webhooks.
 * Sign the raw body with HMAC-SHA256 using RAZORPAY_WEBHOOK_SECRET; compare.
 */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret) {
    // eslint-disable-next-line no-console
    console.warn('[razorpay] RAZORPAY_WEBHOOK_SECRET not set — rejecting webhook')
    return false
  }

  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')

  // Constant-time compare to prevent timing attacks
  if (expected.length !== signature.length) return false
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
}

/**
 * Verify checkout response signature (client-side payment success → server verification).
 * Razorpay sends razorpay_order_id + razorpay_payment_id + razorpay_signature back from checkout.
 * The signature is HMAC-SHA256(order_id|payment_id, key_secret).
 */
export function verifyCheckoutSignature(args: {
  orderId: string
  paymentId: string
  signature: string
}): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) return false

  const payload = `${args.orderId}|${args.paymentId}`
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex')

  if (expected.length !== args.signature.length) return false
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(args.signature))
}

/** Format an INR paise amount as a human-readable string. */
export function formatInr(paise: number): string {
  return `₹${(paise / 100).toLocaleString('en-IN')}`
}
