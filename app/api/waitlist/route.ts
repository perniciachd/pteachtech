import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // TODO: Connect to Supabase to store waitlist entry
    console.log('[v0] Waitlist signup:', { email, source })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Waitlist error:', error)
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    )
  }
}
