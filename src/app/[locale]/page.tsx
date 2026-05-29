import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import ServicesShowcase from '@/components/ServicesShowcase'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function HomePage() {
  const t = await getTranslations('Home')

  const advantages = t.raw('advantagesItems') as string[]
  const clientsItems = t.raw('benefitsClientsItems') as string[]
  const whyItems = t.raw('benefitsWhyItems') as string[]

  return (
    <>
      {/* Block 1 — Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
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

      {/* Block 2 — About */}
      <section className="bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 tracking-tight">
              {t('aboutTitle')}
            </h2>
            <p className="mt-4 text-lg text-sky-600 font-medium">
              {t('aboutSubtitle')}
            </p>
            <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
              {t('aboutText')}
            </p>
          </div>
        </div>
      </section>

      {/* Block 3 — Services (Editorial Split Showcase) */}
      <ServicesShowcase />

      {/* Block 4 — Benefits */}
      <section className="bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 tracking-tight">
              {t('benefitsTitle')}
            </h2>
            <p className="mt-4 text-lg text-sky-600 font-medium">
              {t('benefitsSubtitle')}
            </p>
            <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
              {t('benefitsText')}
            </p>
            <p className="mt-4 text-base text-slate-500 italic">
              {t('benefitsNoUniversal')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                {t('benefitsClientsHeading')}
              </h3>
              <ul className="space-y-4">
                {clientsItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xs font-bold">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                {t('benefitsWhyHeading')}
              </h3>
              <ul className="space-y-4">
                {whyItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
