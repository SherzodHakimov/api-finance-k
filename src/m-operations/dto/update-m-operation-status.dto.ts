import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMOperationStatusDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  status_id: number;
}