import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service';
import { BetweenDateDto } from './dto/between-date.dto';
import { DataMainReportDto } from './dto/data-main-report.dto';
import { DataMainAllReportDto } from './dto/data-main-all-report.dto';
import { DataMainExpenseReportDto } from './dto/data-main-expense-report.dto';
import { DataMainCurrencyValuesDto } from './dto/data-main-currency-values.dto';
import { BetweenDateIdDto } from './dto/between-date-id.dto';
import { DataMExpenseDto } from '../m-expenses/dto/data-m-expense.dto';

@Injectable()
export class MReportsService {

  constructor(private prismaService: PrismaService) {}

  async mainLocal(reportParams: BetweenDateDto): Promise<DataMainReportDto> {

    if (reportParams.date.length < 2) {
      throw new BadRequestException(['Date not found!'])
    }

    const date_start = new Date(reportParams.date[0]);
    const date_end = new Date(reportParams.date[1]);

    return  this.prismaService.$queryRaw `
    select sum(u.sum_start)                                         s_start,
           sum(u.sum_income)                                        inc,
           sum(u.sum_income_proc)                                   inc_prc,
           sum(u.sum_outcome)                                       out,
           sum(u.sum_expense)                                       out_exp,
           sum(u.sum_income_perebroska)                             inc_per,
           sum(u.sum_outcome_perebroska)                            out_per,
           sum(u.sum_income_convert)                                inc_con,
           sum(u.sum_outcome_convert)                               out_con,
           sum(u.sum_start + u.sum_income + u.sum_income_proc + u.sum_income_perebroska - u.sum_outcome_perebroska + sum_income_convert -
               sum_outcome_convert - u.sum_outcome - u.sum_expense) s_end
    from (select (sum(case when s.operation_direction = 1 then s.amount else 0 end) -
                  sum(case when s.operation_direction = 0 then s.amount else 0 end)) sum_start,
                 sum(0)                                                              sum_income,
                 sum(0)                                                              sum_income_proc,
                 sum(0)                                                              sum_outcome,
                 sum(0)                                                              sum_expense,
                 sum(0)                                                              sum_income_perebroska,
                 sum(0)                                                              sum_outcome_perebroska,
                 sum(0)                                                              sum_income_convert,
                 sum(0)                                                              sum_outcome_convert
          from (select r.operation_id,
                       r.operation_direction,
                       (case when r.kurs IS NULL then r.amount else (r.amount * r.kurs) end) amount
                from (select o.operation_id,
                             o.amount,
                             o.operation_direction,
                             o.operation_date,
                             (select (cv.buy_value + cv.sell_value) / 2 kurs
                              from dbm_currency_value cv
                                       left join list_currency lc on lc.id = cv.currency_1_id
                              where cv.value_date <= o.operation_date
                                and cv.currency_1_id = o.currency_id
                              order by cv.value_date desc
                              limit 1) kurs
                      from dbm_operation o
                      where o.operation_date < ${date_start}
                        and o.status_id = 2) r) s
    
          union all
    
          select sum(0)                                                                                                                                                       sum_start,
                 sum(case
                         when s.operation_direction = 1 and
                              (s.operation_id = 1 or s.operation_id = 2 ) then s.amount
                         else 0 end)                                                                                                                                          sum_income,
                 sum(case when s.operation_direction = 1 and s.operation_id = 10 then s.amount else 0 end)                                                                    sum_income_proc,                         
                 sum(case when s.operation_direction = 0 and s.operation_id = 8 then s.amount else 0 end)                                                                     sum_outcome,
                 sum(case when s.operation_direction = 0 and s.operation_id = 3 then s.amount else 0 end)                                                                     sum_expense,
                 sum(case when s.operation_direction = 1 and (s.operation_id = 4 or s.operation_id = 6 or s.operation_id = 7 or s.operation_id = 9) then s.amount else 0 end) sum_income_perebroska,
                 sum(case when s.operation_direction = 0 and (s.operation_id = 4 or s.operation_id = 6 or s.operation_id = 7 or s.operation_id = 9) then s.amount else 0 end) sum_outcome_perebroska,
                 sum(case when s.operation_direction = 1 and s.operation_id = 5 then s.amount else 0 end)                                                                     sum_income_convert,
                 sum(case when s.operation_direction = 0 and s.operation_id = 5 then s.amount else 0 end)                                                                     sum_outcome_convert
          from (select r.operation_id,
                       r.operation_direction,
                       (case when r.kurs IS NULL then r.amount else (r.amount * r.kurs) end) amount
                from (select o.operation_id,
                             o.amount,
                             o.operation_direction,
                             o.operation_date,
                             (select (cv.buy_value + cv.sell_value) / 2 kurs
                              from dbm_currency_value cv
                                       left join list_currency lc on lc.id = cv.currency_1_id
                              where cv.value_date <= o.operation_date
                                and cv.currency_1_id = o.currency_id
                              order by cv.value_date desc
                              limit 1) kurs
                      from dbm_operation o
                      where o.operation_date >= ${date_start}
                        and o.operation_date <= ${date_end}
                        and o.status_id = 2) r) s) u;`
  }

