import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class DataMCurrencyValueDto {

  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 1,
  })
  buy_currency_id: number;

  @ApiProperty({
    example: { name: 'USD'},
  })
  buy_list_currency: {
    name: string;
  };

  @ApiProperty({
    example: 1,
  })
  sell_currency_id: number;

  @ApiProperty({
    example: { name: 'USD'},
  })
  sell_list_currency: {
    name: string;
  };

  @ApiProperty({
    example: 1,
  })
  buy_value: Decimal;

  @ApiProperty({
    example: 1,
  })
  sell_value: Decimal;

  @ApiProperty({
    example: new Date().toISOString()
  })
  value_date: Date;

  @ApiProperty({
    example: new Date().toISOString(),
  })
  created_at: Date;

  @ApiProperty({
    example: 1,
  })
  user_id: number;

  @ApiProperty({
    example: {
      name1: 'Umirov',
      name2: 'Bobur'
    },
  })
  dbm_user: {
    name1: string;
    name2: string;
  };

}