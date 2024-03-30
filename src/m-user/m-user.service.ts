import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMUserDto } from './dto/create-m-user.dto';
import { UpdateMUserDto } from './dto/update-m-user.dto';
import { PrismaService } from 'src/prisma-service';
import { DataMUserDto } from './dto/data-m-user.dto';

@Injectable()
export class MUserService {
  constructor(private prismaService: PrismaService) {}

  async create(createMUserDto: CreateMUserDto): Promise<DataMUserDto> {
    return await this.prismaService.dbm_user.create({
      data: createMUserDto,
      select: {
        id: true,
        login: true,
        name1: true,
        name2: true,
        user_role: true,
        status_id: true,
        last_auth_at: true,
        created_at: true,
        set_user_role: { select: { name: true } },
        set_user_status: { select: { name: true } },
      },
    });
  }

  async findAll(): Promise<DataMUserDto[]> {
      return await this.prismaService.dbm_user.findMany({
        select: {
          id: true,
          login: true,
          name1: true,
          name2: true,
          user_role: true,
          status_id: true,
          last_auth_at: true,
          created_at: true,
          set_user_role: { select: { name: true } },
          set_user_status: { select: { name: true } },
        },
        orderBy: { id: 'asc' }
      });
  }
  
  async findOne(id: number): Promise<DataMUserDto> {
    return await this.prismaService.dbm_user.findUnique({
      where: { id: +id },
      select: {
        id: true,
        login: true,
        name1: true,
        name2: true,
        user_role: true,
        status_id: true,
        last_auth_at: true,
        created_at: true,
        set_user_role: { select: { name: true } },
        set_user_status: { select: { name: true } },
      },
    });
  }

  async update(
    id: number,
    updateMUserDto: UpdateMUserDto,
  ): Promise<DataMUserDto> {
    return await this.prismaService.dbm_user.update({
      where: { id: +id },
      data: updateMUserDto.password
        ? {
            login: updateMUserDto.login,
            name1: updateMUserDto.name1,
            name2: updateMUserDto.name2,
            status_id: updateMUserDto.status_id,
            user_role: updateMUserDto.user_role
              ? updateMUserDto.user_role
              : null,
            password: updateMUserDto.password,
          }
        : {
            login: updateMUserDto.login,
            name1: updateMUserDto.name1,
            name2: updateMUserDto.name2,
            status_id: updateMUserDto.status_id,
            user_role: updateMUserDto.user_role
              ? updateMUserDto.user_role
              : null,
          },
      select: {
        id: true,
        login: true,
        name1: true,
        name2: true,
        user_role: true,
        status_id: true,
        last_auth_at: true,
        created_at: true,
        set_user_role: { select: { name: true } },
        set_user_status: { select: { name: true } },
      },
    });
  }

  async remove(id: number): Promise<DataMUserDto> {
    const o = await this.prismaService.dbm_operation.findFirst({
      where: { user_id: +id },
    });

    if (o) throw new NotFoundException(['Delete not allowed!']);

    const e = await this.prismaService.dbm_expense.findFirst({
      where: { user_id: +id },
    });

    if (e) throw new NotFoundException(['Delete not allowed!']);

    const c = await this.prismaService.dbm_currency_value.findFirst({
      where: { user_id: +id },
    });

    if (c) throw new NotFoundException(['Delete not allowed!']);

    return await this.prismaService.dbm_user.delete({
      where: { id: +id },
      select: {
        id: true,
        login: true,
        name1: true,
        name2: true,
        user_role: true,
        status_id: true,
        last_auth_at: true,
        created_at: true,
        set_user_role: { select: { name: true } },
        set_user_status: { select: { name: true } },
      },
    });
  }
}
