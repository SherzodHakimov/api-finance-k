import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class DataMOperationDto {

  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiPropertyOptional({
    nullable: true,
    example: 1,
  })
  ammount_in: Decimal;

  @ApiPropertyOptional({
    nullable: true,
    example: 1,
  })
  ammount_out: Decimal;

  @ApiPropertyOptional({
    nullable: true,
    example: 'Комментарии',
  })
  comment: string;

  @ApiProperty({
    example: new Date().toISOString()
  })
  operation_date: Date;

  @ApiProperty({
    example: new Date().toISOString(),
  })
  created_at: Date;

  @ApiProperty({
    example: 1,
  })
  user_id: number;

  @ApiProperty({
    example: {
      name1: 'Umirov',
      name2: 'Bobur'
    },
  })
  dbm_user: {
    name1: string;
    name2: string;
  };

  @ApiProperty({
    example: 1,
  })
  status_id: number;

  @ApiProperty({
    example: { name: 'Веден'},
  })
  set_operation_status: {
    name: string;
  };

  @ApiProperty({
    example: 1,
  })
  currency_id: number;

  @ApiProperty({
    example: { name: 'USD'},
  })
  list_currency: {
    name: string;
  };

  @ApiProperty({
    example: 1,
  })
  account_type_id: number;

  @ApiProperty({
    example: { name: 'Банк'},
  })
  set_account_type: {
    name: string;
  };

  @ApiProperty({
    example: 1,
  })
  account_id: number;

  @ApiProperty({
    example: { name: 'Основной'},
  })
  list_account: {
    name: string;
  };

  @ApiProperty({
    example: 1,
  })
  operation_id: number;

  @ApiProperty({
    example: { name: 'Приход'},
  })
  set_operation: {
    name: string;
  };
}
