import type { Metadata } from 'next'
import { Mail, Phone, Linkedin, BookOpen, Globe, Download } from 'lucide-react'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { contactCard } from '@/lib/data/contact-card'
import { siteUrl } from '@/lib/site'
import { qrSvg } from '@/lib/qr'

export const metadata: Metadata = {
  title: 'Connect with Manan Jindal',
  description: 'Contact card for Manan Jindal — pTeachTech.',
  // Personal phone and email live on this page; keep it out of search results.
  robots: { index: false, follow: false },
}

const links = [
  { icon: Mail, label: 'Email', value: contactCard.email, href: `mailto:${contactCard.email}` },
  { icon: Phone, label: 'Phone', value: contactCard.phoneDisplay, href: `tel:${contactCard.phone}` },
  { icon: Linkedin, label: 'LinkedIn', value: '/in/mananjindal', href: contactCard.linkedin },
  { icon: BookOpen, label: 'Medium', value: '@manan_jindal', href: contactCard.medium },
  { icon: Globe, label: 'Website', value: 'pteachtech.in', href: contactCard.website },
]

export default async function ConnectPage() {
  // The QR points back at this page, so the details behind it stay editable
  // long after a card or slide has been printed.
  const svg = await qrSvg(`${siteUrl()}/connect`, 200)

  return (
    <MarketingLayout showCohortBar={false}>
      <section className="mx-auto max-w-xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
          {/* Header */}
          <div className="bg-primary px-6 py-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-foreground/10 text-3xl font-bold text-primary-foreground ring-2 ring-primary-foreground/20">
              MJ
            </div>
            <h1 className="mt-4 text-2xl font-bold text-primary-foreground">{contactCard.fullName}</h1>
            <p className="mt-1 text-sm text-primary-foreground/80">{contactCard.title}</p>
            <p className="text-sm text-primary-foreground/70">{contactCard.organization}</p>
          </div>

          {/* Details */}
          <div className="divide-y">
            {links.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-secondary/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
                  <span className="block truncate font-medium text-foreground">{value}</span>
                </span>
              </a>
            ))}
          </div>

          {/* Save to contacts */}
          <div className="border-t p-6">
            <Button asChild size="lg" className="w-full gap-2">
              {/* Served by /api/vcard as a .vcf download */}
              <a href="/api/vcard" download>
                <Download className="h-4 w-4" /> Save to contacts
              </a>
            </Button>
          </div>

          {/* QR — so this page can itself be shown on a phone for someone to scan */}
          <div className="flex flex-col items-center gap-3 border-t bg-secondary/30 px-6 py-8">
            <div
              className="rounded-2xl border bg-white p-3"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: svg }}
            />
            <p className="text-center text-xs text-muted-foreground">
              Scan to open this card · pteachtech.in/connect
            </p>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
