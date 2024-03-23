import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMListExpenseDto } from './dto/create-m-list-expense.dto';
import { UpdateMListExpenseDto } from './dto/update-m-list-expense.dto';
import { PrismaService } from 'src/prisma-service';
import { DataMListExpenseDto } from './dto/data-m-list-expense.dto';

@Injectable()
export class MListExpenseService {
  constructor(private prismaService: PrismaService) {}
  
  async create(createMListExpenseDto: CreateMListExpenseDto): Promise<DataMListExpenseDto> {
    return await this.prismaService.list_expense.create({
      data: createMListExpenseDto,
      include: {
        list_expense_group: {select: {name: true}},
        set_list_status: {select: {name: true}}
      }
    });
  }

  async findAll(): Promise<DataMListExpenseDto[]> {
    return await this.prismaService.list_expense.findMany({
      include: {
        list_expense_group: {select: {name: true}},
        set_list_status: {select: {name: true}}
      }
    });
  }

  async findOne(id: number): Promise<DataMListExpenseDto> {
    return await this.prismaService.list_expense.findUnique({
      where: {id: +id},
      include: {
        list_expense_group: {select: {name: true}},
        set_list_status: {select: {name: true}}
      }
    });
  }

  async update(id: number, updateMListExpenseDto: UpdateMListExpenseDto): Promise<DataMListExpenseDto> {
    return await this.prismaService.list_expense.update({
      where: {id: +id},
      data: updateMListExpenseDto,
      include: {
        list_expense_group: {select: {name: true}},
        set_list_status: {select: {name: true}}
      }
    });
  }

  async remove(id: number): Promise<DataMListExpenseDto> {
    const r = await this.prismaService.dbm_expense.findMany({ 
      where: {expense_id: +id},
    });

    if (r.length > 0) throw new NotFoundException('Delete not allowed!')

    return await this.prismaService.list_expense.delete({
        where:{id: +id},
        include: {
          list_expense_group: {select: {name: true}},
          set_list_status: {select: {name: true}}
        }
    });
  }
}
