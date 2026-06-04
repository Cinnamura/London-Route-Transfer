import { Module } from '@nestjs/common'
import { BookingsController } from './bookings.controller'
import { BookingsService } from './bookings.service'
import { StorageService } from '../storage/storage.service'

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, StorageService],
})
export class BookingsModule {}
