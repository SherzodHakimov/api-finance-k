import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMTelegramBotUserStatusDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: '1-Актив; 2-Неактив'
  })
  status_id: number;
}