import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateMListExpenseDto } from './dto/create-m-list-expense.dto';
import { UpdateMListExpenseDto } from './dto/update-m-list-expense.dto';
import { PrismaService } from 'src/prisma-service';
import { DataMListExpenseDto } from './dto/data-m-list-expense.dto';
import { PaginationItemsDto } from '../shared/dto/pagination-items.dto';
import { PaginationTotalsDto } from '../shared/dto/pagination-totals.dto';


@Injectable()
export class MListExpenseService {
  
  constructor(private prismaService: PrismaService) {}
  
  async create(createMListExpenseDto: CreateMListExpenseDto): Promise<DataMListExpenseDto> {
    return this.prismaService.list_expense.create({
      data: createMListExpenseDto,
      include: {
        list_expense_group: { select: { name: true } },
        set_list_status: { select: { name: true } }
      }
    });
  }

  async findAll(): Promise<DataMListExpenseDto[]> {
    return this.prismaService.list_expense.findMany({
      include: {
        list_expense_group: { select: { name: true } },
        set_list_status: { select: { name: true } }
      },
      orderBy: { id: 'asc' }
    });
  }

  async findOne(id: number): Promise<DataMListExpenseDto> {
    return this.prismaService.list_expense.findFirst({
      where: { id: +id },
      include: {
        list_expense_group: { select: { name: true } },
        set_list_status: { select: { name: true } }
      }
    });
  }

  async update(id: number, updateMListExpenseDto: UpdateMListExpenseDto): Promise<DataMListExpenseDto> {
    return this.prismaService.list_expense.update({
      where: { id: +id },
      data: updateMListExpenseDto,
      include: {
        list_expense_group: { select: { name: true } },
        set_list_status: { select: { name: true } }
      }
    });
  }

  async remove(id: number): Promise<DataMListExpenseDto> {
    const r = await this.prismaService.dbm_expense.findFirst({ 
      where: {expense_id: +id},
    });

    if (r) throw new ForbiddenException(['Delete not allowed!'])

    return this.prismaService.list_expense.delete({
      where: { id: +id },
      include: {
        list_expense_group: { select: { name: true } },
        set_list_status: { select: { name: true } }
      }
    });
  }

  async listPagination(paginationItemsDto: PaginationItemsDto): Promise<{totals: PaginationTotalsDto, data: DataMListExpenseDto[]}> {

    // SORT
    let orderByObj = {};
    if (paginationItemsDto.sort_field && paginationItemsDto.sort_order) {
      const sortOrder = paginationItemsDto.sort_order == 'ascend' ? 'asc' : 'desc';
      const sortFields = paginationItemsDto.sort_field.split('.');
      if (sortFields.length > 1) {
        orderByObj = { [sortFields[0]]: { [sortFields[1]]: sortOrder } };
      } else {
        orderByObj[paginationItemsDto.sort_field] = sortOrder;
      }
    } else {
      orderByObj = { id: 'desc' };
    }

    // COUNT ITEM
    const _count = await this.prismaService.list_expense.count();

    const response = await this.prismaService.list_expense.findMany({
      skip: (paginationItemsDto.page_number - 1) * paginationItemsDto.page_size,
      take: paginationItemsDto.page_size,
      include: {
        list_expense_group: { select: { name: true } },
        set_list_status: { select: { name: true } }
      },
      orderBy: orderByObj,
    });

    // MERGE SUM ITEMS
    const totals = { count: _count };
    return { totals, data: response };
  }

  async listByGroup(id: number): Promise<DataMListExpenseDto[]> {
    return this.prismaService.list_expense.findMany({
      where: { expense_group_id: +id },
      include: {
        list_expense_group: { select: { name: true } },
        set_list_status: { select: { name: true } }
      },
      orderBy: { name: 'asc' }
    });
  }
}
