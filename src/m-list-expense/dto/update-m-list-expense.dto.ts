import { PartialType } from '@nestjs/swagger';
import { CreateMListExpenseDto } from './create-m-list-expense.dto';

export class UpdateMListExpenseDto extends PartialType(CreateMListExpenseDto) {}
