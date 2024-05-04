import { DataMOperationDto } from './data-m-operation.dto';
import { ApiProperty } from '@nestjs/swagger';

export class DataMOperationDoubleDts extends DataMOperationDto{
  @ApiProperty({
    example: 1,
  })
  bind_operation: {
    id: number,
    outcome_operation_id: number,
    income_operation_id: number
  }
}