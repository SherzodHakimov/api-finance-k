import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateMListBankDto {
    @IsString()
    @ApiProperty({
      default: 'Название',
    })
    name: string;
}

