import { Injectable } from '@nestjs/common';
import { CreateMExpenseDto } from './dto/create-m-expense.dto';
import { UpdateMExpenseDto } from './dto/update-m-expense.dto';
import { PrismaService } from '../prisma-service';
import { DataMExpenseDto } from './dto/data-m-expense.dto';
import { DataMOperationStatusDto } from '../m-operations/dto/data-m-operation-status.dto';
import { PaginationItemsDto } from '../shared/dto/pagination-items.dto';
import { PaginationTotalsDto } from '../shared/dto/pagination-totals.dto';
import { DataMExpenseSecondDto } from './dto/data-m-expense-second.dto';
import { UpdateMDocTypeDto } from './dto/update-m-doc-type.dto';


@Injectable()
export class MExpensesService {

  constructor(private prismaService: PrismaService) {
  }

  async create(createMExpenseDto: CreateMExpenseDto): Promise<DataMExpenseDto> {
    return this.prismaService.dbm_expense.create({
      data: createMExpenseDto,
      include: {
        list_expense_group: { select: { name: true } },
        list_expense: { select: { name: true } },
        set_payment_doc: { select: { name: true } },
        list_measure: { select: { name: true, name_short: true } },
        set_account_type: { select: { name: true } },
        list_currency: { select: { name: true } },
        set_operation_status: { select: { name: true } },
        list_payer: { select: { name: true } },
        dbm_user: { select: { name1: true, name2: true } },
      },
    });
  }

