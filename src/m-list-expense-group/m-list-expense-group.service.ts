import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateMListExpenseGroupDto } from './dto/create-m-list-expense-group.dto';
import { UpdateMListExpenseGroupDto } from './dto/update-m-list-expense-group.dto';
import { PrismaService } from 'src/prisma-service';
import { DataMListExpenseGroupDto } from './dto/data-m-list-expense-group.dto';

@Injectable()
export class MListExpenseGroupService {

  constructor(private prismaService: PrismaService) {}

  async create(createMListExpenseGroupDto: CreateMListExpenseGroupDto): Promise<DataMListExpenseGroupDto> {

    const r = await this.prismaService.list_expense_group.findFirst({
      where: {name: createMListExpenseGroupDto.name.trim()}
    });

    if (r) throw new ForbiddenException(['Duplicate not allowed!'])

    createMListExpenseGroupDto.name = createMListExpenseGroupDto.name.trim()
    return this.prismaService.list_expense_group.create({
      data: createMListExpenseGroupDto
    });
  }

  async findAll(): Promise<DataMListExpenseGroupDto[]> {
    return this.prismaService.list_expense_group.findMany({
      orderBy: { id: 'asc' }
    });
  }

  async findOne(id: number): Promise<DataMListExpenseGroupDto> {
    return this.prismaService.list_expense_group.findFirst({
      where: { id: +id }
    });
  }

  async update(id: number, updateMListExpenseGroupDto: UpdateMListExpenseGroupDto): Promise<DataMListExpenseGroupDto> {
    updateMListExpenseGroupDto.name = updateMListExpenseGroupDto.name.trim()
    return this.prismaService.list_expense_group.update({
      where: { id: +id },
      data: updateMListExpenseGroupDto
    });
  }

  async remove(id: number): Promise<DataMListExpenseGroupDto> {

    const r = await this.prismaService.dbm_expense.findFirst({ 
      where: {expense_group_id: +id}
    });

    if (r) throw new ForbiddenException(['Delete not allowed!'])


    const b = await this.prismaService.list_expense.findFirst({ 
      where: {expense_group_id: +id}
    });

    if (b) throw new ForbiddenException(['Delete not allowed!'])

    return this.prismaService.list_expense_group.delete({
      where: { id: +id }
    });
  }

}
