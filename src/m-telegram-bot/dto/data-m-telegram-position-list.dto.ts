import { ApiProperty } from '@nestjs/swagger';

export class DataMTelegramBotPositionList {
  @ApiProperty({
    example: 1,
  })
  id: number

  @ApiProperty({
    example: 'Водитель',
  })
  name: string
}