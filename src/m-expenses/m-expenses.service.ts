import { Injectable } from '@nestjs/common';
import { CreateMExpenseDto } from './dto/create-m-expense.dto';
import { UpdateMExpenseDto } from './dto/update-m-expense.dto';
import { PrismaService } from '../prisma-service';
import { DataMExpenseDto } from './dto/data-m-expense.dto';

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
}
