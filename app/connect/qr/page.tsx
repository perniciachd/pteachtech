import type { Metadata } from 'next'
import { contactCard } from '@/lib/data/contact-card'
import { siteUrl } from '@/lib/site'
import { qrSvg } from '@/lib/qr'

export const metadata: Metadata = {
  title: 'Scan to connect · Manan Jindal',
  robots: { index: false, follow: false },
}

/**
 * Full-screen QR for a slide, a badge or a phone held up at an event.
 * Prints cleanly on one page.
 */
export default async function ConnectQRPoster() {
  const url = `${siteUrl()}/connect`
  const svg = await qrSvg(url, 380)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-secondary/40 to-background px-6 py-16 text-center print:bg-white print:py-8">
      {/* Brand */}
      <div className="mb-8 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <span className="text-lg font-bold text-primary-foreground">p</span>
        </div>
        <span className="text-xl font-bold text-foreground">pTeachTech</span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
        Scan to connect
      </h1>

      <p className="mt-4 text-xl font-semibold text-foreground">{contactCard.fullName}</p>
      <p className="mt-1 text-base text-muted-foreground">{contactCard.title}</p>
      <p className="text-base text-muted-foreground">{contactCard.organization}</p>

      {/* QR — rendered server-side, no external requests. */}
      <div
        className="mt-8 rounded-3xl border bg-white p-6 shadow-sm print:border-0 print:shadow-none"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: svg }}
      />

      <p className="mt-6 text-base text-muted-foreground">
        Or open <span className="font-semibold text-foreground">{url.replace(/^https?:\/\//, '')}</span>
      </p>

      <p className="mt-2 text-xs text-muted-foreground">
        Email · phone · LinkedIn · Medium — and one tap to save the contact.
      </p>
    </main>
  )
}
