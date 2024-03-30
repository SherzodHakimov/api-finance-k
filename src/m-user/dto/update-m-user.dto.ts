import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateMUserDto } from './create-m-user.dto';
import { IsString, IsOptional } from 'class-validator';

export class UpdateMUserDto extends PartialType(CreateMUserDto) {
  // NULLABLE FIELDS
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'password',
    nullable: true
  })
  password?: string;
}
