import { NextResponse } from 'next/server'
import { buildVCard } from '@/lib/data/contact-card'

export const runtime = 'nodejs'

/** Downloadable contact card — "Save to contacts" on /connect points here. */
export async function GET() {
  return new NextResponse(buildVCard(), {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="manan-jindal.vcf"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
