import { ApiProperty } from "@nestjs/swagger"
import { IsString, MaxLength, MinLength } from "class-validator"

export class CreateMListMeasureDto {
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @ApiProperty({
        default: 'Название',
        minLength: 3
      })
    name: string

    @IsString()
    @MinLength(3)
    @MaxLength(10)
    @ApiProperty({
        default: 'Кор. наз.',
        minLength: 3
      })
      name_short: string
}
