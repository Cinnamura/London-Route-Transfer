'use client'

import type { BookingStatus } from '@/types/booking'

const statusColors: Record<BookingStatus, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  confirmed: 'bg-sky-100 text-sky-700 border-sky-200',
  completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  cancelled: 'bg-rose-100 text-rose-700 border-rose-200',
}

export default function StatusBadge({
  status,
  labels,
}: {
  status: BookingStatus
  labels: Record<BookingStatus, string>
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[status]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === 'pending'
            ? 'bg-amber-500'
            : status === 'confirmed'
              ? 'bg-sky-500'
              : status === 'completed'
                ? 'bg-emerald-500'
                : 'bg-rose-500'
        }`}
      />
      {labels[status]}
    </span>
  )
}
