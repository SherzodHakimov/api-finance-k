import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service';
import { DataMListAccountDto } from './dto/data-m-list-account.dto';
import { UpdateMListAccountDto } from './dto/update-m-list-account.dto';
import { CreateMListAccountDto } from './dto/create-m-list-account.dto';

@Injectable()
export class MListAccountService {
  constructor(private prismaService: PrismaService) {}
  
  async create(createMListsAccountDto: CreateMListAccountDto): Promise<DataMListAccountDto> {
    return await this.prismaService.list_account.create({
      data: createMListsAccountDto
    });
  }

  async findAll(): Promise<DataMListAccountDto[]> {
    return await this.prismaService.list_account.findMany();
  }

  async findOne(id: number): Promise<DataMListAccountDto> {
    return await this.prismaService.list_account.findUnique({
      where: {id: +id}
    });
  }

  async update(id: number, updateMListsAccountDto: UpdateMListAccountDto): Promise<DataMListAccountDto> {
    return await this.prismaService.list_account.update({
      where: {id: +id},
      data: updateMListsAccountDto
    });
  }

  async remove(id: number): Promise<DataMListAccountDto> {
    const bank = await this.prismaService.dbm_operation.findMany({ 
      where: {account_id: +id}
    });

    if (bank.length > 0) throw new NotFoundException('Delete not allowed!')

    return await this.prismaService.list_account.delete({
        where:{id: +id}
    });
  }
}
