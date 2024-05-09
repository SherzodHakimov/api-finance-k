import { Injectable } from '@nestjs/common';
import { CreateMExpenseDto } from './dto/create-m-expense.dto';
import { UpdateMExpenseDto } from './dto/update-m-expense.dto';
import { PrismaService } from '../prisma-service';
import { DataMExpenseDto } from './dto/data-m-expense.dto';
import { DataMOperationPaginationDto } from '../m-operations/dto/data-m-operation-pagination.dto';
import { DataMOperationStatusDto } from '../m-operations/dto/data-m-operation-status.dto';

@Injectable()
export class MExpensesService {

  constructor(private prismaService: PrismaService) {}

  async create(createMExpenseDto: CreateMExpenseDto): Promise<DataMExpenseDto> {
    return this.prismaService.dbm_expense.create({
      data: createMExpenseDto,
      include: {
        list_expense_group: {select: {name: true}},
        list_expense: {select: {name: true}},
        set_payment_doc: {select: {name: true}},
        list_measure: {select: {name: true, name_short: true}},
        set_account_type: {select: {name: true}},
        list_currency: {select: {name: true}},
        set_operation_status: {select: {name: true}},
        list_payer: {select: {name: true}},
        dbm_user: {select: {name1: true, name2: true}},
      }
    });
  }

  async findAll(): Promise<DataMExpenseDto[]> {
    return this.prismaService.dbm_expense.findMany({
      include: {
        list_expense_group: {select: {name: true}},
        list_expense: {select: {name: true}},
        set_payment_doc: {select: {name: true}},
        list_measure: {select: {name: true, name_short: true}},
        set_account_type: {select: {name: true}},
        list_currency: {select: {name: true}},
        set_operation_status: {select: {name: true}},
        list_payer: {select: {name: true}},
        dbm_user: {select: {name1: true, name2: true}},
      },
      orderBy: { id: 'asc' }
    });
  }

  async findOne(id: number): Promise<DataMExpenseDto> {
    return this.prismaService.dbm_expense.findFirst({
      where: { id: +id },
      include: {
        list_expense_group: {select: {name: true}},
        list_expense: {select: {name: true}},
        set_payment_doc: {select: {name: true}},
        list_measure: {select: {name: true, name_short: true}},
        set_account_type: {select: {name: true}},
        list_currency: {select: {name: true}},
        set_operation_status: {select: {name: true}},
        list_payer: {select: {name: true}},
        dbm_user: {select: {name1: true, name2: true}},
      }
    });
  }

  async update(id: number, updateMExpenseDto: UpdateMExpenseDto): Promise<DataMExpenseDto> {
    return this.prismaService.dbm_expense.update({
      where: { id: +id },
      data: updateMExpenseDto,
      include: {
        list_expense_group: {select: {name: true}},
        list_expense: {select: {name: true}},
        set_payment_doc: {select: {name: true}},
        list_measure: {select: {name: true, name_short: true}},
        set_account_type: {select: {name: true}},
        list_currency: {select: {name: true}},
        set_operation_status: {select: {name: true}},
        list_payer: {select: {name: true}},
        dbm_user: {select: {name1: true, name2: true}},
      }
    });
  }

  async remove(id: number): Promise<DataMExpenseDto> {
    return this.prismaService.dbm_expense.delete({
      where: { id: +id },
      include: {
        list_expense_group: {select: {name: true}},
        list_expense: {select: {name: true}},
        set_payment_doc: {select: {name: true}},
        list_measure: {select: {name: true, name_short: true}},
        set_account_type: {select: {name: true}},
        list_currency: {select: {name: true}},
        set_operation_status: {select: {name: true}},
        list_payer: {select: {name: true}},
        dbm_user: {select: {name1: true, name2: true}},
      }
    });
  }

  async updateStatus(id: number, updateMExpenseDto: UpdateMExpenseDto): Promise<DataMOperationStatusDto> {
    return this.prismaService.dbm_expense.update({
      where: { id: +id },
      data: {status_id: updateMExpenseDto.status_id},
      select: {
        id: true,
        status_id: true,
        set_operation_status:  { select: { name: true } },
      }
    });
  }

