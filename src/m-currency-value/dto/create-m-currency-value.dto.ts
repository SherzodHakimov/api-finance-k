import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMCurrencyValueDto {

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  buy_currency_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  sell_currency_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  buy_value: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  sell_value: number;

  @IsString()
  @ApiProperty({
    example: new Date().toISOString()
  })
  value_date: Date;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  user_id: number;
}
