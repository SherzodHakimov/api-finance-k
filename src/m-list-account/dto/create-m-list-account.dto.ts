import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMListAccountDto {

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @ApiProperty({
      example: 'Название',
      minLength: 3,
      maxLength: 100,
    })
    name: string;

    @IsNumber()
    @ApiProperty({
      example: 1,
    })
    currency_id: number;


    @IsNumber()
    @ApiProperty({
      example: 1,
    })
    bank_id: number;

    @IsNumber()
    @ApiProperty({
      example: 1,
    })
    status_id: number;
}

