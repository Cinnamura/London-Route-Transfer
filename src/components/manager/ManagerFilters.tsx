'use client'

import { useTranslations } from 'next-intl'
import type { BookingStatus } from '@/mocks/bookings'

type FilterKey = BookingStatus | 'all'

const filters: { key: FilterKey; labelKey: 'filterAll' | 'filterPending' | 'filterConfirmed' | 'filterCompleted' | 'filterCancelled' }[] = [
  { key: 'all', labelKey: 'filterAll' },
  { key: 'pending', labelKey: 'filterPending' },
  { key: 'confirmed', labelKey: 'filterConfirmed' },
  { key: 'completed', labelKey: 'filterCompleted' },
  { key: 'cancelled', labelKey: 'filterCancelled' },
]

export default function ManagerFilters({
  current,
  onChange,
}: {
  current: FilterKey
  onChange: (key: FilterKey) => void
}) {
  const t = useTranslations('Manager')

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => {
        const active = f.key === current
        return (
          <button
            key={f.key}
            onClick={() => onChange(f.key)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
              active
                ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-200'
                : 'bg-white/70 text-slate-600 hover:bg-sky-50 hover:text-sky-700 border border-slate-100'
            }`}
          >
            {t(f.labelKey)}
          </button>
        )
      })}
    </div>
  )
}
