import { ApiProperty } from '@nestjs/swagger';

export class DataMTelegramBotSanaIdDto {

  @ApiProperty({
    example: 1,
  })
  user_id: number

  @ApiProperty({
    example: '01.01.2024',
  })
  sana: string

}