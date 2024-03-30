import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({
    example: 'login',
    minLength: 3,
    maxLength: 100,
  })
  login: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({
    example: 'name',
    minLength: 3,
    maxLength: 100,
  })
  name1: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({
    example: 'name',
    minLength: 3,
    maxLength: 100,
  })
  name2: string;

  @IsString()
  @MinLength(3)
  @MaxLength(200)
  @ApiProperty({
    example: 'password',
    minLength: 3,
    maxLength: 200,
  })
  password: string;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  status_id: number;

  // NULLABLE FIELDS
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 1,
    nullable: true,
  })
  user_role?: number;
}
