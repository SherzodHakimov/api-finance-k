import { ApiProperty } from '@nestjs/swagger';

export class DataMTelegramStaffDto {

  @ApiProperty({
    example: 1,
  })
  id: number

  @ApiProperty({
    example: 'Hakimov',
  })
  name1: string

  @ApiProperty({
    example: 'Sherzod',
  })
  name2: string

  @ApiProperty({
    example: '998990158231',
  })
  phone: string

  @ApiProperty({
    example: 1,
  })
  user_position_id: number

  @ApiProperty({
    example: 1,
  })
  user_role_id: number

  @ApiProperty({
    example: 1,
  })
  status_id: number

  @ApiProperty({
    example: new Date().toISOString(),
  })
  created_at: Date;

  @ApiProperty({
    example: {
      name: 'Название',
    },
  })
  list_bot_user_position: {
    name: string;
  };

  @ApiProperty({
    example: {
      name: 'Название',
    },
  })
  list_bot_user_roles: {
    name: string;
  };

  @ApiProperty({
    example: {
      name: 'Название',
    },
  })
  set_user_status: {
    name: string;
  };
}