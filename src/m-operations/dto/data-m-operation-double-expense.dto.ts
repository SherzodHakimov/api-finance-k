import { ApiProperty } from '@nestjs/swagger';
import { DataMExpenseDto } from '../../m-expenses/dto/data-m-expense.dto';

export class DataMOperationDoubleExpenseDto extends DataMExpenseDto{
  @ApiProperty({
    example: {
      id: 1,
      outcome_operation_id: 1,
      income_operation_id: 1
    },
  })
  bind_operation: {
    id: number,
    outcome_operation_id: number,
    income_operation_id: number
  }
}