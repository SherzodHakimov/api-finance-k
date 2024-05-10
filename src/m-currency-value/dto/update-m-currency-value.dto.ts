import { PartialType } from '@nestjs/swagger';
import { CreateMCurrencyValueDto } from './create-m-currency-value.dto';

export class UpdateMCurrencyValueDto extends PartialType(CreateMCurrencyValueDto) {}
