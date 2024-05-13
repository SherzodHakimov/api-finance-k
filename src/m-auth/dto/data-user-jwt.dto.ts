import { ApiProperty } from '@nestjs/swagger';

export class DataUserJwtDto {
  @ApiProperty({
    example: 1,
  })
  id: number

  @ApiProperty({
    example: 'SHERZOD',
  })
  login: string

  @ApiProperty({
    example: 'Hakimov',
  })
  name1: string

  @ApiProperty({
    example: 'Sherzod',
  })
  name2: string

  @ApiProperty({
    example: 1,
  })
  user_role: number
}