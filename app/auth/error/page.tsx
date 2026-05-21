'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AlertTriangle } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'

const REASON_MESSAGES: Record<string, string> = {
  auth_not_configured:
    'Authentication is not active in this environment. If you were trying to sign in, please contact us — we may not have rolled out account-based features yet.',
  missing_code:
    'The sign-in link looks incomplete. Try requesting a new sign-in email.',
  exchange_failed:
    'We could not verify your sign-in link. It may have expired (links are valid for 1 hour) or been used already.',
  unhandled_error:
    'Something unexpected went wrong while completing sign-in. Please try again or contact us.',
}

function AuthErrorInner() {
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason') ?? 'unhandled_error'
  const message = REASON_MESSAGES[reason] ?? REASON_MESSAGES['unhandled_error']

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
          Sign-in didn&apos;t complete
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
          {message}
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Reason code: <code className="font-mono">{reason}</code>
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact support</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function AuthErrorPage() {
  return (
    <MarketingLayout showCohortBar={false}>
      <Suspense fallback={
        <section className="py-24 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </section>
      }>
        <AuthErrorInner />
      </Suspense>
    </MarketingLayout>
  )
}
