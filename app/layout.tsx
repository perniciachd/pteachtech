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
    default: 'pTeachTech | Enterprise AI Training & Multi-Agent Copilot Cohorts',
    template: '%s | pTeachTech',
  },
  description:
    'Private, hands-on enterprise AI training by Pernicia (Canada). Multi-Agent Copilot & Enterprise AI Architecture on Microsoft Copilot Studio & Azure — delivered to US & European teams by 15+ year practitioners who build these systems in production.',
  keywords: [
    'Enterprise AI training',
    'AI training cohorts',
    'Multi-Agent Copilot',
    'Microsoft Copilot Studio training',
    'Agentic AI training',
    'Enterprise AI architecture',
    'Copilot Studio',
    'Power Platform training',
    'Azure AI training',
    'Corporate AI training',
    'AI upskilling for teams',
    'Private AI cohorts',
    'AI training for enterprises',
  ],
  authors: [{ name: 'pTeachTech', url: 'https://pteachtech.in' }],
  creator: 'pTeachTech · Pernicia (Canada)',
  publisher: 'Pernicia (Canada)',
  metadataBase: new URL('https://pteachtech.in'),
  alternates: {
    canonical: 'https://pteachtech.in',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pteachtech.in',
    siteName: 'pTeachTech',
    title: 'pTeachTech | Enterprise AI Training & Multi-Agent Copilot Cohorts',
    description:
      'Private, hands-on enterprise AI training. Multi-Agent Copilot & Enterprise AI Architecture on Copilot Studio & Azure, delivered to US & European teams by 15+ year practitioners.',
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
    title: 'pTeachTech | Enterprise AI Training & Multi-Agent Copilot Cohorts',
    description:
      'Private, hands-on enterprise AI training. Multi-Agent Copilot & Enterprise AI Architecture, delivered to US & European teams by 15+ year practitioners.',
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
    'company:parent': 'Pernicia (Canada)',
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
