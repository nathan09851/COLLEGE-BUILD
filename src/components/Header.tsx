'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

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
    <nav className="sticky top-0 z-50 bg-white border-b border-primary/10" role="navigation" aria-label="Main navigation">
      <div className="container-custom flex justify-between items-center h-20">
        <Link href="/" className="text-xl font-serif font-semibold tracking-tight text-primary">
          Xavier <span className="italic">College</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`label-caps transition-opacity ${
                pathname === link.href || pathname.startsWith(link.href + '/')
                  ? 'text-secondary'
                  : 'text-primary hover:opacity-70'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/apply" className="hidden sm:inline-block btn-primary">
            Apply Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-primary hover:opacity-70 transition-opacity"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-primary/10 bg-white animate-fade-in">
          <div className="container-custom py-6 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`label-caps py-2 transition-opacity ${
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'text-secondary'
                    : 'text-primary hover:opacity-70'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/apply"
              className="btn-primary text-center sm:hidden"
              onClick={() => setMobileMenuOpen(false)}
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
