import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function Footer() {
  const t = await getTranslations('Footer')

  return (
    <footer className="border-t border-slate-100 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              {t('companyName')}
            </h3>
            <ul className="space-y-1.5 text-sm text-slate-600">
              <li>{t('legalForm')}</li>
              <li>{t('companyNumber')}</li>
              <li>{t('registeredOffice')}</li>
              <li>{t('vatNumber')}</li>
            </ul>
            <p className="mt-4 text-xs text-slate-400 leading-relaxed">
              {t('legalInfo')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              {t('policies')}
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/privacy', label: t('privacyPolicy') },
                { href: '/cookies', label: t('cookiePolicy') },
                { href: '/terms', label: t('termsOfUse') },
                { href: '/services-terms', label: t('servicesTerms') },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 hover:text-sky-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              {t('contact')}
            </h3>
            <ul className="space-y-1.5 text-sm text-slate-600">
              <li>
                Email:{' '}
                <a
                  href="mailto:booking@example.test"
                  className="text-sky-600 hover:text-sky-700 transition-colors"
                >
                  booking@example.test
                </a>
              </li>
              <li>
                Tel:{' '}
                <a
                  href="tel:+440000000000"
                  className="text-sky-600 hover:text-sky-700 transition-colors"
                >
                  +44 0000 000000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100">
          <p className="text-xs text-slate-400 text-center">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
