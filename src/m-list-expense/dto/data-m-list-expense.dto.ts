import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsObject, IsString } from "class-validator";

export class DataMListExpenseDto {
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


  @IsNumber()
  @ApiProperty({
      default: 1,
    })
    expense_group_id: number


  @IsNumber()
  @ApiProperty({
      default: 1,
    })
    status_id: number


    @IsObject()
    @ApiProperty({
      default: {
        name: 'Название'
      }
    })
    list_expense_group: {
      name: string
    }


    @IsObject()
    @ApiProperty({
      default: {
        name: 'Активен'
      }
    })
    set_list_status: {
      name: string
    }
}

