import { ApiProperty } from '@nestjs/swagger';

export class DataMTelegramBotAvgDto {
  @ApiProperty({
    example: 1,
  })
  user_id: number

  @ApiProperty({
    example: 'Hakimov Sherzod',
  })
  name: string

  @ApiProperty({
    example: 'Горничная',
  })
  position: string

  @ApiProperty({
    example: 1,
  })
  avg: number

  @ApiProperty({
    example: 1,
  })
  sum: number

  @ApiProperty({
    example: 1,
  })
  count: number
}