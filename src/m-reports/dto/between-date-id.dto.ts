import { BetweenDateDto } from './between-date.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BetweenDateIdDto extends BetweenDateDto{

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  id: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 1,
  })
  payer_id?: number;
}