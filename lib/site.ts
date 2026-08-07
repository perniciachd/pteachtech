/** The canonical public origin. Matches app/sitemap.ts and app/robots.ts. */
export const PRODUCTION_ORIGIN = 'https://pteachtech.in'

/**
 * Absolute base URL for links we bake into QR codes and emails.
 *
 * Order matters. VERCEL_URL is a per-deployment hostname
 * (pteachtech-<hash>-<team>.vercel.app) that changes on every push and can sit
 * behind deployment protection — printing it into a QR would hand out a link
 * that dies at the next deploy. So it is only ever used for preview builds;
 * production always resolves to the canonical domain.
 */
export function siteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  if (configured) return configured

  if (process.env.VERCEL_ENV === 'production') return PRODUCTION_ORIGIN

  const preview = process.env.VERCEL_URL
  if (preview) return `https://${preview}`

  return PRODUCTION_ORIGIN
}
