import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSessionByCode, sessionUrl } from '@/lib/feedback/session'
import { qrSvg } from '@/lib/qr'

// The poster reflects whatever the session says right now — edit the session
// and re-print without ever regenerating a QR by hand.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Scan to share feedback',
  robots: { index: false, follow: false },
}

export default async function SessionQRPoster({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const session = await getSessionByCode(code)
  if (!session) notFound()

  const url = sessionUrl(session.code)
  const svg = await qrSvg(url, 380)
  const meta = [session.trainer, session.organization, session.location, session.training_date]
    .filter(Boolean)
    .join(' · ')

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
        Scan to share your feedback
      </h1>

      {/* Which training this poster belongs to — so a stack of printouts
          from different sessions never gets mixed up. */}
      <p className="mt-4 max-w-xl text-xl font-semibold text-foreground text-balance">
        {session.training_name}
      </p>
      {session.training_topic && (
        <p className="mt-1 max-w-xl text-base text-muted-foreground">{session.training_topic}</p>
      )}
      {meta && <p className="mt-1 text-base text-muted-foreground">{meta}</p>}

      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        Anonymous · ~2 minutes · your input shapes future sessions.
      </p>

      {/* QR — rendered server-side, no external requests. */}
      <div
        className="mt-8 rounded-3xl border bg-white p-6 shadow-sm print:border-0 print:shadow-none"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: svg }}
      />

      <p className="mt-6 text-base text-muted-foreground">
        Or open <span className="font-semibold text-foreground">{url.replace(/^https?:\/\//, '')}</span>
      </p>

      <p className="mt-2 text-xs text-muted-foreground">No name required — completely anonymous.</p>

      {!session.active && (
        <p className="mt-6 rounded-md bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-900 print:hidden">
          This session is closed — scans will see a “closed” message.
        </p>
      )}
    </main>
  )
}
