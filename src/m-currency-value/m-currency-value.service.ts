import { Injectable } from '@nestjs/common';
import { CreateMCurrencyValueDto } from './dto/create-m-currency-value.dto';
import { UpdateMCurrencyValueDto } from './dto/update-m-currency-value.dto';
import { PrismaService } from '../prisma-service';
import { DataMCurrencyValueDto } from './dto/data-m-currency-value.dto';
import { isArray } from 'class-validator';
import { PaginationItemsDto } from '../shared/dto/pagination-items.dto';
import { PaginationTotalsDto } from '../shared/dto/pagination-totals.dto';
import { DataForCheckCurrencyDto } from './dto/data-for-check-currency.dto';

@Injectable()
export class MCurrencyValueService {

  constructor(private prismaService: PrismaService) {}

  configResponseData(query: any){

    if (isArray(query)){

      const arr: any[] = [];
      query.forEach(el => {

        const list_currency_1 = {...el.list_currency_dbm_currency_value_currency_1_idTolist_currency};
        const list_currency_2 = {...el.list_currency_dbm_currency_value_currency_2_idTolist_currency};

        delete el.list_currency_dbm_currency_value_currency_1_idTolist_currency;
        delete el.list_currency_dbm_currency_value_currency_2_idTolist_currency;

        arr.push(Object.assign(el, {list_currency_1}, {list_currency_2}))
      });
      return arr;
    } else {
      const list_currency_1 = {...query.list_currency_dbm_currency_value_currency_1_idTolist_currency};
      const list_currency_2 = {...query.list_currency_dbm_currency_value_currency_2_idTolist_currency};

      delete query.list_currency_dbm_currency_value_currency_1_idTolist_currency;
      delete query.list_currency_dbm_currency_value_currency_2_idTolist_currency;

      return Object.assign(query, {list_currency_1}, {list_currency_2})
    }

  }

  async create(createMCurrencyValueDto: CreateMCurrencyValueDto): Promise<DataMCurrencyValueDto> {

    const query = await this.prismaService.dbm_currency_value.create({
      data: createMCurrencyValueDto,
      include:{
        list_currency_dbm_currency_value_currency_1_idTolist_currency: {select: {name: true}},
        list_currency_dbm_currency_value_currency_2_idTolist_currency: {select: {name: true}},
        dbm_user: {select: {name1: true, name2: true}},
      }
    });

    return this.configResponseData(query);
  }

  async findAll(): Promise<DataMCurrencyValueDto[]> {
    const query = await this.prismaService.dbm_currency_value.findMany({
      include:{
        list_currency_dbm_currency_value_currency_1_idTolist_currency: {select: {name: true}},
        list_currency_dbm_currency_value_currency_2_idTolist_currency: {select: {name: true}},
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
        list_currency_dbm_currency_value_currency_1_idTolist_currency: {select: {name: true}},
        list_currency_dbm_currency_value_currency_2_idTolist_currency: {select: {name: true}},
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
        list_currency_dbm_currency_value_currency_1_idTolist_currency: {select: {name: true}},
        list_currency_dbm_currency_value_currency_2_idTolist_currency: {select: {name: true}},
        dbm_user: {select: {name1: true, name2: true}},
      }
    });

    return this.configResponseData(query);
  }

  async remove(id: number): Promise<DataMCurrencyValueDto> {
    const query = await this.prismaService.dbm_currency_value.delete({
      where: { id: +id },
      include:{
        list_currency_dbm_currency_value_currency_1_idTolist_currency: {select: {name: true}},
        list_currency_dbm_currency_value_currency_2_idTolist_currency: {select: {name: true}},
        dbm_user: {select: {name1: true, name2: true}},
      }
    });

    return this.configResponseData(query);
  }

  async listPagination(paginationItemsDto: PaginationItemsDto): Promise<{totals: PaginationTotalsDto, data:DataMCurrencyValueDto[]}> {

    // FILTER
    const whereObj = [];
    if (paginationItemsDto.filter){
      paginationItemsDto.filter.forEach(el => {

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
    if (paginationItemsDto.date){
      whereObj.push({
        value_date: {
          gte: new Date(paginationItemsDto.date[0]), // Start of date range
          lte: new Date(paginationItemsDto.date[1]) // End of date range
        },
      })
    }
    // console.log(JSON.stringify(whereObj));


    // SORT
    let orderByObj = {};
    if (paginationItemsDto.sort_field && paginationItemsDto.sort_order){
      const sortOrder = paginationItemsDto.sort_order == 'ascend' ?  'asc' : 'desc'
      const sortFields = paginationItemsDto.sort_field.split('.');
      if (sortFields.length > 1){
        orderByObj = {[sortFields[0]] : {[sortFields[1]] : sortOrder}}
      } else {
        orderByObj[paginationItemsDto.sort_field] = sortOrder;
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
      skip: (paginationItemsDto.page_number - 1) * paginationItemsDto.page_size,
      take: paginationItemsDto.page_size,
      where: {
        AND: whereObj
      },
      include: {
        list_currency_dbm_currency_value_currency_1_idTolist_currency: {select: {name: true}},
        list_currency_dbm_currency_value_currency_2_idTolist_currency: {select: {name: true}},
        dbm_user: {select: {name1: true, name2: true}},
      },
      orderBy: orderByObj
    });


    // MERGE SUM ITEMS
    const totals = {count: _count};
    return {totals, data: this.configResponseData(response)};
  }

  async isExistCurrencyValue (dataForCheckCurrencyDto: DataForCheckCurrencyDto): Promise<boolean> {
  const check = await this.prismaService.dbm_currency_value.findFirst({
      where: {
        value_date: dataForCheckCurrencyDto.value_date,
        ids: dataForCheckCurrencyDto.ids
      }
    })

    return !!check;
  }
}
