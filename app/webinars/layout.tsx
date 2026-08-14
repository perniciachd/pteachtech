import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Webinars',
  description:
    'Live sessions on agentic AI, multi-agent architecture and production AI engineering, run by practitioners who ship these systems.',
  alternates: { canonical: 'https://pteachtech.in/webinars' },
}

export default function WebinarsLayout({ children }: { children: React.ReactNode }) {
  return children
}
