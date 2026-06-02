'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import CarScrollAnimation from './ui/CarScrollAnimation'

const services = [
  {
    id: 'airport',
    titleKey: 'serviceAirportTitle' as const,
    descKey: 'serviceAirportDesc' as const,
  },
  {
    id: 'corporate',
    titleKey: 'serviceCorporateTitle' as const,
    descKey: 'serviceCorporateDesc' as const,
  },
  {
    id: 'group',
    titleKey: 'serviceGroupTitle' as const,
    descKey: 'serviceGroupDesc' as const,
  },
  {
    id: 'private',
    titleKey: 'servicePrivateTitle' as const,
    descKey: 'servicePrivateDesc' as const,
  },
]

export default function ServicesShowcase() {
  const t = useTranslations('Home')
  const [activeIdx, setActiveIdx] = useState(0)
  const [mobileOpen, setMobileOpen] = useState<number | null>(null)

  const active = services[activeIdx]

  function toggleMobile(i: number) {
    setMobileOpen(mobileOpen === i ? null : i)
  }

  return (
    <section id="services" className="relative bg-white">
      <CarScrollAnimation />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 tracking-tight">
            {t('servicesTitle')}
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            {t('servicesSubtitle')}
          </p>
        </div>

        {/* Desktop — split layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 items-start">
          {/* Left — navigation list */}
          <div className="lg:col-span-5 space-y-2">
            {services.map((svc, i) => {
              const isActive = i === activeIdx
              return (
                <div
                  key={svc.id}
                  onMouseEnter={() => setActiveIdx(i)}
                  className="group relative cursor-pointer py-5 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`block w-1 h-8 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-emerald-500 opacity-100' : 'bg-transparent opacity-0'
                      }`}
                    />
                    <h3
                      className={`text-2xl xl:text-3xl font-serif tracking-tight transition-all duration-300 ${
                        isActive
                          ? 'text-slate-900'
                          : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    >
                      {t(svc.titleKey)}
                    </h3>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right — detail panel */}
          <div className="lg:col-span-7" key={active.id}>
            <div className="animate-slide-up-fade">
              <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-8 md:p-10 shadow-sm">
                <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
                  {t(active.descKey)}
                </p>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group"
                >
                  {t('serviceBookLink')}
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile — accordion */}
        <div className="lg:hidden space-y-3">
          {services.map((svc, i) => {
            const isOpen = mobileOpen === i
            return (
              <div
                key={svc.id}
                className="rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleMobile(i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-slate-50/50 transition-colors"
                >
                  <h3 className="text-xl font-serif text-slate-900 tracking-tight">
                    {t(svc.titleKey)}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {t(svc.descKey)}
                    </p>
                    <Link
                      href="/book"
                      className="inline-flex items-center gap-2 text-sm text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                    >
                      {t('serviceBookLink')}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
