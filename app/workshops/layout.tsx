import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'In-Person Workshops',
  description:
    'In-person intensive workshops for engineering teams in North America — hands-on, practitioner-led, and scoped to your stack.',
  alternates: { canonical: 'https://pteachtech.in/workshops' },
}

export default function WorkshopsLayout({ children }: { children: React.ReactNode }) {
  return children
}
