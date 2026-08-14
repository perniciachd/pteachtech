import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume Lens',
  description:
    'Resume Lens by pTeachTech — practitioner-led feedback on engineering resumes.',
  alternates: { canonical: 'https://pteachtech.in/lens' },
}

export default function LensLayout({ children }: { children: React.ReactNode }) {
  return children
}
