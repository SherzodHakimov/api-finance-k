import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean} from "class-validator"
import { DataMSettingsDto } from "./data-m-settings.dto";

export class DataMSettingsOperationDto extends DataMSettingsDto {

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