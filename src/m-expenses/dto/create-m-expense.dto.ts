import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMExpenseDto {

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  expense_group_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  expense_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  payment_doc_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  measure_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  account_type_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  currency_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  status_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  count: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  amount: number;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  @ApiPropertyOptional({
    nullable: true,
    example: 'Комментарии',
    maxLength: 200,
  })
  comment?: string | null;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  payer_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  user_id: number;

  @IsString()
  @ApiProperty({
    example: new Date().toISOString()
  })
  operation_date: Date;

}
