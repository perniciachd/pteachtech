import Image from 'next/image'

export const metadata = {
  title: 'Scan to share feedback',
  robots: { index: false, follow: false },
}

export default function FeedbackQRPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-secondary/40 to-background px-6 py-16 text-center">
      {/* Brand */}
      <div className="mb-10 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <span className="text-lg font-bold text-primary-foreground">p</span>
        </div>
        <span className="text-xl font-bold text-foreground">pTeachTech</span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
        Scan to share your feedback
      </h1>
      <p className="mt-3 max-w-md text-lg text-muted-foreground">
        Anonymous · ~2 minutes · your input shapes future sessions.
      </p>

      {/* QR */}
      <div className="mt-10 rounded-3xl border bg-card p-6 shadow-sm">
        <Image
          src="/feedback-qr.svg"
          alt="QR code linking to pteachtech.in/feedback"
          width={300}
          height={300}
          priority
          unoptimized
        />
      </div>

      <p className="mt-8 text-base text-muted-foreground">
        Or open{' '}
        <span className="font-semibold text-foreground">pteachtech.in/feedback</span>
      </p>

      <p className="mt-2 text-xs text-muted-foreground">No name required — completely anonymous.</p>
    </main>
  )
}
