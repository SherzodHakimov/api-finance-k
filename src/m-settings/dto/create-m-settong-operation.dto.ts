import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateMSettingOperationDto {
  @IsString()
  @ApiProperty({
    default: 'Название',
  })
  name!: string;

  @IsBoolean()
  @ApiProperty({
    default: true,
  })
  bank: boolean;

  @IsBoolean()
  @ApiProperty({
    default: true,
  })
  cash: boolean;
}
