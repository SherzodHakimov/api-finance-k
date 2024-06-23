import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DataMTelegramBotFileDto {
  @IsString()
  @ApiProperty({
    example: 'file.jpg',
  })
  file: string;
}