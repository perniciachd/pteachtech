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
    // Program topics
    'AI observability training',
    'LLM observability',
    'AI security training',
    'AI agent security',
    'AI deployment training',
    'LLM deployment',
    'AI evaluation training',
    'LLM evaluation',
    'Agent orchestration',
    'AI governance',
    'RAG training',
    'Prompt engineering training',
    'Guardrails',
    'RBAC',
    'Microsoft Entra ID',
    'Azure Key Vault',
    'Azure Monitor',
    'Application Insights',
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
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'pTeachTech',
    alternateName: 'pTeachTech by Pernicia',
    url: 'https://pteachtech.in',
    logo: 'https://pteachtech.in/og-image.png',
    description:
      'Private, hands-on enterprise AI training. Multi-Agent Copilot & Enterprise AI Architecture on Microsoft Copilot Studio & Azure, delivered to US & European teams by 15+ year practitioners.',
    parentOrganization: { '@type': 'Organization', name: 'Pernicia', address: { '@type': 'PostalAddress', addressCountry: 'CA' } },
    knowsAbout: [
      'Enterprise AI training',
      'Multi-Agent Copilot',
      'Microsoft Copilot Studio',
      'Agentic AI',
      'Enterprise AI architecture',
      'Azure AI',
      'AI observability',
      'AI security',
      'AI deployment',
      'AI evaluation',
      'AI governance',
      'Agent orchestration',
      'Retrieval-augmented generation',
      'Prompt engineering',
    ],
    sameAs: [
      'https://www.linkedin.com/company/68563633/',
      'https://www.instagram.com/pteachtech/',
    ],
  }
  const siteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'pTeachTech',
    url: 'https://pteachtech.in',
  }
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([orgSchema, siteSchema]) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
