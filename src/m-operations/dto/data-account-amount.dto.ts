import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccountAmountDto {

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  account_type_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  account_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  currency_id: number

}