import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateMListBankDto } from './dto/create-m-list-bank.dto';
import { UpdateMListBankDto } from './dto/update-m-list-bank.dto';
import { DataMListBankDto } from './dto/data-m-list-bank.dto';
import { PrismaService } from 'src/prisma-service';

@Injectable()
export class MListBankService {
  
  constructor(private prismaService: PrismaService) {}
  
  async create(createMListsBankDto: CreateMListBankDto): Promise<DataMListBankDto> {
    return await this.prismaService.list_bank.create({
      data: createMListsBankDto
    });
  }

  async findAll(): Promise<DataMListBankDto[]> {
    return await this.prismaService.list_bank.findMany({
      orderBy: {id: 'asc'}
    });
  }

  async findOne(id: number): Promise<DataMListBankDto> {
    return await this.prismaService.list_bank.findUnique({
      where: {id: +id}
    });
  }

  async update(id: number, updateMListsBankDto: UpdateMListBankDto): Promise<DataMListBankDto> {
    return await this.prismaService.list_bank.update({
      where: {id: +id},
      data: updateMListsBankDto
    });
  }

  async remove(id: number): Promise<UpdateMListBankDto> {
     const b = await this.prismaService.list_account.findFirst({ 
        where: {bank_id: +id}
      });
  
      if (b) throw new ForbiddenException(['Delete not allowed!'])

      return await this.prismaService.list_bank.delete({
          where:{id: +id}
      });
  }
}
