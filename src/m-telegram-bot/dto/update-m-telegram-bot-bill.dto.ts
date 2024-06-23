import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMTelegramBotBillDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  confirmed: number;
}