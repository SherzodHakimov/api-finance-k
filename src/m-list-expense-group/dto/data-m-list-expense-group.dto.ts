import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class DataMListExpenseGroupDto {
  @IsNumber()
  @ApiProperty({
      default: 1,
    })
  id: number

  @IsString()
  @ApiProperty({
      default: 'Название',
    })
  name: string
}

