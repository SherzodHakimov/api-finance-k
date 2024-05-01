import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DataMOperationDto } from './data-m-operation.dto';

export class DataMOperationPaginationDto extends DataMOperationDto{

  @ApiProperty({
    example: 1,
  })
  page_size: number;

  @ApiProperty({
    example: 1,
  })
  page_number: number;

  @ApiPropertyOptional({
    nullable: true,
    example: 'id',
  })
  sort_field?: string | null;

  @ApiPropertyOptional({
    nullable: true,
    example: 'ascend',
  })
  sort_order?: 'ascend' | 'descend' | null;

  // search_column: this.searchColumn,
  // search_value: this.searchValue,
}