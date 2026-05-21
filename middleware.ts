import { updateSession } from '@/lib/supabase/proxy'
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from '@/lib/admin/auth'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Admin protection ─────────────────────────────────────────────
  // /admin/* (except /admin/login) requires a valid admin session cookie.
  // /api/admin/* (except /api/admin/login) returns 401 on missing/invalid.
  const isAdminPage = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')
  const isAdminApi = pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/login')

  if (isAdminPage || isAdminApi) {
    const cookieValue = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
    const valid = await isValidAdminSession(cookieValue)
    if (!valid) {
      if (isAdminApi) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
  }

  // ── Supabase session refresh (existing behaviour) ─────────────────
  // updateSession is no-op when Supabase env unset; safe everywhere.
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
