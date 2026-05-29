import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Stub' })

  return {
    title: t('servicesTermsTitle'),
    description: t('servicesTermsDescription'),
  }
}

export default async function ServicesTermsPage() {
  const t = await getTranslations('Stub')

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-4xl font-serif text-slate-900 tracking-tight">
        {t('servicesTermsTitle')}
      </h1>
      <p className="mt-4 text-lg text-slate-600">{t('pageUnderConstruction')}</p>
    </section>
  )
}
