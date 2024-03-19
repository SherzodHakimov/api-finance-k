import { PartialType } from '@nestjs/swagger';
import { CreateMListAccountDto } from './create-m-list-account.dto';

export class UpdateMListAccountDto extends PartialType(CreateMListAccountDto) {}
