import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateMListPayerDto {
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
}
