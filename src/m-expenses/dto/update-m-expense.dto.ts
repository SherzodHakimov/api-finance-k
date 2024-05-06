import { PartialType } from '@nestjs/mapped-types';
import { CreateMExpenseDto } from './create-m-expense.dto';

export class UpdateMExpenseDto extends PartialType(CreateMExpenseDto){

}
