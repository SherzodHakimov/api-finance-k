import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMTelegramBotBillDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  user_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  amount: number;

  @IsString()
  @ApiProperty({
    example: 'file.jpg',
  })
  file: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Комментарии',
  })
  comment?: string;

}