import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ParamMAuthDto {
  @IsString()
  @ApiProperty({
    example: 'SHERZOD',
  })
  login: string;

  @IsString()
  @ApiProperty({
    example: '55555',
  })
  password: string;
}