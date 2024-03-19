import { PartialType } from '@nestjs/swagger';
import { CreateMListPayerDto } from './create-m-list-payer.dto';

export class UpdateMListPayerDto extends PartialType(CreateMListPayerDto) {}
