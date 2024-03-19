import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class DataMListMeasureDto {
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

    @IsString()
    @ApiProperty({
        default: 'Кор. наз.',
      })
      name_short: string
}
