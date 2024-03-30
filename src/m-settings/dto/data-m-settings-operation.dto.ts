import { ApiProperty } from '@nestjs/swagger';
import { DataMSettingsDto } from './data-m-settings.dto';

export class DataMSettingsOperationDto extends DataMSettingsDto {
  @ApiProperty({
    example: true,
  })
  bank: boolean;

  @ApiProperty({
    example: true,
  })
  cash: boolean;
}
