import type { Metadata } from 'next'
import Link from 'next/link'
import { CalendarCheck2, SearchX } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { FeedbackForm } from '@/components/feedback/feedback-form'
import { getSessionByCode } from '@/lib/feedback/session'

// Sessions are created and edited live; never serve a stale context.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Training Feedback',
  description: 'Share anonymous feedback about your pTeachTech training.',
  robots: { index: false, follow: false },
}

function Notice({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        {icon}
      </div>
      <h1 className="mt-6 text-2xl font-bold text-foreground">{title}</h1>
      <p className="mt-3 text-muted-foreground">{body}</p>
      <p className="mt-6 text-sm text-muted-foreground">
        You can still{' '}
        <Link href="/feedback" className="font-medium text-primary underline underline-offset-4">
          share feedback here
        </Link>
        .
      </p>
    </section>
  )
}

export default async function SessionFeedbackPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const session = await getSessionByCode(code)

  if (!session) {
    return (
      <MarketingLayout>
        <Notice
          icon={<SearchX className="h-7 w-7" />}
          title="We couldn't find that session"
          body="The code on this QR doesn't match a training. Please double-check the link, or use the general feedback form."
        />
      </MarketingLayout>
    )
  }

  if (!session.active) {
    return (
      <MarketingLayout>
        <Notice
          icon={<CalendarCheck2 className="h-7 w-7" />}
          title="This session is closed"
          body={`Feedback for "${session.training_name}" is no longer being collected. Thank you for attending!`}
        />
      </MarketingLayout>
    )
  }

  return (
    <MarketingLayout>
      <FeedbackForm
        session={{
          code: session.code,
          trainingName: session.training_name,
          trainingTopic: session.training_topic,
          trainer: session.trainer,
          organization: session.organization,
          location: session.location,
          trainingDate: session.training_date,
        }}
      />
    </MarketingLayout>
  )
}
