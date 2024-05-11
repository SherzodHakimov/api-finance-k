import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMCurrencyValueDto {

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  currency_1_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  currency_2_id: number;

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

  @IsString()
  @ApiProperty({
    example: '[1,2]',
  })
  ids: number;
}
