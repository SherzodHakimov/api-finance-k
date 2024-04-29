import { ApiProperty } from '@nestjs/swagger';

export class DataMUserRoleActionDto {

  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 1,
  })
  user_role: number;

  @ApiProperty({
    example: {
      name: 'Администратор',
    },
  })
  set_user_role: {
    name: string;
  };

  @ApiProperty({
    example: 1,
  })
  action_id: number;

  @ApiProperty({
    example: {
      name: 'Просмотр',
    },
  })
  set_user_action: {
    name: string;
  };

}