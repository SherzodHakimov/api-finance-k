import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMListPayerDto {
  
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({
    default: 'Название',
    minLength: 3
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    default: 1,
  })
  status_id: number;
}
