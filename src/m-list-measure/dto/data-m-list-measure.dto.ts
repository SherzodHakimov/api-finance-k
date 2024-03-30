import { ApiProperty } from '@nestjs/swagger';

export class DataMListMeasureDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Название',
  })
  name: string;

  @ApiProperty({
    example: 'Кор. наз.',
  })
  name_short: string;
}
