'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

const navLinks = [
  { href: '/departments', label: 'Academics' },
  { href: '/faculty', label: 'Faculty' },
  { href: '/notices', label: 'Notices' },
  { href: '/academic-calendar', label: 'Calendar' },
  { href: '/apply', label: 'Admissions' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Don't show the full nav on login/signup pages
  const isAuthPage = pathname === '/login' || pathname === '/signup'

  if (isAuthPage) return null

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border" role="navigation" aria-label="Main navigation">
      <div className="container-custom flex justify-between items-center h-20">
        <Link href="/" className="text-xl font-serif font-semibold tracking-tight text-primary">
          Xavier <span className="italic">College</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href || pathname.startsWith(link.href + '/')
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/apply" className={`${buttonVariants()} hidden sm:inline-flex`}>
            Apply Now
          </Link>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger className={`${buttonVariants({ variant: 'ghost', size: 'icon' })} lg:hidden`} aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
              </VisuallyHidden>
              <div className="flex flex-col space-y-6 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      pathname === link.href || pathname.startsWith(link.href + '/')
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/apply" className={`${buttonVariants()} w-full mt-4`} onClick={() => setMobileMenuOpen(false)}>
                  Apply Now
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
