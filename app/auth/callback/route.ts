import { NextRequest, NextResponse } from 'next/server'

/**
 * Supabase auth callback.
 *
 * This route handles the OAuth/magic-link code exchange after Supabase
 * redirects the user back to our site. It exchanges the `code` query param
 * for a session and redirects to the requested `next` page (or home).
 *
 * Important: We lazily import the Supabase server client so that when
 * Supabase env vars are NOT set, this route still loads without crashing.
 * Y1 we run mostly without auth; auth becomes mandatory once /admin and the
 * authenticated learner dashboard are built (Q4 2026 / Q1 2027 per plan).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  // Graceful skip when Supabase isn't configured (matches proxy.ts behaviour).
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    // eslint-disable-next-line no-console
    console.warn('[auth/callback] Supabase env not set — auth not active in this environment')
    return NextResponse.redirect(`${origin}/auth/error?reason=auth_not_configured`)
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/error?reason=missing_code`)
  }

  try {
    // Lazy import so the route module loads cleanly without Supabase env.
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
    // eslint-disable-next-line no-console
    console.error('[auth/callback] exchangeCodeForSession failed:', error.message)
    return NextResponse.redirect(`${origin}/auth/error?reason=exchange_failed`)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[auth/callback] unhandled error:', err)
    return NextResponse.redirect(`${origin}/auth/error?reason=unhandled_error`)
  }
}
