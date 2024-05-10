import { IsNumber, IsObject, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationTotalsDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  count: number;

  @IsObject()
  @IsOptional()
  @ApiPropertyOptional({
    example: {
      amount_out: 1,
      amount_in: 1,
      amount: 1,
    },
  })
  sum?: {
    amount_out?: number,
    amount_in?: number,
    amount?: number,
  };
}