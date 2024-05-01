import { Injectable } from '@nestjs/common';
import { CreateMUserRoleActionDto } from './dto/create-m-user-role-action.dto';
import { UpdateMUserRoleActionDto } from './dto/update-m-user-role-action.dto';
import { DataMUserRoleActionDto } from './dto/data-m-user-role-action.dto';
import { PrismaService } from '../prisma-service';

@Injectable()
export class MUserRoleActionsService {

  constructor(private prismaService: PrismaService) {}

  async create(createMUserRoleActionDto: CreateMUserRoleActionDto): Promise<DataMUserRoleActionDto> {
    return this.prismaService.dba_user_roles.create({
      data: createMUserRoleActionDto,
      include: {
        set_user_role: { select: { name: true } },
        set_user_action: { select: { name: true } }
      }
    });
  }

  async findAll(): Promise<DataMUserRoleActionDto[]> {
    return this.prismaService.dba_user_roles.findMany({
      include: {
        set_user_role: { select: { name: true } },
        set_user_action: { select: { name: true } }
      },
      orderBy: { id: 'asc' }
    });
  }

  async findOne(id: number): Promise<DataMUserRoleActionDto>  {
    return this.prismaService.dba_user_roles.findFirst({
      where: { id: +id },
      include: {
        set_user_role: { select: { name: true } },
        set_user_action: { select: { name: true } }
      }
    });
  }

  // update(id: number, updateMUserRoleActionDto: UpdateMUserRoleActionDto) {
  //   return `This action updates a #${id} mUserRoleAction`;
  // }

  async remove(id: number): Promise<DataMUserRoleActionDto> {
    return this.prismaService.dba_user_roles.delete({
      where: { id: +id },
      include: {
        set_user_role: { select: { name: true } },
        set_user_action: { select: { name: true } }
      }
    });
  }
}
