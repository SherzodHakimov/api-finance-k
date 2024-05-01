import { IsNumber } from 'class-validator';
import { ApiProperty} from '@nestjs/swagger';

export class DataToCheckMOperationInitDto {

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  account_type_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  account_id: number;

}