import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // TODO: Connect to Supabase to store registration
    // TODO: Send confirmation email
    console.log('[v0] Webinar registration:', { email, name })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Webinar registration error:', error)
    return NextResponse.json(
      { error: 'Failed to register for webinar' },
      { status: 500 }
    )
  }
}
