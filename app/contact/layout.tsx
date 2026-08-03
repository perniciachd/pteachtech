import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Talk to us — Scope an Enterprise AI Program',
  description:
    'Book a scoping call for the Multi-Agent Copilot & Enterprise AI Architecture program — private, hands-on enterprise AI training delivered to your team by 15+ year practitioners. Competitive, tailored pricing.',
  alternates: { canonical: 'https://pteachtech.in/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
