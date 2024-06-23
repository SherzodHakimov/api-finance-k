import { ApiProperty } from '@nestjs/swagger';

export class DataMOperationTagList {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Название',
  })
  name: string;
}