import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DataForCheckCurrencyDto{

  @IsString()
  @ApiProperty({
    example: new Date().toISOString()
  })
  value_date: Date

  @IsString()
  @ApiProperty({
    example: '[1,2]',
  })
  ids: string;
}