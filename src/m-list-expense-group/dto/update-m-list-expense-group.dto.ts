import { PartialType } from '@nestjs/swagger';
import { CreateMListExpenseGroupDto } from './create-m-list-expense-group.dto';

export class UpdateMListExpenseGroupDto extends PartialType(CreateMListExpenseGroupDto) {}
