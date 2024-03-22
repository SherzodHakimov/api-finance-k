import { PartialType } from '@nestjs/swagger';
import { CreateMListCurrencyDto } from './create-m-list-currency.dto';

export class UpdateMListCurrencyDto extends PartialType(CreateMListCurrencyDto) {}
