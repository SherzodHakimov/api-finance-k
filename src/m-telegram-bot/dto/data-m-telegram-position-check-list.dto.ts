import { ApiProperty } from '@nestjs/swagger';

export class DataMTelegramBotPositionCheckList {
  @ApiProperty({
    example: 1,
  })
  id: number

  @ApiProperty({
    example: 'Опрятный внешний вид',
  })
  name: string
}