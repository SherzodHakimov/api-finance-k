import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DataMOperationDto } from './data-m-operation.dto';
import { IsArray, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class DataMOperationPaginationDto extends DataMOperationDto{

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
    example: 'ascend',
  })
  filter: {key: string, value: string[]}[];

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    nullable: true,
    example: '1',
  })
  ammount_from?: number | null;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    nullable: true,
    example: '1',
  })
  ammount_to?: number | null;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    nullable: true,
    example: '1',
  })
  date?: string[] | null;
}