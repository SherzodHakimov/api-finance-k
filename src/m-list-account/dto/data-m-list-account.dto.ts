import { ApiProperty } from '@nestjs/swagger';

export class DataMListAccountDto {
  @ApiProperty({
    example: 1
  })
  id: number;

  @ApiProperty({
    example: 'Название',
  })
  name: string;

  @ApiProperty({
    example: 1,
  })
  currency_id: number;

  @ApiProperty({
    example: 1,
  })
  bank_id: number;

  @ApiProperty({
    example: 1,
  })
  status_id: number;

  @ApiProperty({
    example: {
      name: 'Название',
    },
  })
  list_currency: {
    name: string;
  };

  @ApiProperty({
    example: {
      name: 'Название',
    },
  })
  list_bank: {
    name: string;
  };

  @ApiProperty({
    example: {
      name: 'Название',
    },
  })
  set_list_status: {
    name: string;
  };
  
}
