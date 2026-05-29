'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { mockBookings, type BookingStatus } from '@/mocks/bookings'

const statusFilters: { key: BookingStatus | 'all'; labelKey: 'filterAll' | 'filterPending' | 'filterConfirmed' | 'filterCompleted' | 'filterCancelled' }[] = [
  { key: 'all', labelKey: 'filterAll' },
  { key: 'pending', labelKey: 'filterPending' },
  { key: 'confirmed', labelKey: 'filterConfirmed' },
  { key: 'completed', labelKey: 'filterCompleted' },
  { key: 'cancelled', labelKey: 'filterCancelled' },
]

const statusColors: Record<BookingStatus, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  confirmed: 'bg-sky-100 text-sky-700 border-sky-200',
  completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  cancelled: 'bg-rose-100 text-rose-700 border-rose-200',
}

export default function ManagerPage() {
  const t = useTranslations('Manager')
  const [bookings, setBookings] = useState(mockBookings)
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all')

  const filtered = filter === 'all'
    ? bookings
    : bookings.filter((b) => b.status === filter)

  function changeStatus(id: string, status: BookingStatus) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    )
  }

  const serviceLabels: Record<string, string> = {
    airport_transfer: t('serviceAirport'),
    corporate: t('serviceCorporate'),
    group: t('serviceGroup'),
    private: t('servicePrivate'),
  }

  const statusLabels: Record<BookingStatus, string> = {
    pending: t('statusPending'),
    confirmed: t('statusConfirmed'),
    completed: t('statusCompleted'),
    cancelled: t('statusCancelled'),
  }

  return (
    <section className="bg-gradient-to-b from-sky-100 via-sky-50 to-white min-h-dvh">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 tracking-tight">
            {t('title')}
          </h1>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {statusFilters.map((f) => {
            const active = f.key === filter
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-white/70 text-slate-600 hover:bg-sky-50 hover:text-sky-700'
                }`}
              >
                {t(f.labelKey)}
              </button>
            )
          })}
        </div>

        {/* Bookings table */}
        {filtered.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-12 text-center shadow-sm">
            <p className="text-slate-500">{t('noBookings')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-5 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">{t('tableId')}</th>
                  <th className="text-left px-5 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">{t('tableClient')}</th>
                  <th className="text-left px-5 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">{t('tablePhone')}</th>
                  <th className="text-left px-5 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">{t('tableEmail')}</th>
                  <th className="text-left px-5 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">{t('tableService')}</th>
                  <th className="text-left px-5 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">{t('tableRoute')}</th>
                  <th className="text-left px-5 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">{t('tableDate')}</th>
                  <th className="text-center px-5 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">{t('tablePassengers')}</th>
                  <th className="text-center px-5 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">{t('tableStatus')}</th>
                  <th className="text-left px-5 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">{t('tableActions')}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="border-b border-slate-50 last:border-0 hover:bg-sky-50/30 transition-colors">
                    <td className="px-5 py-4 font-mono text-xs text-slate-500">{b.id}</td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-900">{b.fullName}</div>
                      {b.company && (
                        <div className="text-xs text-slate-400">{b.company}</div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{b.phone}</td>
                    <td className="px-5 py-4 text-slate-600">{b.email}</td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                        {serviceLabels[b.serviceType] || b.serviceType}
                      </span>
                    </td>
                    <td className="px-5 py-4 max-w-[180px]">
                      <div className="text-xs text-slate-600 truncate" title={`${b.pickupAddress} → ${b.destinationAddress}`}>
                        {b.pickupAddress} → {b.destinationAddress}
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-slate-600">
                      <div className="text-xs">{b.pickupDate}</div>
                      <div className="text-xs text-slate-400">{b.pickupTime}</div>
                    </td>
                    <td className="px-5 py-4 text-center text-slate-600">{b.passengersCount}</td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border transition-all duration-300 ${statusColors[b.status]}`}>
                        {statusLabels[b.status]}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={b.status}
                        onChange={(e) => changeStatus(b.id, e.target.value as BookingStatus)}
                        className="text-xs rounded-lg bg-slate-50 border border-slate-100 px-2 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-200 cursor-pointer"
                      >
                        <option value="pending">{t('statusPending')}</option>
                        <option value="confirmed">{t('statusConfirmed')}</option>
                        <option value="completed">{t('statusCompleted')}</option>
                        <option value="cancelled">{t('statusCancelled')}</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 text-xs text-slate-400">
          {t('createdLabel')}: {bookings.length} {t('tableId').toLowerCase()}
        </div>
      </div>
    </section>
  )
}
