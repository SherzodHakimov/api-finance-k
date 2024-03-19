import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMListExpenseGroupDto } from './dto/create-m-list-expense-group.dto';
import { UpdateMListExpenseGroupDto } from './dto/update-m-list-expense-group.dto';
import { PrismaService } from 'src/prisma-service';
import { DataMListExpenseGroupDto } from './dto/data-m-list-expense-group.dto';

@Injectable()
export class MListExpenseGroupService {

  constructor(private prismaService: PrismaService) {}

  async create(createMListExpenseGroupDto: CreateMListExpenseGroupDto): Promise<DataMListExpenseGroupDto> {
    return await this.prismaService.list_expense_group.create({
      data: createMListExpenseGroupDto
    });
  }

  async findAll(): Promise<DataMListExpenseGroupDto[]> {
    return await this.prismaService.list_expense_group.findMany();
  }

  async findOne(id: number): Promise<DataMListExpenseGroupDto> {
    return await this.prismaService.list_expense_group.findUnique({
      where: {id: +id}
    });
  }

  async update(id: number, updateMListExpenseGroupDto: UpdateMListExpenseGroupDto): Promise<DataMListExpenseGroupDto> {
    return await this.prismaService.list_expense_group.update({
      where: {id: +id},
      data: updateMListExpenseGroupDto
    });
  }

  async remove(id: number): Promise<DataMListExpenseGroupDto> {

    const r = await this.prismaService.dbm_expense.findMany({ 
      where: {expense_group_id: +id}
    });

    if (r.length > 0) throw new NotFoundException('Delete not allowed!')


    const b = await this.prismaService.list_expense.findMany({ 
      where: {expense_group_id: +id}
    });

    if (b.length > 0) throw new NotFoundException('Delete not allowed!')

    return await this.prismaService.list_expense_group.delete({
        where:{id: +id}
    });
  }
}
