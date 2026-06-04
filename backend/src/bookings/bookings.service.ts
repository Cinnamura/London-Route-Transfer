import { Injectable, NotFoundException } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { StorageService, type BookingRecord, type BookingStatus } from '../storage/storage.service'
import { CreateBookingDto } from './dto/create-booking.dto'
import { UpdateStatusDto } from './dto/update-status.dto'

@Injectable()
export class BookingsService {
  constructor(private readonly storage: StorageService) {}

  findAll(status?: BookingStatus): BookingRecord[] {
    const all = this.storage.findAll()
    if (status) {
      return all.filter((r) => r.status === status)
    }
    return all
  }

  findOne(id: string): BookingRecord {
    const record = this.storage.findById(id)
    if (!record) throw new NotFoundException(`Booking ${id} not found`)
    return record
  }

  create(dto: CreateBookingDto): BookingRecord {
    const record: BookingRecord = {
      id: uuid(),
      ...dto,
      createdAt: new Date().toISOString(),
      status: 'pending',
    }
    return this.storage.create(record)
  }

  updateStatus(id: string, dto: UpdateStatusDto): BookingRecord {
    const record = this.storage.updateStatus(id, dto.status as BookingStatus)
    if (!record) throw new NotFoundException(`Booking ${id} not found`)
    return record
  }
}
