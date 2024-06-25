import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMTelegramBotUserDataDto {
  @IsString()
  @ApiProperty({
    example: 'Hakimov',
  })
  name1: string;


  @IsString()
  @ApiProperty({
    example: 'Sherzod',
  })
  name2: string;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  user_position_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  user_role_id: number;

}