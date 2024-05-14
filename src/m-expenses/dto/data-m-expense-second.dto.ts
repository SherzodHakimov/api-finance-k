import { ApiProperty } from '@nestjs/swagger';

export class DataMExpenseSecondDto{
  @ApiProperty({
    example: 1,
  })
  id: number

  @ApiProperty({
    example: 1,
  })
  outcome_operation_id: number

  @ApiProperty({
    example: 1,
  })
  income_operation_id: number
}