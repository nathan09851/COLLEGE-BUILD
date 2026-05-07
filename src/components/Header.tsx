'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, GraduationCap } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { cn } from '@/lib/utils'

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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Don't show the full nav on login/signup pages
  const isAuthPage = pathname === '/login' || pathname === '/signup'

  if (isAuthPage) return null

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 w-full",
        scrolled 
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container-custom flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white shadow-lg shadow-secondary/20 transition-transform group-hover:scale-110">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold tracking-tight text-slate-900 leading-none">
              Xavier <span className="italic text-secondary">College</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mt-0.5">ESTD. 1892</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-1 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-full hover:bg-slate-50",
                pathname === link.href || pathname.startsWith(link.href + '/')
                  ? "text-secondary bg-slate-50"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/apply" 
            className={cn(
              buttonVariants(),
              "hidden sm:inline-flex bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest text-[10px] h-10 px-6 rounded-full transition-transform active:scale-95 shadow-lg shadow-slate-200"
            )}
          >
            Apply Now
          </Link>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger 
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                "lg:hidden rounded-full hover:bg-slate-100"
              )} 
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-slate-600" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] border-l-0 p-0">
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
              </VisuallyHidden>
              <div className="flex flex-col h-full bg-white">
                <div className="p-8 border-b border-slate-50">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center text-white">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-serif font-bold tracking-tight text-slate-900">
                      Xavier <span className="italic text-secondary">College</span>
                    </span>
                  </Link>
                </div>
                <div className="flex-1 overflow-y-auto py-8 px-8">
                  <div className="flex flex-col space-y-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "py-4 text-2xl font-serif border-b border-slate-50 transition-colors",
                          pathname === link.href || pathname.startsWith(link.href + '/')
                            ? "text-secondary italic pl-2"
                            : "text-slate-900 hover:text-secondary"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="p-8 bg-slate-50">
                  <Link 
                    href="/apply" 
                    className={cn(
                      buttonVariants(),
                      "w-full bg-secondary hover:bg-secondary/90 text-white font-bold uppercase tracking-widest text-xs h-14"
                    )} 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start Your Application
                  </Link>
                  <p className="text-center text-[10px] text-slate-400 mt-6 uppercase tracking-widest font-medium">&copy; 2026 Xavier College</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
