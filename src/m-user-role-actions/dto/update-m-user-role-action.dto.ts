import { PartialType } from '@nestjs/mapped-types';
import { CreateMUserRoleActionDto } from './create-m-user-role-action.dto';

export class UpdateMUserRoleActionDto extends PartialType(CreateMUserRoleActionDto) {}
