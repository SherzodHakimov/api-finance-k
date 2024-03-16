import { PartialType } from '@nestjs/mapped-types';
import { CreateMSettingDto } from './create-m-setting.dto';

export class UpdateMSettingDto extends PartialType(CreateMSettingDto) {}
