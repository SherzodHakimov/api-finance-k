import { DataMainReportDto } from './data-main-report.dto';
import { ApiProperty } from '@nestjs/swagger';

export class DataMainAllReportDto extends DataMainReportDto{

  @ApiProperty({
    example: 'Халк банк',
  })
  bank_name: string

  @ApiProperty({
    example: 'KZT',
  })
  curr_name: string
}