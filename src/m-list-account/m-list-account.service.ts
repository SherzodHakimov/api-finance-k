import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service';
import { DataMListAccountDto } from './dto/data-m-list-account.dto';
import { UpdateMListAccountDto } from './dto/update-m-list-account.dto';
import { CreateMListAccountDto } from './dto/create-m-list-account.dto';

@Injectable()
export class MListAccountService {
  constructor(private prismaService: PrismaService) {}
  
  async create(createMListsAccountDto: CreateMListAccountDto): Promise<DataMListAccountDto> {
    return await this.prismaService.list_account.create({
      data: createMListsAccountDto,
      include: {
        list_currency: {select: {name: true}},
        list_bank: {select: {name: true}},
        set_list_status: {select: {name: true}}
      }
    });
  }

  async findAll(): Promise<DataMListAccountDto[]> {
    return await this.prismaService.list_account.findMany({
      include: {
        list_currency: {select: {name: true}},
        list_bank: {select: {name: true}},
        set_list_status: {select: {name: true}}
      },
      orderBy: {id: 'asc'}
    });
  }

  async findOne(id: number): Promise<DataMListAccountDto> {
    return await this.prismaService.list_account.findUnique({
      where: {id: +id},
      include: {
        list_currency: {select: {name: true}},
        list_bank: {select: {name: true}},
        set_list_status: {select: {name: true}}
      }
    });
  }

  async update(id: number, updateMListsAccountDto: UpdateMListAccountDto): Promise<DataMListAccountDto> {
    return await this.prismaService.list_account.update({
      where: {id: +id},
      data: updateMListsAccountDto,
      include: {
        list_currency: {select: {name: true}},
        list_bank: {select: {name: true}},
        set_list_status: {select: {name: true}}
      }
    });
  }

  async remove(id: number): Promise<DataMListAccountDto> {
    const a = await this.prismaService.dbm_operation.findFirst({ 
      where: {account_id: +id},
    });

    if (a) throw new ForbiddenException(['Delete not allowed!'])

    return await this.prismaService.list_account.delete({
        where:{id: +id},
        include: {
          list_currency: {select: {name: true}},
          list_bank: {select: {name: true}},
          set_list_status: {select: {name: true}}
        }
    });
  }
}