  async mainConvert(reportParams: BetweenDateDto): Promise<DataMainReportDto> {

    if (reportParams.date.length < 2) {
      throw new BadRequestException(['Date not found!'])
    }

    const date_start = new Date(reportParams.date[0]);
    const date_end = new Date(reportParams.date[1]);

    return  this.prismaService.$queryRaw `
    select round(sum(u.sum_start), 2)                                         s_start,
           round(sum(u.sum_income), 2)                                        inc,
           round(sum(u.sum_income_proc), 2)                                   inc_prc,
           round(sum(u.sum_outcome), 2)                                       out,
           round(sum(u.sum_expense), 2)                                       out_exp,
           round(sum(u.sum_income_perebroska), 2)                             inc_per,
           round(sum(u.sum_outcome_perebroska), 2)                            out_per,
           round(sum(u.sum_income_convert), 2)                                inc_con,
           round(sum(u.sum_outcome_convert), 2)                               out_con,
           round(sum(u.sum_start + u.sum_income + u. sum_income_proc + u.sum_income_perebroska - u.sum_outcome_perebroska + sum_income_convert -
               sum_outcome_convert - u.sum_outcome - u.sum_expense), 2)       s_end
    from (select (sum(case when s.operation_direction = 1 then s.amount else 0 end) -
                  sum(case when s.operation_direction = 0 then s.amount else 0 end)) sum_start,
                 sum(0)                                                              sum_income,
                 sum(0)                                                              sum_income_proc,
                 sum(0)                                                              sum_outcome,
                 sum(0)                                                              sum_expense,
                 sum(0)                                                              sum_income_perebroska,
                 sum(0)                                                              sum_outcome_perebroska,
                 sum(0)                                                              sum_income_convert,
                 sum(0)                                                              sum_outcome_convert
          from (select r.operation_id,
                       r.operation_direction,
                       (case when r.kurs IS NULL then r.amount / kurs_main else (r.amount * r.kurs) / kurs_main end) amount
                from (select o.operation_id,
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
                          where o.operation_date < ${date_start}
                        and o.status_id = 2) r) s
    
          union all
    
          select sum(0)                                                                                                                                                       sum_start,
                 sum(case
                         when s.operation_direction = 1 and
                              (s.operation_id = 1 or s.operation_id = 2) then s.amount
                         else 0 end)                                                                                                                                          sum_income,
                 sum(case when s.operation_direction = 1 and s.operation_id = 10 then s.amount else 0 end)                                                                    sum_income_proc,                         
                 sum(case when s.operation_direction = 0 and s.operation_id = 8 then s.amount else 0 end)                                                                     sum_outcome,
                 sum(case when s.operation_direction = 0 and s.operation_id = 3 then s.amount else 0 end)                                                                     sum_expense,
                 sum(case when s.operation_direction = 1 and (s.operation_id = 4 or s.operation_id = 6 or s.operation_id = 7 or s.operation_id = 9) then s.amount else 0 end) sum_income_perebroska,
                 sum(case when s.operation_direction = 0 and (s.operation_id = 4 or s.operation_id = 6 or s.operation_id = 7 or s.operation_id = 9) then s.amount else 0 end) sum_outcome_perebroska,
                 sum(case when s.operation_direction = 1 and s.operation_id = 5 then s.amount else 0 end)                                                                     sum_income_convert,
                 sum(case when s.operation_direction = 0 and s.operation_id = 5 then s.amount else 0 end)                                                                     sum_outcome_convert
          from (select r.operation_id,
                       r.operation_direction,
                       (case when r.kurs IS NULL then r.amount / kurs_main else (r.amount * r.kurs) / kurs_main end) amount
                from (select o.operation_id,
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
                          where o.operation_date >= ${date_start}
                            and o.operation_date <= ${date_end}
                        and o.status_id = 2) r) s) u;`
  }

