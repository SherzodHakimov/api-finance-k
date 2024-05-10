import { Injectable } from '@nestjs/common';
import { CreateMCurrencyValueDto } from './dto/create-m-currency-value.dto';
import { UpdateMCurrencyValueDto } from './dto/update-m-currency-value.dto';
import { PrismaService } from '../prisma-service';
import { DataMCurrencyValueDto } from './dto/data-m-currency-value.dto';
import { isArray } from 'class-validator';
import { DataPaginationDto } from '../shared/dto/data-pagination.dto';

@Injectable()
export class MCurrencyValueService {

  constructor(private prismaService: PrismaService) {}

  configResponseData(query: any){

    if (isArray(query)){

      const arr: any[] = [];
      query.forEach(el => {

        const sell_list_currency = {...el.list_currency_dbm_currency_value_sell_currency_idTolist_currency};
        const buy_list_currency = {...el.list_currency_dbm_currency_value_buy_currency_idTolist_currency};

        delete el.list_currency_dbm_currency_value_sell_currency_idTolist_currency;
        delete el.list_currency_dbm_currency_value_buy_currency_idTolist_currency;

        arr.push(Object.assign(el, {sell_list_currency}, {buy_list_currency}))
      });
      return arr;
    } else {
      const sell_list_currency = {...query.list_currency_dbm_currency_value_sell_currency_idTolist_currency};
      const buy_list_currency = {...query.list_currency_dbm_currency_value_buy_currency_idTolist_currency};

      delete query.list_currency_dbm_currency_value_sell_currency_idTolist_currency;
      delete query.list_currency_dbm_currency_value_buy_currency_idTolist_currency;

      return Object.assign(query, {sell_list_currency}, {buy_list_currency})
    }

  }

  async create(createMCurrencyValueDto: CreateMCurrencyValueDto): Promise<DataMCurrencyValueDto> {

    const query = await this.prismaService.dbm_currency_value.create({
      data: createMCurrencyValueDto,
      include:{
        list_currency_dbm_currency_value_buy_currency_idTolist_currency: {select: {name: true}},
        list_currency_dbm_currency_value_sell_currency_idTolist_currency: {select: {name: true}},
        dbm_user: {select: {name1: true, name2: true}},
      }
    });

    return this.configResponseData(query);
  }

  async findAll(): Promise<DataMCurrencyValueDto[]> {
    const query = await this.prismaService.dbm_currency_value.findMany({
      include:{
        list_currency_dbm_currency_value_buy_currency_idTolist_currency: {select: {name: true}},
        list_currency_dbm_currency_value_sell_currency_idTolist_currency: {select: {name: true}},
        dbm_user: {select: {name1: true, name2: true}},
      },
      orderBy: { id: 'desc'}
      });

    return this.configResponseData(query);
  }

  async findOne(id: number): Promise<DataMCurrencyValueDto> {
    const query = await this.prismaService.dbm_currency_value.findFirst({
      where: { id: +id },
      include:{
        list_currency_dbm_currency_value_buy_currency_idTolist_currency: {select: {name: true}},
        list_currency_dbm_currency_value_sell_currency_idTolist_currency: {select: {name: true}},
        dbm_user: {select: {name1: true, name2: true}},
      }
    });

    return this.configResponseData(query);
  }

  async update(id: number, updateMCurrencyValueDto: UpdateMCurrencyValueDto): Promise<DataMCurrencyValueDto> {
    const query = await this.prismaService.dbm_currency_value.update({
      where: { id: +id },
      data: updateMCurrencyValueDto,
      include:{
        list_currency_dbm_currency_value_buy_currency_idTolist_currency: {select: {name: true}},
        list_currency_dbm_currency_value_sell_currency_idTolist_currency: {select: {name: true}},
        dbm_user: {select: {name1: true, name2: true}},
      }
    });

    return this.configResponseData(query);
  }

  async remove(id: number): Promise<DataMCurrencyValueDto> {
    const query = await this.prismaService.dbm_currency_value.delete({
      where: { id: +id },
      include:{
        list_currency_dbm_currency_value_buy_currency_idTolist_currency: {select: {name: true}},
        list_currency_dbm_currency_value_sell_currency_idTolist_currency: {select: {name: true}},
        dbm_user: {select: {name1: true, name2: true}},
      }
    });

    return this.configResponseData(query);
  }

  async listPagination(dataPaginationDto: DataPaginationDto): Promise<{totals: any, data:any[]}> {

    console.log(dataPaginationDto)

    // FILTER
    const whereObj = [];
    if (dataPaginationDto.filter){
      dataPaginationDto.filter.forEach(el => {
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

    // DATE FILTER
    if (dataPaginationDto.date){
      whereObj.push({
        value_date: {
          gte: new Date(dataPaginationDto.date[0]), // Start of date range
          lte: new Date(dataPaginationDto.date[1]) // End of date range
        },
      })
    }
    // console.log(JSON.stringify(whereObj));


    // SORT
    let orderByObj = {};
    if (dataPaginationDto.sort_field && dataPaginationDto.sort_order){
      const sortOrder = dataPaginationDto.sort_order == 'ascend' ?  'asc' : 'desc'
      const sortFields = dataPaginationDto.sort_field.split('.');
      if (sortFields.length > 1){
        orderByObj = {[sortFields[0]] : {[sortFields[1]] : sortOrder}}
      } else {
        if (dataPaginationDto.sort_field === 'in_amount' || dataPaginationDto.sort_field === 'out_amount'){
          if (dataPaginationDto.sort_field === 'in_amount'){
            orderByObj = [{operation_direction:  'desc' },{amount: sortOrder}];
          }
          if (dataPaginationDto.sort_field === 'out_amount'){
            orderByObj = [{operation_direction: 'asc' },{amount: sortOrder}];
          }
        } else {
          orderByObj[dataPaginationDto.sort_field] = sortOrder;
        }
      }
    } else {
      orderByObj = { id: 'desc'};
    }

    // COUNT ITEM
    const _count = await this.prismaService.dbm_currency_value.count({
      where: {
        AND: whereObj
      }
    })

    const response = await this.prismaService.dbm_currency_value.findMany({
      skip: (dataPaginationDto.page_number - 1) * dataPaginationDto.page_size,
      take: dataPaginationDto.page_size,
      where: {
        AND: whereObj
      },
      include: {
        list_currency_dbm_currency_value_buy_currency_idTolist_currency: {select: {name: true}},
        list_currency_dbm_currency_value_sell_currency_idTolist_currency: {select: {name: true}},
        dbm_user: {select: {name1: true, name2: true}},
      },
      orderBy: orderByObj
    });

    console.log(response)
    // MERGE SUM ITEMS
    const totals = {count: _count};
    return {totals, data: response};
  }
}
