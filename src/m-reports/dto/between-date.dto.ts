import { IsArray } from 'class-validator';
import { ApiProperty} from '@nestjs/swagger';

export class BetweenDateDto{
  @IsArray()
  @ApiProperty({
    example: ["2024-05-01", "2024-05-20"],
  })
  date: string[];
}