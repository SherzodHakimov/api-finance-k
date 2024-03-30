import { ApiProperty } from "@nestjs/swagger"
import { IsString, MaxLength, MinLength } from "class-validator"

export class CreateMListMeasureDto {
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @ApiProperty({
      example: 'Название',
      minLength: 3,
      maxLength: 100,
      })
    name: string

    @IsString()
    @MinLength(1)
    @MaxLength(10)
    @ApiProperty({
      example: 'Кор. наз.',
        minLength: 3,
        maxLength: 10
      })
      name_short: string
}
