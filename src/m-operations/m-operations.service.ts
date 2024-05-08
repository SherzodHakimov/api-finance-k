import { Injectable } from '@nestjs/common';
import { CreateMOperationDto } from './dto/create-m-operation.dto';
import { UpdateMOperationDto } from './dto/update-m-operation.dto';
import { PrismaService } from '../prisma-service';
import { DataMOperationDto } from './dto/data-m-operation.dto';
import { UpdateMOperationStatusDto } from './dto/update-m-operation-status.dto';
import { DataMOperationStatusDto } from './dto/data-m-operation-status.dto';
import { DataToCheckMOperationInitDto } from './dto/data-to-check-m-operation-init.dto';
import { DataMOperationPaginationDto } from './dto/data-m-operation-pagination.dto';
import { CreateMOperationAccToAccDto } from './dto/create-m-operation-acc-to-acc.dto';
import { DataMOperationDoubleDts } from './dto/data-m-operation-double.dts';
import { CreateMOperationConvertDto } from './dto/create-m-operation-convert.dto';
import { CreateMOperationBankCashCardDto } from './dto/create-m-operation-bank-cash-card.dto';
import { CreateMOperationExpenseDto } from './dto/create-m-operation-expense.dto';
import { CreateMExpenseDto } from '../m-expenses/dto/create-m-expense.dto';
import { DataMOperationDoubleExpenseDto } from './dto/data-m-operation-double-expense.dto';

@Injectable()
export class MOperationsService {

  constructor(private prismaService: PrismaService) {}

