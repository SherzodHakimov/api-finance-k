import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator"

export class DataMSettingsOperationDto {

    @IsNumber()
    @ApiProperty({
        default: 1,
      })
    id: number

    @IsString()
    @ApiProperty({
        default: 'Название',
      })
    name: string
    
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