import { ApiProperty } from '@nestjs/swagger';

export class DataMOperationStatusDto {

  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 1,
  })
  status_id: number;

  @ApiProperty({
    example: { name: 'Веден'},
  })
  set_operation_status: {
    name: string;
  };

  @ApiProperty({
    nullable: true,
    example: 1,
  })
  contr_id?: number | null;

}