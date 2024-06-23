import { ApiProperty } from '@nestjs/swagger';

export class DataMTelegramBotBase64Dto {
  @ApiProperty({
    example: 'v6U7oV0S/tO/sF/tf/tU/s8/HnTfCvwXvP'

  })
  file: string

  @ApiProperty({
    example: 'jpg'

  })
  ext: string
}