import { ApiProperty } from '@nestjs/swagger';

export class DataMainCurrencyValuesDto{
  @ApiProperty({
    example: '[2,1]',
  })
  ids: string

  @ApiProperty({
    example: 'USD - KZT',
  })
  currencies: string

  @ApiProperty({
    example: 1,
  })
  buy_value: number

  @ApiProperty({
    example: 1,
  })
  sell_value: number
}