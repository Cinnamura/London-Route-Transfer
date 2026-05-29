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

let counter = 9400

function nextId(): string {
  counter++
  return `#LTR-${counter}`
}

export const mockBookings: BookingManagerItem[] = [
  {
    id: nextId(),
    fullName: 'James Mitchell',
    company: 'Mitchell & Co Ltd',
    phone: '+44 7700 123456',
    email: 'j.mitchell@mitchellco.test',
    serviceType: 'airport_transfer',
    pickupAddress: '15 Park Lane, London, W1K 1AA',
    destinationAddress: 'Heathrow Airport, Terminal 5',
    pickupDate: '2026-06-15',
    pickupTime: '09:30',
    passengersCount: 2,
    meetAndGreet: true,
    flightNumber: 'BA178',
    additionalInfo: 'Two large suitcases, need assistance at arrivals',
    createdAt: '2026-05-28T14:23:00Z',
    status: 'confirmed',
  },
  {
    id: nextId(),
    fullName: 'Sarah Chen',
    company: 'Vanguard Technologies',
    phone: '+44 7800 987654',
    email: 's.chen@vanguardtech.test',
    serviceType: 'corporate',
    pickupAddress: 'Vanguard HQ, 200 Bishopsgate, London, EC2M 4AL',
    destinationAddress: 'Gatwick Airport, North Terminal',
    pickupDate: '2026-06-20',
    pickupTime: '16:00',
    passengersCount: 1,
    meetAndGreet: false,
    flightNumber: 'VS101',
    createdAt: '2026-05-29T09:15:00Z',
    status: 'pending',
  },
  {
    id: nextId(),
    fullName: 'Robert Okafor',
    phone: '+44 7400 554433',
    email: 'roberto@example.test',
    serviceType: 'group',
    pickupAddress: 'St Paul\'s Cathedral, London, EC4M 8AD',
    destinationAddress: 'Natural History Museum, Cromwell Road, London, SW7 5BD',
    pickupDate: '2026-06-10',
    pickupTime: '10:00',
    passengersCount: 12,
    meetAndGreet: false,
    additionalInfo: 'School group of 12 students + 2 teachers (total 14 pax). Please send a minibus.',
    createdAt: '2026-05-25T11:00:00Z',
    status: 'completed',
  },
  {
    id: nextId(),
    fullName: 'Elena Voronova',
    company: 'Luxury Events Ltd',
    phone: '+44 7900 332211',
    email: 'elena@luxuryevents.test',
    serviceType: 'private',
    pickupAddress: 'The Ritz London, 150 Piccadilly, London, W1J 9BR',
    destinationAddress: 'Kew Gardens, Richmond, TW9 3AE',
    pickupDate: '2026-06-28',
    pickupTime: '14:00',
    passengersCount: 4,
    meetAndGreet: false,
    additionalInfo: 'Wedding guests transport. Please provide executive vehicle.',
    createdAt: '2026-05-27T16:45:00Z',
    status: 'pending',
  },
  {
    id: nextId(),
    fullName: 'David Thompson',
    phone: '+44 7500 887766',
    email: 'd.thompson@example.test',
    serviceType: 'airport_transfer',
    pickupAddress: 'Luton Airport, Terminal 1',
    destinationAddress: '123 Camden High Street, London, NW1 7JR',
    pickupDate: '2026-06-05',
    pickupTime: '22:15',
    passengersCount: 1,
    meetAndGreet: true,
    flightNumber: 'EZ212',
    additionalInfo: 'Late arrival, flight from Edinburgh',
    createdAt: '2026-05-20T08:30:00Z',
    status: 'cancelled',
  },
]
