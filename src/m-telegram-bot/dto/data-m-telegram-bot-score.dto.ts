import { ApiProperty } from '@nestjs/swagger';

export class DataMTelegramBotScoreDto {
  @ApiProperty({
    example: 1,
  })
  id: number


  @ApiProperty({
    example: 1,
  })
  user_id: number

  @ApiProperty({
    example: 1,
  })
  user_position_id: number

  @ApiProperty({
    example: 1,
  })
  check_list_id: number


  @ApiProperty({
    example: 1,
  })
  score: number | any

  @ApiProperty({
    example: new Date().toISOString(),
  })
  created_at: Date;

  @ApiProperty({
    example: {
      id: 1,
      name1: 'Tester',
      name2: 'Staff'
    },
  })
  dbm_bot_user: {
    id: number,
    name1: string,
    name2: string
  };

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
  list_bot_check_list: {
    name: string;
  };

}