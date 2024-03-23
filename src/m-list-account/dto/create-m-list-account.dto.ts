import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMListAccountDto {
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @ApiProperty({
      default: 'Название',
    })
    name: string;

    @IsNumber()
    @ApiProperty({
      default: 1,
    })
    currency_id: number;


    @IsNumber()
    @ApiProperty({
      default: 1,
    })
    bank_id: number;

    @IsNumber()
    @ApiProperty({
      default: 1,
    })
    status_id: number;
}

