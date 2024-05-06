import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class DataMOperationExpenseDto{
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 1,
  })
  amount: Decimal;

  @ApiProperty({
    example: 1,
  })
  count: Decimal;

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
  payer_id: number;

  @ApiProperty({
    example: { name: 'Вилла'},
  })
  list_payer: {
    name: string;
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
  measure_id: number;

  @ApiProperty({
    example: { name: 'Литр', name_short: 'л.'},
  })
  list_measure: {
    name: string;
    name_short: string;
  };

  @ApiProperty({
    example: 1,
  })
  payment_doc_id: number;

  @ApiProperty({
    example: { name: 'Есть'},
  })
  set_payment_doc: {
    name: string;
  };

  @ApiProperty({
    example: 1,
  })
  expense_id: number;

  @ApiProperty({
    example: { name: 'Огруцы'},
  })
  list_expense: {
    name: string;
  };

  @ApiProperty({
    example: 1,
  })
  expense_group_id: number;

  @ApiProperty({
    example: { name: 'Продукты питания'},
  })
  list_expense_group: {
    name: string;
  };
}