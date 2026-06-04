export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export type BookingManagerItem = {
  id: string
  fullName: string
  company?: string
  phone: string
  email: string
  serviceType: string
  pickupAddress: string
  destinationAddress: string
  pickupDate: string
  pickupTime: string
  passengersCount: number
  meetAndGreet: boolean
  additionalInfo?: string
  flightNumber?: string
  createdAt: string
  status: BookingStatus
}
