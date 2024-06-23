import { ApiProperty } from '@nestjs/swagger';

export class DataMTelegramBotBillDto {
  @ApiProperty({
    example: 1,
  })
  id: number

  @ApiProperty({
    example: 1,
  })
  user_id: number

  @ApiProperty({
    example: 'Tester Staff'

  })
  name: string;

  @ApiProperty({
    example: 'Горничная',
  })
  position: string

  @ApiProperty({
    example: 'file.jpg',
  })
  file: string

  @ApiProperty({
    example: 1,
  })
  amount: number

  @ApiProperty({
    example: 'Комментарии',
  })
  comment: string

  @ApiProperty({
    example: 0,
  })
  confirmed: number


  @ApiProperty({
    example: new Date().toISOString(),
  })
  created_at: Date;

}