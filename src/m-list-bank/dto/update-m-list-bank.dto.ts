import { PartialType } from '@nestjs/swagger';
import { CreateMListBankDto } from './create-m-list-bank.dto';

export class UpdateMListBankDto extends PartialType(CreateMListBankDto) {}
