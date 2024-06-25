import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMTelegramBotUserDto {
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

  @IsString()
  @ApiProperty({
    example: '998946953567',
  })
  phone: string;


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

  @IsNumber()
  @ApiProperty({
    default: 1
  })
  status_id: number;
}