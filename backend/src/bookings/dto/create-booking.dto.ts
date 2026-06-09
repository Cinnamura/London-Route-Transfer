import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean, IsIn, IsNumber, Min } from 'class-validator'

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  fullName: string

  @IsOptional()
  @IsString()
  company?: string

  @IsString()
  @IsNotEmpty()
  phone: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @IsIn(['airport_transfer', 'corporate', 'group', 'private'])
  serviceType: string

  @IsString()
  @IsNotEmpty()
  pickupAddress: string

  @IsString()
  @IsNotEmpty()
  destinationAddress: string

  @IsString()
  @IsNotEmpty()
  pickupDate: string

  @IsString()
  @IsNotEmpty()
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
