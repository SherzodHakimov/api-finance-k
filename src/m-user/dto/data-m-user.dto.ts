import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DataMUserDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'login',
  })
  login: string;

  @ApiProperty({
    example: 'name',
  })
  name1: string;

  @ApiProperty({
    example: 'name',
  })
  name2: string;

  @ApiProperty({
    example: new Date().toISOString(),
  })
  created_at: Date;

  @ApiProperty({
    example: 1,
  })
  status_id: number;

  @ApiProperty({
    example: {
      name: 'Название',
    },
  })
  set_user_status: {
    name: string;
  };

  // NULLABLE FIELDS
  @ApiPropertyOptional({
    nullable: true,
    example: 1
  })
  user_role?: number;

  @ApiPropertyOptional({
    nullable: true,
    example: {
      name: 'Название',
    },
  })
  set_user_role?: {
    name: string;
  };

  @ApiPropertyOptional({
    nullable: true,
    example: new Date().toISOString()
  })
  last_auth_at?: Date;
  
}
