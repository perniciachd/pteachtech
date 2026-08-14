import type { Metadata } from 'next'

// The page itself is a client component ('use client'), which cannot export
// metadata. A route-segment layout is the standard way to attach it.
export const metadata: Metadata = {
  title: 'Talk to us — Scope an Enterprise AI Program',
  description:
    'Book a 15-minute scoping call or send us a note. We scope private AI and engineering programs around your team — stack, current level, timelines and delivery format.',
  alternates: { canonical: 'https://pteachtech.in/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
