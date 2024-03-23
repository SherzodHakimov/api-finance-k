import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsObject, IsString } from "class-validator";

export class DataMListPayerDto {

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
    status_id: number;

    @IsObject()
    @ApiProperty({
      default: {
        name: 'Название'
      },
    })
    set_list_status: {
      name: string
    }
}
