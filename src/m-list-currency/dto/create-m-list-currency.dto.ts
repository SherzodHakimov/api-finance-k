import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateMListCurrencyDto {
    @IsString()
    @ApiProperty({
      default: 'Название',
    })
    name: string;

    @IsNumber()
    @ApiProperty({
      default: 1,
    })
    currency_type_id: number;
}