  async listPagination(dataMOperationPaginationDto: DataMOperationPaginationDto): Promise<{totals: any, data:DataMExpenseDto[]}> {

    // FILTER
    const whereObj = [];
    if (dataMOperationPaginationDto.filter){
      dataMOperationPaginationDto.filter.forEach(el => {
        const keyNames = el.key.split('.');
        const arr = [];
        if (el.value.length > 0){
          el.value.forEach(v => {
            let objType: any;
            if (keyNames.length > 1){
              objType = {[keyNames[0]] : {[keyNames[1]] : v}}
            } else {
              objType = {[el.key] : v}
            }
            arr.push({...objType})
          });
          whereObj.push({OR: arr})
        }
      });
    }

    // AMOUNT FILTER
    if (dataMOperationPaginationDto.amount_from && dataMOperationPaginationDto.amount_to){
      whereObj.push({
        OR:[
          {
            amount: {
              gte: dataMOperationPaginationDto.amount_from,
              lte: dataMOperationPaginationDto.amount_to
            }}
        ]
      });
    }

    // DATE FILTER
    if (dataMOperationPaginationDto.date){
      whereObj.push({
        operation_date: {
          gte: new Date(dataMOperationPaginationDto.date[0]), // Start of date range
          lte: new Date(dataMOperationPaginationDto.date[1]) // End of date range
        },
      })
    }
    // console.log(JSON.stringify(whereObj));


    // SORT
    let orderByObj = {};
    if (dataMOperationPaginationDto.sort_field && dataMOperationPaginationDto.sort_order){
      const sortOrder = dataMOperationPaginationDto.sort_order == 'ascend' ?  'asc' : 'desc'
      const sortFields = dataMOperationPaginationDto.sort_field.split('.');
      if (sortFields.length > 1){
        orderByObj = {[sortFields[0]] : {[sortFields[1]] : sortOrder}}
      } else {
        if (dataMOperationPaginationDto.sort_field === 'in_amount' || dataMOperationPaginationDto.sort_field === 'out_amount'){
          if (dataMOperationPaginationDto.sort_field === 'in_amount'){
            orderByObj = [{operation_direction:  'desc' },{amount: sortOrder}];
          }
          if (dataMOperationPaginationDto.sort_field === 'out_amount'){
            orderByObj = [{operation_direction: 'asc' },{amount: sortOrder}];
          }
        } else {
          orderByObj[dataMOperationPaginationDto.sort_field] = sortOrder;
        }
      }
    } else {
      orderByObj = { id: 'desc'};
    }

    // COUNT ITEM
    const _count = await this.prismaService.dbm_expense.count({
      where: {
        AND: whereObj
      }
    })

    // SUM ITEM
    const total = await this.prismaService.dbm_expense.aggregate({
      where: {
        AND: [...whereObj]
      },
      _sum:{
        amount: true
      },
    })

    const response = await this.prismaService.dbm_expense.findMany({
      skip: (dataMOperationPaginationDto.page_number - 1) * dataMOperationPaginationDto.page_size,
      take: dataMOperationPaginationDto.page_size,
      where: {
        AND: whereObj
      },
      include: {
        list_expense_group: {select: {name: true}},
        list_expense: {select: {name: true}},
        set_payment_doc: {select: {name: true}},
        list_measure: {select: {name: true, name_short: true}},
        set_account_type: {select: {name: true}},
        list_currency: {select: {name: true}},
        set_operation_status: {select: {name: true}},
        list_payer: {select: {name: true}},
        dbm_user: {select: {name1: true, name2: true}},
      },
      orderBy: orderByObj
    });

    // MERGE SUM ITEMS
    const totals = {count: _count, sum: {amount_out: total._sum.amount, amount_in: 0}};
    return {totals, data: response};
  }

  async confirmItems(arr: number[]): Promise<number> {
    const updateItems = await this.prismaService.dbm_expense.updateMany({
      where: {
        id: {
          in: arr
        }
      },
      data: {status_id: 2}
    });
    return updateItems.count
  }
}
