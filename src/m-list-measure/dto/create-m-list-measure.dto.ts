import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateMListMeasureDto {
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
