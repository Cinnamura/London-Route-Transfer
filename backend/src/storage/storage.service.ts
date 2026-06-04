import { Injectable, OnModuleInit } from '@nestjs/common'
import * as fs from 'node:fs'
import * as path from 'node:path'

const DATA_DIR = path.resolve(__dirname, '../../data')
const DATA_FILE = path.join(DATA_DIR, 'bookings.json')

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export interface BookingRecord {
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
  createdAt: string
  status: BookingStatus
}

@Injectable()
export class StorageService implements OnModuleInit {
  private records: BookingRecord[] = []

  onModuleInit() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8')
      try {
        this.records = JSON.parse(raw)
      } catch {
        this.records = []
      }
    } else {
      this.flush()
    }
  }

  private flush() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(this.records, null, 2), 'utf-8')
  }

  findAll(): BookingRecord[] {
    return this.records
  }

  findById(id: string): BookingRecord | undefined {
    return this.records.find((r) => r.id === id)
  }

  create(record: BookingRecord): BookingRecord {
    this.records.push(record)
    this.flush()
    return record
  }

  updateStatus(id: string, status: BookingStatus): BookingRecord | undefined {
    const idx = this.records.findIndex((r) => r.id === id)
    if (idx === -1) return undefined
    this.records[idx] = { ...this.records[idx], status }
    this.flush()
    return this.records[idx]
  }
}
