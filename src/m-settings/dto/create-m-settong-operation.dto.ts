import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean} from 'class-validator';
import { CreateMSettingDto } from './create-m-setting.dto';

export class CreateMSettingOperationDto extends CreateMSettingDto {
  
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
