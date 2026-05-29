import { getTranslations } from 'next-intl/server'

export default async function HomePage() {
  const t = await getTranslations('Metadata')

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-slate-900 tracking-tight">
        LONDON ROUTE TRANSFERS
      </h1>
      <p className="mt-6 text-lg text-slate-600 max-w-2xl">
        {t('description')}
      </p>
    </section>
  )
}
