import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateMListPayerDto } from './dto/create-m-list-payer.dto';
import { UpdateMListPayerDto } from './dto/update-m-list-payer.dto';
import { PrismaService } from 'src/prisma-service';
import { DataMListPayerDto } from './dto/data-m-list-payer.dto';

@Injectable()
export class MListPayerService {
  constructor(private prismaService: PrismaService) {}
  
   async create(createMListPayerDto: CreateMListPayerDto): Promise<DataMListPayerDto> {
    createMListPayerDto.name = createMListPayerDto.name.trim();
    return this.prismaService.list_payer.create({
      data: createMListPayerDto,
      include: {
        set_list_status: { select: { name: true } }
      }
    });
  }

  async findAll(): Promise<DataMListPayerDto[]> {
    return this.prismaService.list_payer.findMany({
      include: {
        set_list_status: { select: { name: true } }
      },
      orderBy: { name: 'asc' }
    });
  }

  async findOne(id: number): Promise<DataMListPayerDto> {
    return this.prismaService.list_payer.findFirst({
      where: { id: +id },
      include: {
        set_list_status: { select: { name: true } }
      }
    });
  }

  async update(id: number, updateMListPayerDto: UpdateMListPayerDto): Promise<DataMListPayerDto> {
    updateMListPayerDto.name = updateMListPayerDto.name.trim();
    return this.prismaService.list_payer.update({
      where: { id: +id },
      data: updateMListPayerDto,
      include: {
        set_list_status: { select: { name: true } }
      }
    });
  }

  async remove(id: number): Promise<DataMListPayerDto> {
    const b = await this.prismaService.dbm_expense.findFirst({ 
      where: {payer_id: +id},
    });

    if (b) throw new ForbiddenException(['Delete not allowed!']);
    
    return this.prismaService.list_payer.delete({
      where: { id: +id },
      include: {
        set_list_status: { select: { name: true } }
      }
    });
  }
}
