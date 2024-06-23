import { ApiProperty } from '@nestjs/swagger';

export class DataMTelegramBotSanaDto {
  @ApiProperty({
    example: '01.01.2024',
  })
  sana: string
}