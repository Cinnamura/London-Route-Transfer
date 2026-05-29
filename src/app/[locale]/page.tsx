import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

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

  const services = [
    {
      icon: (
        <svg className="w-10 h-10 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
        </svg>
      ),
      title: t('serviceAirportTitle'),
      description: t('serviceAirportDesc'),
    },
    {
      icon: (
        <svg className="w-10 h-10 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      ),
      title: t('serviceCorporateTitle'),
      description: t('serviceCorporateDesc'),
    },
    {
      icon: (
        <svg className="w-10 h-10 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      ),
      title: t('serviceGroupTitle'),
      description: t('serviceGroupDesc'),
    },
    {
      icon: (
        <svg className="w-10 h-10 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.25 5.25 0 0 0-1.085 4.57" />
        </svg>
      ),
      title: t('servicePrivateTitle'),
      description: t('servicePrivateDesc'),
    },
  ] as const

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

      {/* Block 3 — Services */}
      <section id="services" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 tracking-tight">
              {t('servicesTitle')}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {t('servicesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-100/40 transition-all duration-300"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">
              {t('advantagesHeading')}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {advantages.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                  <svg className="w-5 h-5 mt-0.5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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
