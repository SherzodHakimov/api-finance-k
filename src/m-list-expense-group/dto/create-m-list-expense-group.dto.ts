import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateMListExpenseGroupDto {
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @ApiProperty({
      default: 'Название',
    })
    name: string;
}
