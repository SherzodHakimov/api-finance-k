import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateMListAccountDto {
    @IsString()
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

