'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import type { BookingManagerItem, BookingStatus } from '@/mocks/bookings'
import StatusBadge from './StatusBadge'

const statusAccent: Record<BookingStatus, string> = {
  pending: 'border-l-amber-400',
  confirmed: 'border-l-sky-400',
  completed: 'border-l-emerald-400',
  cancelled: 'border-l-rose-400',
}

const serviceIcons: Record<string, string> = {
  airport_transfer: '\u2708\ufe0f',
  corporate: '\ud83c\udfe2',
  group: '\ud83d\udc65',
  private: '\ud83d\ude97',
}

export default function BookingCard({
  booking,
  serviceLabels,
  statusLabels,
  onView,
  onChangeStatus,
}: {
  booking: BookingManagerItem
  serviceLabels: Record<string, string>
  statusLabels: Record<BookingStatus, string>
  onView: (b: BookingManagerItem) => void
  onChangeStatus: (id: string, status: BookingStatus) => void
}) {
  const [showStatusMenu, setShowStatusMenu] = useState(false)
  const t = useTranslations('Manager')
  const locale = useLocale()

  const statusOptions: BookingStatus[] = ['pending', 'confirmed', 'completed', 'cancelled']

  function handleStatusChange(status: BookingStatus) {
    onChangeStatus(booking.id, status)
    setShowStatusMenu(false)
  }

  return (
    <div
      className={`relative bg-white rounded-xl border border-slate-100 border-l-4 ${statusAccent[booking.status]} shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col gap-3`}
    >
      {/* Header: name + id */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-slate-900 truncate">
            {booking.fullName}
          </h3>
          {booking.company && (
            <p className="text-xs text-slate-400 truncate">{booking.company}</p>
          )}
        </div>
        <span className="shrink-0 font-mono text-[11px] text-slate-400">
          {booking.id}
        </span>
      </div>

      {/* Info rows */}
      <div className="space-y-1.5 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <span className="shrink-0 w-5 text-center text-xs">
            {serviceIcons[booking.serviceType] || '\ud83d\udccb'}
          </span>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {serviceLabels[booking.serviceType] || booking.serviceType}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="shrink-0 w-5 text-center text-xs">{'\ud83d\udcc5'}</span>
          <span>
            {new Date(booking.pickupDate).toLocaleDateString(locale, {
              day: 'numeric',
              month: 'short',
            })}{' '}
            &middot; {booking.pickupTime}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="shrink-0 w-5 text-center text-xs">{'\ud83d\udccd'}</span>
          <span className="truncate text-xs text-slate-500" title={`${booking.pickupAddress} \u2192 ${booking.destinationAddress}`}>
            {booking.pickupAddress} &rarr; {booking.destinationAddress}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="shrink-0 w-5 text-center text-xs">{'\ud83d\udc65'}</span>
          <span>
            {booking.passengersCount} {t('detailPassengers')}
          </span>
        </div>
      </div>

      {/* Footer: status + actions */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-50">
        <StatusBadge status={booking.status} labels={statusLabels} />

        <div className="flex items-center gap-1">
          <button
            onClick={() => onView(booking)}
            className="text-xs font-medium text-sky-600 hover:text-sky-700 px-2.5 py-1 rounded-md hover:bg-sky-50 transition-colors"
          >
            {t('cardDetails')}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="text-xs font-medium text-slate-500 hover:text-slate-700 px-2.5 py-1 rounded-md hover:bg-slate-50 transition-colors"
            >
              {t('cardStatus')}
            </button>

            {showStatusMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowStatusMenu(false)}
                />
                <div className="absolute right-0 top-full mt-1 z-20 bg-white rounded-lg border border-slate-100 shadow-lg py-1 min-w-[130px]">
                  {statusOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      className={`block w-full text-left px-3 py-1.5 text-xs transition-colors ${
                        s === booking.status
                          ? 'text-slate-400 font-semibold bg-slate-50'
                          : 'text-slate-700 hover:bg-sky-50 hover:text-sky-700'
                      }`}
                    >
                      {statusLabels[s]}
                      {s === booking.status && (
                        <span className="float-right">{'\u2713'}</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
