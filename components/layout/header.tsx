'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navigation = {
  programs: [
    { name: 'AI Engineering', href: '/cohorts/ai-engineering', description: 'Build production-grade AI systems' },
    { name: 'AWS Cloud', href: '/cohorts/aws-cloud', description: 'Master cloud architecture at scale' },
    { name: 'AI Deployment', href: '/cohorts/ai-deployment', description: 'Ship AI to production with confidence' },
  ],
  main: [
    { name: 'Cohorts', href: '/cohorts' },
    { name: 'Compare', href: '/compare' },
    { name: 'About', href: '/about' },
  ],
  secondary: [
    { name: 'Workshops', href: '/workshops' },
    { name: 'Lens', href: '/lens' },
    { name: 'Blog', href: '/blog' },
  ],
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">p</span>
          </div>
          <span className="text-xl font-bold text-foreground">pTeachTech</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {/* Programs Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                Programs
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {navigation.programs.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link href={item.href} className="flex flex-col items-start gap-0.5 py-2">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navigation.main.map((item) => (
            <Button key={item.name} variant="ghost" asChild>
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}

          {navigation.secondary.map((item) => (
            <Button key={item.name} variant="ghost" asChild>
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/cohorts">Apply Now</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-sm">
            <SheetHeader>
              <SheetTitle>
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <span className="font-bold text-primary-foreground">p</span>
                  </div>
                  <span className="text-lg font-bold">pTeachTech</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 py-6">
              <div className="flex flex-col gap-1">
                <span className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Programs
                </span>
                {navigation.programs.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                <span className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Explore
                </span>
                {[...navigation.main, ...navigation.secondary].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-2 px-3">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/cohorts" onClick={() => setMobileMenuOpen(false)}>
                    Apply Now
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
