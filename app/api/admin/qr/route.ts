import { NextRequest, NextResponse } from 'next/server'
import { sessionUrl } from '@/lib/feedback/session'
import { qrPng, qrSvg } from '@/lib/feedback/qr'

export const runtime = 'nodejs'
// Access is gated by middleware (/api/admin/* requires a valid admin session).

// Only ever encodes our own /f/<code> URLs — never arbitrary caller-supplied
// text, so this can't be used as an open QR generator.
const CODE_RE = /^[a-z0-9]{3,16}$/

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const code = (searchParams.get('code') ?? '').trim().toLowerCase()
  if (!CODE_RE.test(code)) {
    return NextResponse.json({ error: 'Invalid session code.' }, { status: 400 })
  }

  const format = searchParams.get('format') === 'png' ? 'png' : 'svg'
  const size = Math.min(Math.max(Number(searchParams.get('size')) || (format === 'png' ? 1024 : 320), 120), 2048)
  const url = sessionUrl(code)

  if (format === 'png') {
    const png = await qrPng(url, size)
    return new NextResponse(new Uint8Array(png), {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="feedback-qr-${code}.png"`,
        'Cache-Control': 'private, max-age=3600',
      },
    })
  }

  const svg = await qrSvg(url, size)
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'private, max-age=3600',
    },
  })
}
