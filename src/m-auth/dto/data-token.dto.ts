import { ApiProperty } from '@nestjs/swagger';

export class DataTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJTSEVSWk9EIiwibmFtZTEiOiLQkNCx0YvQu9Cw0LkiLCJuYW1lMiI6ItCa0YPQsNGL0L3RiCIsInVzZXJfcm9sZSI6MSwiaWF0IjoxNzE1NjM1MTE4LCJleHAiOjE3MTU2Mzg3MTh9.6WrR68w75eJLx7NcSYhIDjvfmu8G52i9gImJpw9ehKE',
  })
  token: string;
}