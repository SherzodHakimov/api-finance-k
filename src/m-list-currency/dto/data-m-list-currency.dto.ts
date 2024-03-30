import { ApiProperty } from '@nestjs/swagger';

export class DataMListCurrencyDto {
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
  currency_type_id: number;

  @ApiProperty({
    example: {
      name: 'Название',
    },
  })
  set_currency_type: {
    name: string;
  };
}
