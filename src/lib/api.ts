const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

import type { BookingManagerItem, BookingStatus } from '@/types/booking'

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    let message = res.statusText
    try {
      const body = await res.json()
      if (Array.isArray(body.message)) {
        message = body.message.join('; ')
      } else if (typeof body.message === 'string') {
        message = body.message
      }
    } catch {
      // keep default statusText
    }
    throw new ApiError(res.status, message)
  }

  return res.json()
}

export function createBooking(data: Omit<BookingManagerItem, 'id' | 'createdAt' | 'status'>) {
  return request<BookingManagerItem>('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function getBookings(status?: BookingStatus) {
  const query = status ? `?status=${status}` : ''
  return request<BookingManagerItem[]>(`/api/bookings${query}`)
}

export function getBooking(id: string) {
  return request<BookingManagerItem>(`/api/bookings/${id}`)
}

export function updateBookingStatus(id: string, status: BookingStatus) {
  return request<BookingManagerItem>(`/api/bookings/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}