  async mainAll(reportParams: BetweenDateDto): Promise<DataMainAllReportDto> {

    if (reportParams.date.length < 2) {
      throw new BadRequestException(['Date not found!'])
    }

    const date_start = new Date(reportParams.date[0]);
    const date_end = new Date(reportParams.date[1]);

    return  this.prismaService.$queryRaw `
    select r.bank_name,
           r.currency_name                                                                                                                                                 curr_name,
           sum(r.sum_start)                                                                                                                                                s_start,
           sum(r.sum_income)                                                                                                                                               inc,
           sum(r.sum_income_proc)                                                                                                                                          inc_prc,
           sum(r.sum_outcome)                                                                                                                                              out,
           sum(r.sum_expense)                                                                                                                                              out_exp,
           sum(r.sum_income_perebroska)                                                                                                                                    inc_per,
           sum(r.sum_outcome_perebroska)                                                                                                                                   out_per,
           sum(r.sum_income_convert)                                                                                                                                       inc_con,
           sum(r.sum_outcome_convert)                                                                                                                                      out_con,
           sum(r.sum_start + r.sum_income + r.sum_income_proc + r.sum_income_perebroska - r.sum_outcome_perebroska + sum_income_convert - sum_outcome_convert - r.sum_outcome - r.sum_expense) s_end
    from (select b.name                                                              bank_name,
                 c.name                                                              currency_name,
                 (sum(case when o.operation_direction = 1 then o.amount else 0 end) -
                  sum(case when o.operation_direction = 0 then o.amount else 0 end)) sum_start,
                 sum(0)                                                              sum_income,
                 sum(0)                                                              sum_income_proc,
                 sum(0)                                                              sum_outcome,
                 sum(0)                                                              sum_expense,
                 sum(0)                                                              sum_income_perebroska,
                 sum(0)                                                              sum_outcome_perebroska,
                 sum(0)                                                              sum_income_convert,
                 sum(0)                                                              sum_outcome_convert
          from list_bank b
                   left join list_account a on a.bank_id = b.id
                   left join list_currency c on c.id = a.currency_id
                   left join dbm_operation o on o.account_id = a.id
          where o.operation_date < ${date_start}
          and o.status_id = 2
          group by b.name, c.name, a.name
    
          union all
    
          select b.name                                                                                                                                                       bank_name,
                 c.name                                                                                                                                                       currency_name,
                 sum(0)                                                                                                                                                       sum_start,
                 sum(case when o.operation_direction = 1 and (o.operation_id = 1 or o.operation_id = 2) then o.amount else 0 end)                                             sum_income,
                 sum(case when o.operation_direction = 1 and o.operation_id = 10 then o.amount else 0 end)                                                                    sum_income_proc,
                 sum(case when o.operation_direction = 0 and o.operation_id = 8 then o.amount else 0 end)                                                                     sum_outcome,
                 sum(case when o.operation_direction = 0 and o.operation_id = 3 then o.amount else 0 end)                                                                     sum_expense,
                 sum(case when o.operation_direction = 1 and (o.operation_id = 4 or o.operation_id = 6 or o.operation_id = 7 or o.operation_id = 9) then o.amount else 0 end) sum_income_perebroska,
                 sum(case when o.operation_direction = 0 and (o.operation_id = 4 or o.operation_id = 6 or o.operation_id = 7 or o.operation_id = 9) then o.amount else 0 end) sum_outcome_perebroska,
                 sum(case when o.operation_direction = 1 and o.operation_id = 5 then o.amount else 0 end)                                                                     sum_income_convert,
                 sum(case when o.operation_direction = 0 and o.operation_id = 5 then o.amount else 0 end)                                                                     sum_outcome_convert
          from list_bank b
                   left join list_account a on a.bank_id = b.id
                   left join list_currency c on c.id = a.currency_id
                   left join dbm_operation o on o.account_id = a.id
          where o.operation_date >= ${date_start}
            and o.operation_date <= ${date_end}
            and o.status_id = 2
          group by b.name, c.name, a.name) r
    group by r.bank_name, r.currency_name;`
  }

