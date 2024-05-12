import { ApiProperty } from '@nestjs/swagger';

export class DataMainExpenseReportDto{

  @ApiProperty({
    example: 1,
  })
  id: number

  @ApiProperty({
    example: 'Халк банк',
  })
  name: string

  @ApiProperty({
    example: 1,
  })
  amount_local: number

  @ApiProperty({
    example: 1,
  })
  amount_convert: number

}