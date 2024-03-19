import { PartialType } from '@nestjs/swagger';
import { CreateMListCurrrencyDto } from './create-m-list-currrency.dto';

export class UpdateMListCurrrencyDto extends PartialType(CreateMListCurrrencyDto) {}
