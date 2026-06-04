import { IsString, IsEmail, IsOptional, IsBoolean, IsIn, IsNumber, Min } from 'class-validator'

export class CreateBookingDto {
  @IsString()
  fullName: string

  @IsOptional()
  @IsString()
  company?: string

  @IsString()
  phone: string

  @IsEmail()
  email: string

  @IsString()
  @IsIn(['airport_transfer', 'corporate', 'group', 'private'])
  serviceType: string

  @IsString()
  pickupAddress: string

  @IsString()
  destinationAddress: string

  @IsString()
  pickupDate: string

  @IsString()
  pickupTime: string

  @IsNumber()
  @Min(1)
  passengersCount: number

  @IsBoolean()
  meetAndGreet: boolean

  @IsOptional()
  @IsString()
  additionalInfo?: string
}
