import { IsString, IsIn } from 'class-validator'

export class UpdateStatusDto {
  @IsString()
  @IsIn(['pending', 'confirmed', 'completed', 'cancelled'])
  status: string
}