  async create(createMOperationDto: CreateMOperationDto): Promise<DataMOperationDto> {

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

  async findAll(): Promise<DataMOperationDto[]> {
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

  async findOne(id: number): Promise<DataMOperationDto> {
    return this.prismaService.dbm_operation.findFirst({
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

  async update(id: number, updateMOperationDto: UpdateMOperationDto): Promise<DataMOperationDto> {
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

  async remove(id: number): Promise<DataMOperationDto> {
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

  async listPagination(id: number, dataMOperationPaginationDto: DataMOperationPaginationDto): Promise<{totals: any, data:DataMOperationDto[]}> {

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
    whereObj.unshift({account_type_id: +id});

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
    const _count = await this.prismaService.dbm_operation.count({
      where: {
        AND: whereObj
      }
    })

    // SUM ITEM
    const totalIn = [...whereObj];
    totalIn.unshift({operation_direction: 1});
    const totalOut = [...whereObj];
    totalOut.unshift({operation_direction: 0});

    const [out_sum, in_sum] = await this.prismaService.$transaction([
      this.prismaService.dbm_operation.aggregate({
        where: {
          AND: totalOut
        },
        _sum:{
          amount: true
        },
      }),
      this.prismaService.dbm_operation.aggregate({
        where: {
          AND: totalIn
        },
        _sum:{
          amount: true
        },
      })
    ]);

    const response = await this.prismaService.dbm_operation.findMany({
      skip: (dataMOperationPaginationDto.page_number - 1) * dataMOperationPaginationDto.page_size,
      take: dataMOperationPaginationDto.page_size,
      where: {
        AND: whereObj
      },
      include: {
        set_operation:  { select: { name: true } },
        list_account:  { select: { name: true } },
        set_account_type:  { select: { name: true } },
        list_currency:  { select: { name: true } },
        set_operation_status:  { select: { name: true } },
        dbm_user:  { select: { name1: true, name2: true } }
      },
      orderBy: orderByObj
    });

    // MERGE SUM ITEMS
    const totals = {count: _count, sum: {amount_out: out_sum._sum.amount, amount_in: in_sum._sum.amount}};
    return {totals, data: response};
  }

  async updateStatus(id: number, updateMOperationStatusDto: UpdateMOperationStatusDto): Promise<DataMOperationStatusDto> {
    return this.prismaService.dbm_operation.update({
      where: { id: +id },
      data: {status_id: updateMOperationStatusDto.status_id},
      select: {
        id: true,
        status_id: true,
        set_operation_status:  { select: { name: true } },
      }
    });
  }

  async isHasAnyOperation(checkMOperationInitDto: DataToCheckMOperationInitDto): Promise<boolean> {
    const r = await this.prismaService.dbm_operation.findFirst({
      where: {
        account_type_id: checkMOperationInitDto.account_type_id,
        account_id: checkMOperationInitDto.account_id
      }
    });
    return !!r;
  }

  async createAccToAcc(createMOperationAccToAccDto: CreateMOperationAccToAccDto): Promise<[DataMOperationDoubleDts, DataMOperationDoubleDts]> {

    // PREPARE DATA
    const dataUni = {
      operation_date: createMOperationAccToAccDto.operation_date,
      operation_id: createMOperationAccToAccDto.operation_id,
      comment: createMOperationAccToAccDto.comment,
      user_id: createMOperationAccToAccDto.user_id,
      status_id: createMOperationAccToAccDto.status_id,
      currency_id: createMOperationAccToAccDto.currency_id,
      account_type_id: createMOperationAccToAccDto.account_type_id,
      amount: createMOperationAccToAccDto.amount
    }

    const dataOut = {
      operation_direction: 0,
      account_id: createMOperationAccToAccDto.out_account_id
    }

    const dataIn = {
      operation_direction: 1,
      account_id: createMOperationAccToAccDto.in_account_id
    }

    // CREATE ITEMS
    const [out_tr, in_tr] = await this.prismaService.$transaction([
      this.prismaService.dbm_operation.create({
        data: Object.assign({...dataUni}, {...dataOut}),
        include: {
          set_operation:  { select: { name: true } },
          list_account:  { select: { name: true } },
          set_account_type:  { select: { name: true } },
          list_currency:  { select: { name: true } },
          set_operation_status:  { select: { name: true } },
          dbm_user:  { select: { name1: true, name2: true } }
        }
      }),
      this.prismaService.dbm_operation.create({
        data: Object.assign({...dataUni}, {...dataIn}),
        include: {
          set_operation:  { select: { name: true } },
          list_account:  { select: { name: true } },
          set_account_type:  { select: { name: true } },
          list_currency:  { select: { name: true } },
          set_operation_status:  { select: { name: true } },
          dbm_user:  { select: { name1: true, name2: true } }
        }
      })
    ]);

    // BIND OPERATION
    const bindOperation = {
      outcome_operation_id: out_tr.id,
      income_operation_id: in_tr.id
    };
    const bindId = await this.prismaService.dba_transfer_operation.create({
      data: bindOperation
    });

    return [
      Object.assign(out_tr, {bind_operation: bindId}) as DataMOperationDoubleDts,
      Object.assign(in_tr, {bind_operation: bindId}) as DataMOperationDoubleDts
    ];
  }

  async createConvert(createMOperationConvertDto: CreateMOperationConvertDto): Promise<[DataMOperationDoubleDts, DataMOperationDoubleDts]> {

    // PREPARE DATA
    const dataUni = {
      operation_date: createMOperationConvertDto.operation_date,
      operation_id: createMOperationConvertDto.operation_id,
      comment: createMOperationConvertDto.comment,
      user_id: createMOperationConvertDto.user_id,
      status_id: createMOperationConvertDto.status_id,
      account_type_id: createMOperationConvertDto.account_type_id,
    }

    const dataOut = {
      operation_direction: 0,
      amount: createMOperationConvertDto.out_amount,
      currency_id: createMOperationConvertDto.out_currency_id,
      account_id: createMOperationConvertDto.out_account_id
    }

    const dataIn = {
      operation_direction: 1,
      amount: createMOperationConvertDto.in_amount,
      currency_id: createMOperationConvertDto.in_currency_id,
      account_id: createMOperationConvertDto.in_account_id
    }

    // CREATE ITEMS
    const [out_tr, in_tr] = await this.prismaService.$transaction([
      this.prismaService.dbm_operation.create({
        data: Object.assign({...dataUni}, {...dataOut}),
        include: {
          set_operation:  { select: { name: true } },
          list_account:  { select: { name: true } },
          set_account_type:  { select: { name: true } },
          list_currency:  { select: { name: true } },
          set_operation_status:  { select: { name: true } },
          dbm_user:  { select: { name1: true, name2: true } }
        }
      }),
      this.prismaService.dbm_operation.create({
        data: Object.assign({...dataUni}, {...dataIn}),
        include: {
          set_operation:  { select: { name: true } },
          list_account:  { select: { name: true } },
          set_account_type:  { select: { name: true } },
          list_currency:  { select: { name: true } },
          set_operation_status:  { select: { name: true } },
          dbm_user:  { select: { name1: true, name2: true } }
        }
      })
    ]);

    // BIND OPERATION
    const bindOperation = {
      outcome_operation_id: out_tr.id,
      income_operation_id: in_tr.id
    };
    const bindId = await this.prismaService.dba_transfer_operation.create({
      data: bindOperation
    });

    return [
      Object.assign(out_tr, {bind_operation: bindId}) as DataMOperationDoubleDts,
      Object.assign(in_tr, {bind_operation: bindId}) as DataMOperationDoubleDts
    ];
  }

  async createBankCashCard(createMOperationBankCashCardDto: CreateMOperationBankCashCardDto): Promise<[DataMOperationDoubleDts, DataMOperationDoubleDts]> {

    // PREPARE DATA
    const dataUni = {
      operation_date: createMOperationBankCashCardDto.operation_date,
      operation_id: createMOperationBankCashCardDto.operation_id,
      comment: createMOperationBankCashCardDto.comment,
      user_id: createMOperationBankCashCardDto.user_id,
      status_id: createMOperationBankCashCardDto.status_id,
      currency_id: createMOperationBankCashCardDto.currency_id,
      amount: createMOperationBankCashCardDto.amount,
    }

    const dataOut = {
      operation_direction: 0,
      account_id: createMOperationBankCashCardDto.out_account_id,
      account_type_id: createMOperationBankCashCardDto.out_account_type_id
    }

    const dataIn = {
      operation_direction: 1,
      account_id: createMOperationBankCashCardDto.in_account_id,
      account_type_id: createMOperationBankCashCardDto.in_account_type_id
    }

    // CREATE ITEMS
    const [out_tr, in_tr] = await this.prismaService.$transaction([
      this.prismaService.dbm_operation.create({
        data: Object.assign({...dataUni}, {...dataOut}),
        include: {
          set_operation:  { select: { name: true } },
          list_account:  { select: { name: true } },
          set_account_type:  { select: { name: true } },
          list_currency:  { select: { name: true } },
          set_operation_status:  { select: { name: true } },
          dbm_user:  { select: { name1: true, name2: true } }
        }
      }),
      this.prismaService.dbm_operation.create({
        data: Object.assign({...dataUni}, {...dataIn}),
        include: {
          set_operation:  { select: { name: true } },
          list_account:  { select: { name: true } },
          set_account_type:  { select: { name: true } },
          list_currency:  { select: { name: true } },
          set_operation_status:  { select: { name: true } },
          dbm_user:  { select: { name1: true, name2: true } }
        }
      })
    ]);

    // BIND OPERATION
    const bindOperation = {
      outcome_operation_id: out_tr.id,
      income_operation_id: in_tr.id
    };
    const bindId = await this.prismaService.dba_transfer_operation.create({
      data: bindOperation
    });

    return [
      Object.assign(out_tr, {bind_operation: bindId}) as DataMOperationDoubleDts,
      Object.assign(in_tr, {bind_operation: bindId}) as DataMOperationDoubleDts
    ];
  }

  async createExpense(createMOperationExpenseDto: CreateMOperationExpenseDto): Promise<[DataMOperationDoubleDts, DataMOperationDoubleExpenseDto]> {

    // PREPARE DATA
    const dataUni = {
      operation_date: createMOperationExpenseDto.operation_date,
      comment: createMOperationExpenseDto.comment,
      user_id: createMOperationExpenseDto.user_id,
      status_id: createMOperationExpenseDto.status_id,
      amount: createMOperationExpenseDto.amount,
      account_type_id: createMOperationExpenseDto.account_type_id,
      currency_id: createMOperationExpenseDto.currency_id,
    }

    const dataOut = {
      operation_direction: 0,
      account_id: createMOperationExpenseDto.account_id,
      operation_id: createMOperationExpenseDto.operation_id
    }

    const dataIn = {
      count: createMOperationExpenseDto.count,
      expense_group_id: createMOperationExpenseDto.expense_group_id,
      expense_id: createMOperationExpenseDto.expense_id,
      payment_doc_id: createMOperationExpenseDto.payment_doc_id,
      measure_id: createMOperationExpenseDto.measure_id,
      payer_id: createMOperationExpenseDto.payer_id,
    }

    // CREATE ITEMS
    const [out_tr, in_tr] = await this.prismaService.$transaction([
      this.prismaService.dbm_operation.create({
        data: Object.assign({...dataOut}, {...dataUni}) as CreateMOperationDto,
        include: {
          set_operation:  { select: { name: true } },
          list_account:  { select: { name: true } },
          set_account_type:  { select: { name: true } },
          list_currency:  { select: { name: true } },
          set_operation_status:  { select: { name: true } },
          dbm_user:  { select: { name1: true, name2: true } }
        }
      }),
       this.prismaService.dbm_expense.create({
        data: Object.assign({...dataIn}, {...dataUni}) as CreateMExpenseDto,
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
      })

    ]);

    // BIND OPERATION
    const bindOperation = {
      outcome_operation_id: out_tr.id,
      income_operation_id: in_tr.id
    };
    const bindId = await this.prismaService.dba_expense_operation.create({
      data: bindOperation
    });

    return [
      Object.assign(out_tr, {bind_operation: bindId}) as DataMOperationDoubleDts,
      Object.assign(in_tr, {bind_operation: bindId}) as DataMOperationDoubleExpenseDto
    ];
  }
}
