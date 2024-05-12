import { ApiProperty } from '@nestjs/swagger';

export class DataMainReportDto{

  @ApiProperty({
    example: 1,
  })
  s_start: number

  @ApiProperty({
    example: 1,
  })
  inc: number

  @ApiProperty({
    example: 1,
  })
  out: number

  @ApiProperty({
    example: 1,
  })
  out_exp: number

  @ApiProperty({
    example: 1,
  })
  inc_per: number

  @ApiProperty({
    example: 1,
  })
  out_per: number

  @ApiProperty({
    example: 1,
  })
  inc_con: number

  @ApiProperty({
    example: 1,
  })
  out_con: number

  @ApiProperty({
    example: 1,
  })
  s_end: number
}