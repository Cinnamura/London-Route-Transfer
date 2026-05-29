import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import LocaleSwitcher from './LocaleSwitcher'

export default async function Header() {
  const t = await getTranslations('Header')

  const navLinks = [
    { href: '/', label: t('navHome') },
    { href: '/#services', label: t('navServices') },
    { href: '/book', label: t('navBook') },
    { href: '/manager', label: t('navManager') },
  ] as const

  return (
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

          <nav className="hidden md:flex items-center gap-6">
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
          </div>
        </div>
      </div>
    </header>
  )
}
