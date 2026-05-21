import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  ADMIN_SESSION_COOKIE,
  SESSION_DURATION_SECONDS,
  checkAdminPassword,
  createSessionCookie,
} from '@/lib/admin/auth'

export const runtime = 'nodejs'

const LoginSchema = z.object({
  password: z.string().min(1).max(500),
})

// Per-IP rate limit to deter brute force.
const rateLimits = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 5
const WINDOW_MS = 5 * 60 * 1000 // 5 min

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
  if (!process.env.ADMIN_TOKEN) {
    return NextResponse.json(
      { error: 'Admin is not configured. Set ADMIN_TOKEN env var to enable.' },
      { status: 503 }
    )
  }

  const ip = getClientIp(request)
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in 5 minutes.' },
      { status: 429 }
    )
  }

  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const parsed = LoginSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  if (!checkAdminPassword(parsed.data.password)) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })
  }

  const cookieValue = await createSessionCookie()
  const response = NextResponse.json({ ok: true })
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: cookieValue,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  })
  return response
}
