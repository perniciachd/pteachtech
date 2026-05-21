/**
 * Minimal token-based admin auth.
 *
 * Single shared admin password stored in env (ADMIN_TOKEN).
 * On successful login, we set an HTTP-only cookie containing:
 *
 *   <expiry_unix_ms>.<hmac>
 *
 * where hmac = HMAC-SHA256(expiry, key = ADMIN_TOKEN).
 *
 * Middleware verifies the cookie on every /admin/* request.
 *
 * This is intentionally lightweight (no DB) — designed for the founding-cohort
 * window. Upgrade to Supabase Auth + multi-admin once cohort 2 starts.
 */
import crypto from 'crypto'

export const ADMIN_SESSION_COOKIE = 'admin_session'
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

function getSecret(): string | null {
  return process.env.ADMIN_TOKEN ?? null
}

export function checkAdminPassword(submitted: string): boolean {
  const secret = getSecret()
  if (!secret || !submitted) return false
  // Constant-time compare
  if (submitted.length !== secret.length) return false
  return crypto.timingSafeEqual(Buffer.from(submitted), Buffer.from(secret))
}

export function createSessionCookie(): string {
  const secret = getSecret()
  if (!secret) throw new Error('ADMIN_TOKEN not configured')
  const expiry = Date.now() + SESSION_DURATION_MS
  const payload = String(expiry)
  const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex')
  return `${payload}.${hmac}`
}

export function isValidAdminSession(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false
  const secret = getSecret()
  if (!secret) return false

  const [expiryStr, signature] = cookieValue.split('.')
  if (!expiryStr || !signature) return false

  const expiry = Number(expiryStr)
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false

  const expected = crypto.createHmac('sha256', secret).update(expiryStr).digest('hex')
  if (expected.length !== signature.length) return false
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  } catch {
    return false
  }
}

export const SESSION_DURATION_SECONDS = Math.floor(SESSION_DURATION_MS / 1000)
