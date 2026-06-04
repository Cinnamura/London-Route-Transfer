'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { mockBookings, type BookingStatus, type BookingManagerItem } from '@/mocks/bookings'
import BookingCard from '@/components/manager/BookingCard'
import BookingDetailModal from '@/components/manager/BookingDetailModal'
import ManagerFilters from '@/components/manager/ManagerFilters'

export default function ManagerPage() {
  const t = useTranslations('Manager')
  const [bookings, setBookings] = useState(mockBookings)
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all')
  const [selectedBooking, setSelectedBooking] = useState<BookingManagerItem | null>(null)

  const filtered = filter === 'all'
    ? bookings
    : bookings.filter((b) => b.status === filter)

  const statusCounts = {
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  }

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
        {/* Header */}
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 tracking-tight">
              {t('title')}
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              {t('summary', { count: filtered.length, total: bookings.length })}
              {statusCounts.pending > 0 && (
                <span> &middot; {t('summaryPending', { count: statusCounts.pending })}</span>
              )}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ManagerFilters
            current={filter}
            onChange={setFilter}
          />
        </div>

        {/* Cards grid */}
        {filtered.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-12 text-center shadow-sm">
            <p className="text-slate-500">{t('noBookings')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
            {filtered.map((b) => (
              <BookingCard
                key={b.id}
                booking={b}
                serviceLabels={serviceLabels}
                statusLabels={statusLabels}
                onView={setSelectedBooking}
                onChangeStatus={changeStatus}
              />
            ))}
          </div>
        )}

        {/* Footer summary */}
        <div className="mt-6 text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
          <span>{t('createdLabel')}: {bookings.length}</span>
          {statusCounts.pending > 0 && (
            <span className="text-amber-600">{statusCounts.pending} {t('filterPending').toLowerCase()}</span>
          )}
          {statusCounts.confirmed > 0 && (
            <span className="text-sky-600">{statusCounts.confirmed} {t('filterConfirmed').toLowerCase()}</span>
          )}
          {statusCounts.completed > 0 && (
            <span className="text-emerald-600">{statusCounts.completed} {t('filterCompleted').toLowerCase()}</span>
          )}
          {statusCounts.cancelled > 0 && (
            <span className="text-rose-600">{statusCounts.cancelled} {t('filterCancelled').toLowerCase()}</span>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          serviceLabels={serviceLabels}
          statusLabels={statusLabels}
          onClose={() => setSelectedBooking(null)}
          onChangeStatus={changeStatus}
        />
      )}
    </section>
  )
}
