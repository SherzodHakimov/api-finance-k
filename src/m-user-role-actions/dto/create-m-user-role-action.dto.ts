import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateMUserRoleActionDto {

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  user_role: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  action_id: number;
}
