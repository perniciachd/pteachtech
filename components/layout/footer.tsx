import Link from 'next/link'
import { Linkedin, Twitter, Youtube, Mail } from 'lucide-react'

const footerLinks = {
  programs: [
    { name: 'AI Engineering', href: '/cohorts/ai-engineering' },
    { name: 'AWS Cloud', href: '/cohorts/aws-cloud' },
    { name: 'AI Deployment', href: '/cohorts/ai-deployment' },
    { name: 'Compare Programs', href: '/compare' },
  ],
  resources: [
    { name: 'Workshops', href: '/workshops' },
    { name: 'Lens Newsletter', href: '/lens' },
    { name: 'Blog', href: '/blog' },
    { name: 'Alumni', href: '/alumni' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Webinars', href: '/webinars' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Refund Policy', href: '/refund' },
  ],
}

const socialLinks = [
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'YouTube', href: '#', icon: Youtube },
  { name: 'Email', href: 'mailto:hello@pteachtech.com', icon: Mail },
]

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">p</span>
              </div>
              <span className="text-xl font-bold text-foreground">pTeachTech</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Build real AI skills with industry experts through cohort-based learning programs.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={item.name}
                >
                  <item.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Programs</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.programs.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Resources</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Company</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Legal</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} pTeachTech. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            A product of{' '}
            <Link href="#" className="font-medium text-foreground hover:text-primary">
              Pernicia Brands Private Limited
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
