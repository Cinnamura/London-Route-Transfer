'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useTransition } from 'react'

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
] as const

export default function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function switchLocale(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <div className="flex items-center gap-1 rounded-full bg-white/70 backdrop-blur-md border border-white/40 p-0.5 shadow-sm">
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => switchLocale(l.code)}
          disabled={l.code === locale || isPending}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
            l.code === locale
              ? 'bg-sky-500 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
          } disabled:cursor-not-allowed`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
