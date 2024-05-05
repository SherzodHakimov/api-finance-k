import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMOperationBankToCashDto {
  @IsString()
  @IsOptional()
  @MaxLength(200)
  @ApiPropertyOptional({
    nullable: true,
    example: 'Комментарии',
    maxLength: 200,
  })
  comment?: string | null;

  @IsString()
  @ApiProperty({
    example: new Date().toISOString()
  })
  operation_date: Date;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  user_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  status_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  currency_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  out_account_type_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  in_account_type_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  operation_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  amount: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  out_account_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  in_account_id: number;
}