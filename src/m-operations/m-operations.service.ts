import { Injectable } from '@nestjs/common';
import { CreateMOperationDto } from './dto/create-m-operation.dto';
import { UpdateMOperationDto } from './dto/update-m-operation.dto';
import { PrismaService } from '../prisma-service';
import { DataMOperationDto } from './dto/data-m-operation.dto';

@Injectable()
export class MOperationsService {

  constructor(private prismaService: PrismaService) {}

  create(createMOperationDto: CreateMOperationDto): Promise<DataMOperationDto> {
    return this.prismaService.dbm_operation.create({
      data: createMOperationDto,
      include: {
        set_operation:  { select: { name: true } },
        list_account:  { select: { name: true } },
        set_account_type:  { select: { name: true } },
        list_currency:  { select: { name: true } },
        set_operation_status:  { select: { name: true } },
        dbm_user:  { select: { name1: true, name2: true } }
      }
    });
  }

  findAll(): Promise<DataMOperationDto[]> {
    return this.prismaService.dbm_operation.findMany({
      include: {
        set_operation:  { select: { name: true } },
        list_account:  { select: { name: true } },
        set_account_type:  { select: { name: true } },
        list_currency:  { select: { name: true } },
        set_operation_status:  { select: { name: true } },
        dbm_user:  { select: { name1: true, name2: true } }
      },
      orderBy: { id: 'asc' }
    });
  }

  findOne(id: number): Promise<DataMOperationDto> {
    return this.prismaService.dbm_operation.findUnique({
      where: { id: +id },
      include: {
        set_operation:  { select: { name: true } },
        list_account:  { select: { name: true } },
        set_account_type:  { select: { name: true } },
        list_currency:  { select: { name: true } },
        set_operation_status:  { select: { name: true } },
        dbm_user:  { select: { name1: true, name2: true } }
      }
    });
  }

  update(id: number, updateMOperationDto: UpdateMOperationDto): Promise<DataMOperationDto> {
    return this.prismaService.dbm_operation.update({
      where: { id: +id },
      data: updateMOperationDto,
      include: {
        set_operation:  { select: { name: true } },
        list_account:  { select: { name: true } },
        set_account_type:  { select: { name: true } },
        list_currency:  { select: { name: true } },
        set_operation_status:  { select: { name: true } },
        dbm_user:  { select: { name1: true, name2: true } }
      }
    });
  }

  remove(id: number): Promise<DataMOperationDto> {
    return this.prismaService.dbm_operation.delete({
      where: { id: +id },
      include: {
        set_operation:  { select: { name: true } },
        list_account:  { select: { name: true } },
        set_account_type:  { select: { name: true } },
        list_currency:  { select: { name: true } },
        set_operation_status:  { select: { name: true } },
        dbm_user:  { select: { name1: true, name2: true } }
      }
    });
  }

  findAllByAccountType(account_type_id: number): Promise<DataMOperationDto[]> {
    return this.prismaService.dbm_operation.findMany({
      where: { account_type_id: +account_type_id },
      include: {
        set_operation:  { select: { name: true } },
        list_account:  { select: { name: true } },
        set_account_type:  { select: { name: true } },
        list_currency:  { select: { name: true } },
        set_operation_status:  { select: { name: true } },
        dbm_user:  { select: { name1: true, name2: true } }
      },
      orderBy: { id: 'asc' }
    });
  }
}
