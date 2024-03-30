import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty({
    default: [
      'id must be a number conforming to the specified constraints',
    ],
  })
  message: string[];

  @ApiProperty({
    default: 'Bad Request',
  })
  error: string;

  @ApiProperty({
    default: 400,
  })
  statusCode: number;
}
