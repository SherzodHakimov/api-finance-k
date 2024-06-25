import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMTelegramBotUserPhoneDto {
  @IsString()
  @ApiProperty({
    example: '998946953567',
  })
  phone: string;

}