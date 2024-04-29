import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDecimal, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMOperationDto {

  @IsDecimal()
  @IsOptional()
  @ApiPropertyOptional({
    nullable: true,
    example: 1,
  })
  ammount_in?: number | null;

  @IsDecimal()
  @IsOptional()
  @ApiPropertyOptional({
    nullable: true,
    example: 1,
  })
  ammount_out?: number | null;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(200)
  @ApiPropertyOptional({
    nullable: true,
    example: 'Комментарии',
    minLength: 3,
    maxLength: 200,
  })
  comment?: string | null;

  @IsDate()
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
  account_type_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  account_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  operation_id: number;

}
