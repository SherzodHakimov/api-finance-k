import { ApiProperty } from "@nestjs/swagger";

export class ResponseDto<T> {
    @ApiProperty({
        example: 1
    })
    data: T;
 
    @ApiProperty()
    statusCode: number;
  }
  