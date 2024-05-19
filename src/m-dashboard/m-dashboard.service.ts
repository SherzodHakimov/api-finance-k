import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service';
import { DataAmountCurrencyTypeDto } from './dto/data-amount-currency-type.dto';
import { BetweenDateDto } from '../m-reports/dto/between-date.dto';
import { DataMainExpenseReportDto } from '../m-reports/dto/data-main-expense-report.dto';
import { DataAmountAccountTypeCurrencyDto } from './dto/data-amount-account-type-currency.dto';

@Injectable()
export class MDashboardService {

  constructor(private prismaService: PrismaService) {}

  // EXPENSE LIST GROUPED BY EXPENSE GROUP AND WITH CONVERTED VALUE
  async expenseListByExpenseGroup(reportParams: BetweenDateDto): Promise<DataMainExpenseReportDto> {

    if (reportParams.date.length < 2) {
      throw new BadRequestException(['Date not found!'])
    }

    const date_start = new Date(reportParams.date[0]);
    const date_end = new Date(reportParams.date[1]);

    return this.prismaService.$queryRaw `
    select 
       s.id,
       s.name,
       round(sum(s.amount_local), 2) amount_local,
       round(sum(s.amount_convert), 2) amount_convert
          from (select r.expense_group_id                                                                            id,
                       r.name,
                       (case when r.kurs IS NULL then r.amount else (r.amount * r.kurs) end)                         amount_local,
                       (case when r.kurs IS NULL then r.amount / kurs_main else (r.amount * r.kurs) / kurs_main end) amount_convert
                from (select ex.expense_group_id,
                             eg.name,
                             amount,
                             (select (cv.buy_value + cv.sell_value) / 2 kurs
                              from dbm_currency_value cv
                                       left join list_currency lc on lc.id = cv.currency_1_id
                              where cv.value_date <= ex.operation_date
                                and cv.currency_1_id = ex.currency_id
                              order by cv.value_date desc
                              limit 1) kurs,
                             (select (cv.buy_value + cv.sell_value) / 2 kurs
                              from dbm_currency_value cv
                                       left join list_currency lc on lc.id = cv.currency_1_id
                              where cv.value_date <= ex.operation_date
                                and lc.currency_type_id = 2
                              order by cv.value_date desc
                              limit 1) kurs_main
                      from dbm_expense ex
                               left join list_expense_group eg on eg.id = ex.expense_group_id
                      where ex.operation_date >= ${date_start}
                        and ex.operation_date <= ${date_end}
                        and ex.status_id = 2) r) s
          group by s.id, s.name
          order by s.name;`
  }

  // EXPENSE LIST GROUPED BY PAYER AND WITH CONVERTED VALUE
  async expenseListByPayer(reportParams: BetweenDateDto): Promise<DataMainExpenseReportDto> {

    if (reportParams.date.length < 2) {
      throw new BadRequestException(['Date not found!'])
    }

    const date_start = new Date(reportParams.date[0]);
    const date_end = new Date(reportParams.date[1]);

    return this.prismaService.$queryRaw `
select
       s.id,
       s.name,
       round(sum(s.amount_local), 2) amount_local,
       round(sum(s.amount_convert), 2) amount_convert
          from (select r.payer_id                                                                            id,
                       r.name,
                       (case when r.kurs IS NULL then r.amount else (r.amount * r.kurs) end)                         amount_local,
                       (case when r.kurs IS NULL then r.amount / kurs_main else (r.amount * r.kurs) / kurs_main end) amount_convert
                from (select ex.payer_id,
                             eg.name,
                             amount,
                             (select (cv.buy_value + cv.sell_value) / 2 kurs
                              from dbm_currency_value cv
                                       left join list_currency lc on lc.id = cv.currency_1_id
                              where cv.value_date <= ex.operation_date
                                and cv.currency_1_id = ex.currency_id
                              order by cv.value_date desc
                              limit 1) kurs,
                             (select (cv.buy_value + cv.sell_value) / 2 kurs
                              from dbm_currency_value cv
                                       left join list_currency lc on lc.id = cv.currency_1_id
                              where cv.value_date <= ex.operation_date
                                and lc.currency_type_id = 2
                              order by cv.value_date desc
                              limit 1) kurs_main
                      from dbm_expense ex
                               left join list_payer eg on eg.id = ex.payer_id
                      where ex.operation_date >= ${date_start}
                        and ex.operation_date <= ${date_end}
                        and ex.status_id = 2) r) s
          group by s.id, s.name
          order by s.name;`
  }

  // SUM AMOUNT BY CURRENCY
  async amountByCurrencyType(): Promise<DataAmountCurrencyTypeDto[]>{

    return this.prismaService.$queryRaw `
    select r.curr_name,
           sum(r.income - r.outcome) amount
    from (select lc.name                                                        curr_name,
                 (case when o.operation_direction = 0 then o.amount else 0 end) outcome,
                 (case when o.operation_direction = 1 then o.amount else 0 end) income
          from dbm_operation o
                   left join list_currency lc on lc.id = o.currency_id
          where o.status_id = 2) r
    group by r.curr_name;`
  }

  // SUM AMOUNT BY ACCOUNT TYPE BANK AND POCKET
  async amountByAccountType(): Promise<DataAmountAccountTypeCurrencyDto[]>{

    return this.prismaService.$queryRaw `
    select u.name,
           round(sum(u.amount_convert), 2) amount_convert,
           round(sum(u.amount_local), 2) amount_local
    from (select s.name,
                 (sum(case when s.operation_direction = 1 then s.amount_convert else 0 end) -
                  sum(case when s.operation_direction = 0 then s.amount_convert else 0 end)) amount_convert,
                (sum(case when s.operation_direction = 1 then s.amount_local else 0 end) -
                  sum(case when s.operation_direction = 0 then s.amount_local else 0 end)) amount_local
          from (select r.name,
                       r.operation_direction,
                       (case when r.kurs IS NULL then r.amount / kurs_main else (r.amount * r.kurs) / kurs_main end) amount_convert,
                       (case when r.kurs IS NULL then r.amount else (r.amount * r.kurs) end) amount_local
                from (select at.name,
                             o.amount,
                             o.operation_direction,
                             o.operation_date,
                             (select (cv.buy_value + cv.sell_value) / 2 kurs
                              from dbm_currency_value cv
                                       left join list_currency lc on lc.id = cv.currency_1_id
                              where cv.value_date <= o.operation_date
                                and cv.currency_1_id = o.currency_id
                              order by cv.value_date desc
                              limit 1) kurs,
                             (select (cv.buy_value + cv.sell_value) / 2 kurs
                              from dbm_currency_value cv
                                       left join list_currency lc on lc.id = cv.currency_1_id
                              where cv.value_date <= o.operation_date
                                and lc.currency_type_id = 2
                              order by cv.value_date desc
                              limit 1) kurs_main
                      from dbm_operation o
                               left join set_account_type at on at.id = o.account_type_id
                      where o.status_id = 2) r) s
          group by s.name) u
    group by u.name;`

  }


}
