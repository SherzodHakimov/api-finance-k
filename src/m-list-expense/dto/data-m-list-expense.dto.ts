import { ApiProperty } from '@nestjs/swagger';

export class DataMListExpenseDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Название',
  })
  name: string;

  @ApiProperty({
    example: 1,
  })
  expense_group_id: number;

  @ApiProperty({
    example: 1,
  })
  status_id: number;

  @ApiProperty({
    example: {
      name: 'Название',
    },
  })
  list_expense_group: {
    name: string;
  };

  @ApiProperty({
    example: {
      name: 'Активен',
    },
  })
  set_list_status: {
    name: string;
  };
}
