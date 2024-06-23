import { IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMTelegramBotScoreDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  user_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  user_position_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  check_list_id: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  @ApiProperty({
    example: 1,
  })
  score: number;
}