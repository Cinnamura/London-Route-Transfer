'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import ParallaxHero from './ui/ParallaxHero'

export default function HeroSection() {
  const t = useTranslations('Home')

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-white min-h-[600px] h-[80dvh] lg:h-[85dvh] flex items-center">
      <ParallaxHero />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-white/40 to-white" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 w-full">
        <div className="max-w-2xl md:max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-slate-900 tracking-tight leading-[1.1]">
            {t('heroTitle')}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed">
            {t('heroSubtitle')}
          </p>
          <p className="mt-4 text-base text-slate-500">
            {t('heroDescription')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-emerald-600 hover:scale-[1.02] transition-all duration-300"
            >
              {t('heroCta')}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            {t('heroNote')}
          </p>
        </div>
      </div>
    </section>
  )
}