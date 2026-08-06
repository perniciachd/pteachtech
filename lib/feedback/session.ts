import { randomInt } from 'crypto'
import { getSql } from '@/lib/db'

/** Session context stamped onto every response collected under a QR. */
export type TrainingSession = {
  id: string
  code: string
  created_at: string
  training_name: string
  training_topic: string | null
  trainer: string | null
  organization: string | null
  location: string | null
  training_date: string | null
  active: boolean
  notes: string | null
}

// No 0/o/1/l/i — codes get read aloud and typed by hand off a printed poster.
const ALPHABET = '23456789abcdefghjkmnpqrstuvwxyz'
const CODE_LENGTH = 5

function randomCode(): string {
  let out = ''
  for (let i = 0; i < CODE_LENGTH; i++) out += ALPHABET[randomInt(ALPHABET.length)]
  return out
}

/** Codes are stored lowercase; scanners and hand-typed URLs may not be. */
export function normalizeCode(code: string): string {
  return code.trim().toLowerCase()
}

/**
 * Generate a code that isn't taken yet. 31^5 ≈ 28M combinations, so a
 * collision is remote — retry a handful of times and give up loudly.
 */
export async function generateUniqueCode(): Promise<string> {
  const sql = getSql()
  for (let attempt = 0; attempt < 6; attempt++) {
    const code = randomCode()
    const rows = await sql`select id from training_sessions where code = ${code} limit 1`
    if (rows.length === 0) return code
  }
  throw new Error('Could not allocate a unique session code')
}

/**
 * Look up a session by its short code. Returns null when unknown — and also
 * when the database is unreachable or unconfigured, so a scanned QR degrades
 * to the "we couldn't find that session" notice instead of a 500.
 */
export async function getSessionByCode(code: string): Promise<TrainingSession | null> {
  try {
    const sql = getSql()
    const rows = await sql`
      select * from training_sessions where code = ${normalizeCode(code)} limit 1
    `
    return (rows[0] as TrainingSession) ?? null
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[session] lookup failed:', err)
    return null
  }
}

/** Absolute base URL for links printed onto QR posters. */
export function siteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  if (configured) return configured
  const vercel = process.env.VERCEL_URL
  if (vercel) return `https://${vercel}`
  return 'https://pteachtech.in'
}

/** The URL a session's QR encodes. */
export function sessionUrl(code: string): string {
  return `${siteUrl()}/f/${normalizeCode(code)}`
}

/** Human-readable one-liner: "Multi-Agent Copilot · Manan Jindal · Acme · 12 Aug". */
export function sessionSubtitle(s: Pick<TrainingSession, 'trainer' | 'organization' | 'location' | 'training_date'>): string {
  return [s.trainer, s.organization, s.location, s.training_date].filter(Boolean).join(' · ')
}
