import { PartialType } from '@nestjs/mapped-types';
import { CreateMOperationDto } from './create-m-operation.dto';

export class UpdateMOperationDto extends PartialType(CreateMOperationDto) {}
