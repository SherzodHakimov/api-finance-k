import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMSettingDto {

  @IsString()
  @ApiProperty({
    default: 'Название',
  })
  name: string;
  
}