  async mainExpenses(reportParams: BetweenDateDto): Promise<DataMainExpenseReportDto> {

    if (reportParams.date.length < 2) {
      throw new BadRequestException(['Date not found!'])
    }

    const date_start = new Date(reportParams.date[0]);
    const date_end = new Date(reportParams.date[1]);

    return this.prismaService.$queryRaw `
    select s.id,
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

  async currencyValues(reportParams: BetweenDateDto): Promise<DataMainCurrencyValuesDto>{

    if (reportParams.date.length < 2) {
      throw new BadRequestException(['Date not found!'])
    }

    // const date_start = new Date(reportParams.date[0]);
    const date_end = new Date(reportParams.date[1]);

    return this.prismaService.$queryRaw `
    select distinct dcv.ids,
                    (lc1.name || ' - ' || lc2.name) currencies,
                    (select cv.buy_value
                     from dbm_currency_value cv
                              left join list_currency lc1 on lc1.id = cv.currency_1_id
                              left join list_currency lc2 on lc2.id = cv.currency_2_id
                     where cv.value_date < ${date_end}
                       and cv.ids = dcv.ids
                     order by cv.value_date desc
                     limit 1) buy_value,
                    (select cv.sell_value
                     from dbm_currency_value cv
                              left join list_currency lc1 on lc1.id = cv.currency_1_id
                              left join list_currency lc2 on lc2.id = cv.currency_2_id
                     where cv.value_date < ${date_end}
                       and cv.ids = dcv.ids
                     order by cv.value_date desc
                     limit 1) sell_value
    from dbm_currency_value dcv
             left join list_currency lc1 on lc1.id = dcv.currency_1_id
             left join list_currency lc2 on lc2.id = dcv.currency_2_id`
  }

  async expenseList(reportParams: BetweenDateIdDto): Promise<DataMExpenseDto[]>{

    if (reportParams.date.length < 2) {
      throw new BadRequestException(['Date not found!'])
    }

    if (!reportParams.id) {
      throw new BadRequestException(['ID not found!'])
    }

    const date_start = new Date(reportParams.date[0]);
    const date_end = new Date(reportParams.date[1]);
    const id = reportParams.id;

    let whereObj;
    if (reportParams.payer_id) {
      whereObj = [
        { expense_group_id: id },
        { status_id: 2 },
        { payer_id: reportParams.payer_id },
        {
          operation_date: {
            gte: date_start,
            lte: date_end,
          },
        },
      ];
    } else {
      whereObj = [
        { expense_group_id: id },
        { status_id: 2 },
        {
          operation_date: {
            gte: date_start,
            lte: date_end,
          },
        },
      ];
    }

    return this.prismaService.dbm_expense.findMany({
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
      orderBy: {
        operation_date: 'asc'
      }
    })

  }

  async expenseListByGroup(reportParams: BetweenDateIdDto): Promise<DataMainExpenseReportDto> {

    if (reportParams.date.length < 2) {
      throw new BadRequestException(['Date not found!'])
    }

    if (!reportParams.id) {
      throw new BadRequestException(['ID not found!'])
    }

    const date_start = new Date(reportParams.date[0]);
    const date_end = new Date(reportParams.date[1]);
    const id = reportParams.id;

    return this.prismaService.$queryRaw `
    select s.id,
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
                        and ex.payer_id = ${id}
                        and ex.status_id = 2) r) s
          group by s.id, s.name
          order by s.name;`
  }
}
