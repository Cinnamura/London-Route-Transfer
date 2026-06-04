'use client'

import { useEffect, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import type { BookingManagerItem, BookingStatus } from '@/mocks/bookings'
import StatusBadge from './StatusBadge'

const serviceIcons: Record<string, string> = {
  airport_transfer: '\u2708\ufe0f',
  corporate: '\ud83c\udfe2',
  group: '\ud83d\udc65',
  private: '\ud83d\ude97',
}

export default function BookingDetailModal({
  booking,
  serviceLabels,
  statusLabels,
  onClose,
  onChangeStatus,
}: {
  booking: BookingManagerItem
  serviceLabels: Record<string, string>
  statusLabels: Record<BookingStatus, string>
  onClose: () => void
  onChangeStatus: (id: string, status: BookingStatus) => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('Manager')
  const locale = useLocale()

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  function formatDate(iso: string) {
    const d = new Date(iso)
    return d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-slate-900 truncate">
              {booking.fullName}
            </h2>
            <p className="text-xs text-slate-400 font-mono">{booking.id}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4">
            <StatusBadge status={booking.status} labels={statusLabels} />
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 5l10 10M15 5l-10 10" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Client info */}
          <section>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{t('detailClient')}</h3>
            <div className="space-y-1.5 text-sm">
              {booking.company && (
                <p className="text-slate-500">{booking.company}</p>
              )}
              <p className="text-slate-700">{booking.phone}</p>
              <p className="text-slate-700 break-all">{booking.email}</p>
            </div>
          </section>

          {/* Trip info */}
          <section>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{t('detailTrip')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-700">
                <span className="shrink-0 w-5 text-center">
                  {serviceIcons[booking.serviceType] || '\ud83d\udccb'}
                </span>
                <span className="font-medium">
                  {serviceLabels[booking.serviceType] || booking.serviceType}
                </span>
              </div>
              <div className="flex gap-2 text-slate-600">
                <span className="shrink-0 w-5 text-center text-xs">{'\ud83d\udccd'}</span>
                <div className="space-y-0.5 min-w-0">
                  <p className="truncate">{booking.pickupAddress}</p>
                  <p className="text-slate-400 text-xs">&rarr;</p>
                  <p className="truncate">{booking.destinationAddress}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className="shrink-0 w-5 text-center">{'\ud83d\udcc5'}</span>
                <span>
                  {new Date(booking.pickupDate).toLocaleDateString(locale, {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}{' '}
                  {t('detailAt')} {booking.pickupTime}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className="shrink-0 w-5 text-center">{'\ud83d\udc65'}</span>
                <span>{booking.passengersCount} {t('detailPassengers')}</span>
              </div>
              {booking.flightNumber && (
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="shrink-0 w-5 text-center">{'\u2708\ufe0f'}</span>
                  <span>{t('detailFlight')} {booking.flightNumber}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-600">
                <span className="shrink-0 w-5 text-center">{'\ud83d\udeb6'}</span>
                <span>{t('detailMeetGreet')}: {booking.meetAndGreet ? t('detailYes') : t('detailNo')}</span>
              </div>
            </div>
          </section>

          {/* Notes */}
          {booking.additionalInfo && (
            <section>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{t('detailNotes')}</h3>
              <p className="text-sm text-slate-600 bg-slate-50 rounded-lg px-3 py-2">
                {booking.additionalInfo}
              </p>
            </section>
          )}

          {/* Status change */}
          <section>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{t('detailActions')}</h3>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">{t('cardStatus')}:</span>
              <select
                value={booking.status}
                onChange={(e) => onChangeStatus(booking.id, e.target.value as BookingStatus)}
                className="text-sm rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-200 cursor-pointer"
              >
                <option value="pending">{statusLabels.pending}</option>
                <option value="confirmed">{statusLabels.confirmed}</option>
                <option value="completed">{statusLabels.completed}</option>
                <option value="cancelled">{statusLabels.cancelled}</option>
              </select>
            </div>
          </section>

          {/* Created at */}
          <p className="text-xs text-slate-400">
            {t('detailCreated')}: {formatDate(booking.createdAt)}
          </p>
        </div>
      </div>
    </div>
  )
}
