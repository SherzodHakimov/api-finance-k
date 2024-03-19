import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateMListExpenseGroupDto {
    @IsString()
    @ApiProperty({
      default: 'Название',
    })
    name: string;
}
