/**
 * Minimal token-based admin auth — Edge-runtime compatible.
 *
 * Uses Web Crypto API (crypto.subtle) instead of Node's 'crypto' module so
 * the helpers work in Next.js Edge middleware as well as Node.js runtime
 * (API routes use `export const runtime = 'nodejs'` but Web Crypto works there too).
 *
 * Session cookie format:
 *   <expiry_unix_ms>.<hmac>
 *
 * where hmac = HMAC-SHA256(expiry, key = ADMIN_TOKEN).
 */

export const ADMIN_SESSION_COOKIE = 'admin_session'
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 days
export const SESSION_DURATION_SECONDS = Math.floor(SESSION_DURATION_MS / 1000)

function getSecret(): string | null {
  return process.env.ADMIN_TOKEN ?? null
}

/** Compare two equal-length strings in constant time. */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

/** HMAC-SHA256 → hex, using Web Crypto API. */
async function hmacSha256Hex(key: string, message: string): Promise<string> {
  const encoder = new TextEncoder()
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sigBuf = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message))
  const bytes = new Uint8Array(sigBuf)
  let hex = ''
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, '0')
  }
  return hex
}

export function checkAdminPassword(submitted: string): boolean {
  const secret = getSecret()
  if (!secret || !submitted) return false
  return constantTimeEqual(submitted, secret)
}

export async function createSessionCookie(): Promise<string> {
  const secret = getSecret()
  if (!secret) throw new Error('ADMIN_TOKEN not configured')
  const expiry = Date.now() + SESSION_DURATION_MS
  const payload = String(expiry)
  const hmac = await hmacSha256Hex(secret, payload)
  return `${payload}.${hmac}`
}

export async function isValidAdminSession(
  cookieValue: string | undefined
): Promise<boolean> {
  if (!cookieValue) return false
  const secret = getSecret()
  if (!secret) return false

  const [expiryStr, signature] = cookieValue.split('.')
  if (!expiryStr || !signature) return false

  const expiry = Number(expiryStr)
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false

  const expected = await hmacSha256Hex(secret, expiryStr)
  return constantTimeEqual(expected, signature)
}
