/** Absolute base URL for links we bake into QR codes and emails. */
export function siteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  if (configured) return configured
  const vercel = process.env.VERCEL_URL
  if (vercel) return `https://${vercel}`
  return 'https://pteachtech.in'
}
