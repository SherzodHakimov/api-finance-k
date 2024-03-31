import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateMListMeasureDto } from './dto/create-m-list-measure.dto';
import { UpdateMListMeasureDto } from './dto/update-m-list-measure.dto';
import { PrismaService } from 'src/prisma-service';
import { DataMListMeasureDto } from './dto/data-m-list-measure.dto';

@Injectable()
export class MListMeasureService {

  constructor(private prismaService: PrismaService) {}
  
  async create(createMListMeasureDto: CreateMListMeasureDto): Promise<DataMListMeasureDto> {
    return await this.prismaService.list_measure.create({
      data: createMListMeasureDto
    });
  }

  async findAll(): Promise<DataMListMeasureDto[]> {
    return await this.prismaService.list_measure.findMany({
      orderBy: {id: 'asc'}
    });
  }

  async findOne(id: number): Promise<DataMListMeasureDto> {
    return await this.prismaService.list_measure.findUnique({
      where: {id: +id}
    });
  }

  async update(id: number, updateMListMeasureDto: UpdateMListMeasureDto): Promise<DataMListMeasureDto> {
    return await this.prismaService.list_measure.update({
      where: {id: +id},
      data: updateMListMeasureDto
    });
  }

  async remove(id: number): Promise<DataMListMeasureDto> {
    const b = await this.prismaService.dbm_expense.findFirst({ 
      where: {measure_id: +id}
    });

    if (b) throw new ForbiddenException(['Delete not allowed!'])

    return await this.prismaService.list_measure.delete({
        where:{id: +id}
    });
  }
}