  async findAll(): Promise<DataMExpenseDto[]> {
    return this.prismaService.dbm_expense.findMany({
      include: {
        list_expense_group: { select: { name: true } },
        list_expense: { select: { name: true } },
        set_payment_doc: { select: { name: true } },
        list_measure: { select: { name: true, name_short: true } },
        set_account_type: { select: { name: true } },
        list_currency: { select: { name: true } },
        set_operation_status: { select: { name: true } },
        list_payer: { select: { name: true } },
        dbm_user: { select: { name1: true, name2: true } },
      },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number): Promise<DataMExpenseDto> {
    return this.prismaService.dbm_expense.findFirst({
      where: { id: +id },
      include: {
        list_expense_group: { select: { name: true } },
        list_expense: { select: { name: true } },
        set_payment_doc: { select: { name: true } },
        list_measure: { select: { name: true, name_short: true } },
        set_account_type: { select: { name: true } },
        list_currency: { select: { name: true } },
        set_operation_status: { select: { name: true } },
        list_payer: { select: { name: true } },
        dbm_user: { select: { name1: true, name2: true } },
      },
    });
  }

  async update(id: number, updateMExpenseDto: UpdateMExpenseDto): Promise<DataMExpenseDto> {
    return this.prismaService.dbm_expense.update({
      where: { id: +id },
      data: updateMExpenseDto,
      include: {
        list_expense_group: { select: { name: true } },
        list_expense: { select: { name: true } },
        set_payment_doc: { select: { name: true } },
        list_measure: { select: { name: true, name_short: true } },
        set_account_type: { select: { name: true } },
        list_currency: { select: { name: true } },
        set_operation_status: { select: { name: true } },
        list_payer: { select: { name: true } },
        dbm_user: { select: { name1: true, name2: true } },
      },
    });
  }

  async remove(id: number): Promise<DataMExpenseDto> {
    return this.prismaService.dbm_expense.delete({
      where: { id: +id },
      include: {
        list_expense_group: { select: { name: true } },
        list_expense: { select: { name: true } },
        set_payment_doc: { select: { name: true } },
        list_measure: { select: { name: true, name_short: true } },
        set_account_type: { select: { name: true } },
        list_currency: { select: { name: true } },
        set_operation_status: { select: { name: true } },
        list_payer: { select: { name: true } },
        dbm_user: { select: { name1: true, name2: true } },
      },
    });
  }

  async updateStatus(id: number, updateMExpenseDto: UpdateMExpenseDto): Promise<DataMOperationStatusDto> {

    const operation: DataMExpenseSecondDto = await this.prismaService.dba_expense_operation.findFirst({
      where: { income_operation_id: +id },
    });

    const [oper, exp] = await this.prismaService.$transaction([
        this.prismaService.dbm_operation.update({
          where: { id: operation.outcome_operation_id },
          data: { status_id: updateMExpenseDto.status_id },
        }),
        this.prismaService.dbm_expense.update({
          where: { id: +id },
          data: { status_id: updateMExpenseDto.status_id },
          select: {
            id: true,
            status_id: true,
            set_operation_status: { select: { name: true } },
          },
        }),
      ])

      return exp;

  }

  async listPagination(paginationItemsDto: PaginationItemsDto): Promise<{
    totals: PaginationTotalsDto,
    data: DataMExpenseDto[]
  }> {

    // FILTER
    const whereObj = [];
    if (paginationItemsDto.filter) {
      paginationItemsDto.filter.forEach(el => {
        const keyNames = el.key.split('.');
        const arr = [];
        if (el.value.length > 0) {
          el.value.forEach(v => {
            let objType: any;
            if (keyNames.length > 1) {
              objType = { [keyNames[0]]: { [keyNames[1]]: v } };
            } else {
              objType = { [el.key]: v };
            }
            arr.push({ ...objType });
          });
          whereObj.push({ OR: arr });
        }
      });
    }

    // AMOUNT FILTER
    if (paginationItemsDto.amount_from && paginationItemsDto.amount_to) {
      whereObj.push({
        OR: [
          {
            amount: {
              gte: paginationItemsDto.amount_from,
              lte: paginationItemsDto.amount_to,
            },
          },
        ],
      });
    }

    // DATE FILTER
    if (paginationItemsDto.date) {
      whereObj.push({
        operation_date: {
          gte: new Date(paginationItemsDto.date[0]), // Start of date range
          lte: new Date(paginationItemsDto.date[1]), // End of date range
        },
      });
    }
    // console.log(JSON.stringify(whereObj));


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
    const _count = await this.prismaService.dbm_expense.count({
      where: {
        AND: whereObj,
      },
    });

    // SUM ITEM
    const total = await this.prismaService.dbm_expense.aggregate({
      where: {
        AND: [...whereObj],
      },
      _sum: {
        amount: true,
      },
    });

    const response = await this.prismaService.dbm_expense.findMany({
      skip: (paginationItemsDto.page_number - 1) * paginationItemsDto.page_size,
      take: paginationItemsDto.page_size,
      where: {
        AND: whereObj,
      },
      include: {
        list_expense_group: { select: { name: true } },
        list_expense: { select: { name: true } },
        set_payment_doc: { select: { name: true } },
        list_measure: { select: { name: true, name_short: true } },
        set_account_type: { select: { name: true } },
        list_currency: { select: { name: true } },
        set_operation_status: { select: { name: true } },
        list_payer: { select: { name: true } },
        dbm_user: { select: { name1: true, name2: true } },
      },
      orderBy: orderByObj,
    });

    // MERGE SUM ITEMS
    const totals = { count: _count, sum: { amount: Number(total._sum.amount) } };
    return { totals, data: response };
  }

  async confirmItems(arr: number[]): Promise<number> {

    const contr_ids = await this.prismaService.dba_expense_operation.findMany({
      where: {
        income_operation_id: {
          in: arr,
        },
      },
    })

    const contr_ids_arr = contr_ids.map(item => item.outcome_operation_id)
    await this.prismaService.dbm_operation.updateMany({
      where: {
        id: {
          in: contr_ids_arr,
        },
      },
      data: { status_id: 2 },
    })

    const updateItems = await this.prismaService.dbm_expense.updateMany({
      where: {
        id: {
          in: arr,
        },
      },
      data: { status_id: 2 },
    });
    return updateItems.count;
  }

  async updateDocType(id: number, updateDocTypeDto: UpdateMDocTypeDto): Promise<UpdateMDocTypeDto> {
   return this.prismaService.dbm_expense.update({
     data: { payment_doc_id: updateDocTypeDto.payment_doc_id },
     where: {
       id: +id,
     }
   });
  }
}
