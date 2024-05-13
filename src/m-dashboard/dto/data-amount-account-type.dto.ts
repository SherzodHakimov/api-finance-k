import { ApiProperty } from '@nestjs/swagger';

export class DataAmountAccountTypeDto{

  @ApiProperty({
    example: 1,
  })
  amount: number;

  @ApiProperty({
    example: 'Банк',
  })
  acc_type: string;

  @ApiProperty({
    example: 'EUR',
  })
  curr_name: string;
}