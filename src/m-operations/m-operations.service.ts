import { Injectable } from '@nestjs/common';
import { CreateMOperationDto } from './dto/create-m-operation.dto';
import { UpdateMOperationDto } from './dto/update-m-operation.dto';
import { PrismaService } from '../prisma-service';
import { DataMOperationDto } from './dto/data-m-operation.dto';
import { UpdateMOperationStatusDto } from './dto/update-m-operation-status.dto';
import { DataMOperationStatusDto } from './dto/data-m-operation-status.dto';
import { DataToCheckMOperationInitDto } from './dto/data-to-check-m-operation-init.dto';
import { DataMOperationPaginationDto } from './dto/data-m-operation-pagination.dto';
import { json } from 'express';


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

  async findAllByAccountType(id: number, dataMOperationPaginationDto: DataMOperationPaginationDto): Promise<{totals: any, data:DataMOperationDto[]}> {

    // FILTER
    const whereObj = [];
    if (dataMOperationPaginationDto.filter){
      dataMOperationPaginationDto.filter.forEach(el => {
        const keyNames = el.key.split('.');
        if (el.value.length > 0){
          const objName = {};
          const objType = {};
          const arr = [];
          el.value.forEach(v => {
            objName[keyNames[1]] = v;
            objType[keyNames[0]] = {...objName}
            arr.push({...objType})
          });
          whereObj.push({OR: arr})
        }
      });
    }
    whereObj.unshift({account_type_id: +id});


    if (dataMOperationPaginationDto.ammount_from && dataMOperationPaginationDto.ammount_to){
      whereObj.push({
        OR:[
          {
            ammount_in: {
              gte: dataMOperationPaginationDto.ammount_from,
              lte: dataMOperationPaginationDto.ammount_to
            }},
          {
            ammount_out: {
              gte: dataMOperationPaginationDto.ammount_from,
              lte: dataMOperationPaginationDto.ammount_to
            }}
        ]

      });
    }

    if (dataMOperationPaginationDto.date){
      console.log(dataMOperationPaginationDto.date);
      whereObj.push({
        operation_date: {
          gte: dataMOperationPaginationDto.date[0], // Start of date range
          lte: dataMOperationPaginationDto.date[1], // End of date range
        },
      })
    }
    console.log(JSON.stringify(whereObj));


    // SORT
    let orderByObj = {};
    const tempObj = {};
    if (dataMOperationPaginationDto.sort_field && dataMOperationPaginationDto.sort_order){
      const sortOrder = dataMOperationPaginationDto.sort_order == 'ascend' ?  'asc' : 'desc'
      const sortFields = dataMOperationPaginationDto.sort_field.split('.');
      if (sortFields.length > 1){
        tempObj[sortFields[1]] = sortOrder;
        orderByObj[sortFields[0]] = tempObj;
      } else {
        orderByObj[dataMOperationPaginationDto.sort_field] = sortOrder;
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
    const totals = await this.prismaService.dbm_operation.aggregate({
      where: {
        AND: whereObj
      },
      _sum:{
        ammount_in: true,
        ammount_out: true
      },
    })

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
        dbm_user:  { select: { name1: true, name2: true } },

      },
      orderBy: orderByObj
    });

    // MERGE SUM ITEMS
    Object.assign(totals, {_count})
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

}
