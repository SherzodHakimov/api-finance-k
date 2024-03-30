import { ApiProperty } from '@nestjs/swagger';

export class DataMListPayerDto {
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
  status_id: number;

  @ApiProperty({
    example: {
      name: 'Название',
    },
  })
  set_list_status: {
    name: string;
  };
}
