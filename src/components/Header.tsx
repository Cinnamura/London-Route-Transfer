'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LocaleSwitcher from './LocaleSwitcher'

export default function Header() {
  const t = useTranslations('Header')
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/', label: t('navHome') },
    { href: '/#services', label: t('navServices') },
    { href: '/book', label: t('navBook') },
    { href: '/manager', label: t('navManager') },
  ]

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const close = () => setIsOpen(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-white/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link
              href="/"
              className="shrink-0 text-sm sm:text-base font-semibold tracking-tight text-slate-900 hover:text-sky-600 transition-colors"
            >
              <span className="hidden sm:inline">LONDON ROUTE TRANSFERS</span>
              <span className="sm:hidden">LRT</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <LocaleSwitcher />

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100/50 transition-colors ${
                  isOpen ? 'fixed top-3 right-4 z-[70]' : 'relative z-0'
                }`}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <span
                  className={`block h-0.5 w-5 bg-slate-900 rounded-full transition-all duration-300 ${
                    isOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-slate-900 rounded-full transition-all duration-300 mt-1 ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-slate-900 rounded-full transition-all duration-300 mt-1 ${
                    isOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={close}
      >
        <div
          className="relative min-h-dvh bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center px-6"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100/50 transition-colors"
            aria-label="Close menu"
          >
            <span className="absolute inset-0 m-auto w-5 h-0.5 bg-slate-900 rounded-full rotate-45" />
            <span className="absolute inset-0 m-auto w-5 h-0.5 bg-slate-900 rounded-full -rotate-45" />
          </button>

          <nav className="flex flex-col items-center gap-8 mb-12">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className={`font-serif text-3xl text-slate-900 font-medium hover:text-sky-600 transition-all duration-300 ${
                  isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: isOpen ? `${i * 80}ms` : '0ms' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div
            className={`transition-all duration-300 ${
              isOpen
                ? 'opacity-100 translate-y-0 delay-[320ms]'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </>
  )
}
