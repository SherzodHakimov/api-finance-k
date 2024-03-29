import { Injectable } from '@nestjs/common';
import { CreateMListPayerDto } from './dto/create-m-list-payer.dto';
import { UpdateMListPayerDto } from './dto/update-m-list-payer.dto';
import { PrismaService } from 'src/prisma-service';
import { DataMListPayerDto } from './dto/data-m-list-payer.dto';

@Injectable()
export class MListPayerService {

  constructor(private prismaService: PrismaService) {}
  
   async create(createMListPayerDto: CreateMListPayerDto): Promise<DataMListPayerDto> {
    return await this.prismaService.list_payer.create({
      data: createMListPayerDto,
      include: {
        set_list_status: {select: {name: true}}
      }
    });
  }

  async findAll(): Promise<DataMListPayerDto[]> {
    return await this.prismaService.list_payer.findMany({
      include: {
        set_list_status: {select: {name: true}}
      }
    });
  }

  async findOne(id: number): Promise<DataMListPayerDto> {
    return await this.prismaService.list_payer.findUnique({
      where: {id: +id},
      include: {
        set_list_status: {select: {name: true}}
      }
    });
  }

  async update(id: number, updateMListPayerDto: UpdateMListPayerDto): Promise<DataMListPayerDto> {
    return await this.prismaService.list_payer.update({
      where: {id: +id},
      data: updateMListPayerDto,
      include: {
        set_list_status: {select: {name: true}}
      }
    });
  }

  async remove(id: number): Promise<DataMListPayerDto> {
    return await this.prismaService.list_payer.delete({
      where:{id: +id},
      include: {
        set_list_status: {select: {name: true}}
      }
  });
  }
}
