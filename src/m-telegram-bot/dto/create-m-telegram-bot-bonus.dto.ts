import { IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMTelegramBotBonusDtoDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  user_id: number;
}