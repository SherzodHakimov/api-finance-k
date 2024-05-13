import { ApiProperty } from '@nestjs/swagger';

export class DataAmountCurrencyTypeDto{

  @ApiProperty({
    example: 1,
  })
  amount: number;

  @ApiProperty({
    example: 'EUR'
  })
  curr_name: string;

}