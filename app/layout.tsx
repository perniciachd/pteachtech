import type { Metadata, Viewport } from 'next'
import { Manrope, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'pTeachTech | From notebooks to production',
    template: '%s | pTeachTech',
  },
  description:
    'Cohort-based AI and AWS Cloud engineering training for working professionals. Six-week live programs · BFSI vertical depth · India · Middle East · Toronto · SF · Dubai.',
  keywords: [
    'AI Engineering',
    'AWS Cloud',
    'Cloud-DevSecOps',
    'RAG',
    'MLOps',
    'LLM Application Development',
    'Production AI',
    'BFSI Compliance',
    'Cohort-Based Learning',
    'Working Professionals',
    'RBI Compliance',
    'DPDP',
    'Engineering Training',
    'AI Bootcamp India',
  ],
  authors: [{ name: 'pTeachTech', url: 'https://pteachtech.in' }],
  creator: 'pTeachTech (by Pernicia)',
  publisher: 'Pernicia Pvt Ltd',
  metadataBase: new URL('https://pteachtech.in'),
  alternates: {
    canonical: 'https://pteachtech.in',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://pteachtech.in',
    siteName: 'pTeachTech',
    title: 'pTeachTech | From notebooks to production',
    description:
      'Cohort-based AI and AWS Cloud training for working professionals. Live, hands-on, production-grade.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'pTeachTech — From notebooks to production',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pTeachTech | From notebooks to production',
    description:
      'Cohort-based AI and AWS Cloud training for working professionals. Live, hands-on, production-grade.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'company:parent': 'Pernicia (Pernicia Pvt Ltd · India · Pernicia Corp · Canada)',
  },
}

export const viewport: Viewport = {
  themeColor: '#1B2D6B',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
