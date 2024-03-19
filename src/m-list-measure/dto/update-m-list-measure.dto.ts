import { PartialType } from '@nestjs/swagger';
import { CreateMListMeasureDto } from './create-m-list-measure.dto';

export class UpdateMListMeasureDto extends PartialType(CreateMListMeasureDto) {}
