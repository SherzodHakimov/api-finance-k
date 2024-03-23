import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsObject, IsString } from "class-validator";

export class DataMListCurrencyDto {

    @IsNumber()
    @ApiProperty({
        default: 1,
      })
    id: number
    
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

    @IsObject()
    @ApiProperty({
      default: {
        name: 'Название'
      }
    })
    set_currency_type: {
      name: string
    }
}
