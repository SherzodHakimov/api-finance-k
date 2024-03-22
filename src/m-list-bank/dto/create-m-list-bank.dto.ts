import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateMListBankDto {
    @IsString()
    @MinLength(3)
    @ApiProperty({
      default: 'Название',
    })
    name: string;

    
}

