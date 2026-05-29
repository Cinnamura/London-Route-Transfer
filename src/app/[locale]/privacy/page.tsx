import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Privacy' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function PrivacyPage() {
  const t = await getTranslations('Privacy')
  const sections = t.raw('sections') as { h: string; p?: string; items?: string[] }[]

  return (
    <section className="bg-gradient-to-b from-sky-100 via-sky-50 to-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 tracking-tight mb-12">
          {t('title')}
        </h1>

        <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-8 md:p-12 shadow-sm space-y-10">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-xl font-serif text-slate-900 mb-3">
                {section.h}
              </h2>
              {section.p && (
                <p className="text-sm text-slate-600 leading-relaxed">
                  {section.p}
                </p>
              )}
              {section.items && section.items.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {section.items.map((item, j) => (
                    <li key={j} className="text-sm text-slate-600 leading-relaxed pl-5 relative before:absolute before:left-0 before:top-0 before:content-['–']">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
