import { ApiProperty } from '@nestjs/swagger';

export class DataMTelegramBotBonusDto {
  @ApiProperty({
    example: 1,
  })
  id: number


  @ApiProperty({
    example: 1,
  })
  user_id: number

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

}