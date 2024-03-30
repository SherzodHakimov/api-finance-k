import { ApiProperty } from '@nestjs/swagger';

export class DataMListExpenseGroupDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Название',
  })
  name: string;
}
