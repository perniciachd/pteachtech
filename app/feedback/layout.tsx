import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Training Feedback',
  description: 'Share anonymous feedback about your pTeachTech training.',
  robots: { index: false, follow: false },
}

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return children
}
