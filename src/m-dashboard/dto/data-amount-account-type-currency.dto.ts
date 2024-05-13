import { ApiProperty } from '@nestjs/swagger';

export class DataAmountAccountTypeCurrencyDto{

  @ApiProperty({
    example: 'Банк',
  })
  name: string;


  @ApiProperty({
    example: 1,
  })
  amount_convert: number;

  @ApiProperty({
    example: 1,
  })
  amount_local: number;
}