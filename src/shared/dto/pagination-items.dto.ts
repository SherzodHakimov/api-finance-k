import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationItemsDto {

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  page_size: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  page_number: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    nullable: true,
    example: 'id',
  })
  sort_field?: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    nullable: true,
    example: 'ascend',
  })
  sort_order?: 'ascend' | 'descend' | null;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: [],
  })
  filter: {key: string, value: string[]}[];

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    nullable: true,
    example: '1',
  })
  amount_from?: number | null;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    nullable: true,
    example: '1',
  })
  amount_to?: number | null;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    nullable: true,
    example: [],
  })
  date?: string[] | null;
}