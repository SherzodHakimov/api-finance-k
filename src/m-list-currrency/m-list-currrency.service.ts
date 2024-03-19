import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMListCurrrencyDto } from './dto/create-m-list-currrency.dto';
import { UpdateMListCurrrencyDto } from './dto/update-m-list-currrency.dto';
import { PrismaService } from 'src/prisma-service';
import { DataMListCurrrencyDto } from './dto/data-m-list-currrency.dto';


@Injectable()
export class MListCurrrencyService {

  constructor(private prismaService: PrismaService) {}
  
  async create(createMListCurrrencyDto: CreateMListCurrrencyDto): Promise<DataMListCurrrencyDto> {
    return await this.prismaService.list_currency.create({
      data: createMListCurrrencyDto
    });
  }

  async findAll(): Promise<DataMListCurrrencyDto[]> {
    return await this.prismaService.list_currency.findMany();
  }

  async findOne(id: number): Promise<DataMListCurrrencyDto> {
    return await this.prismaService.list_currency.findUnique({
      where: {id: +id}
    });
  }

  async update(id: number, updateMListCurrrencyDto: UpdateMListCurrrencyDto): Promise<DataMListCurrrencyDto> {
    return await this.prismaService.list_currency.update({
      where: {id: +id},
      data: updateMListCurrrencyDto
    });
  }

  async remove(id: number): Promise<DataMListCurrrencyDto> {
    const r = await this.prismaService.list_account.findMany({ 
      where: {currency_id: +id}
    });

    if (r.length > 0) throw new NotFoundException('Delete not allowed!')


    const b = await this.prismaService.dbm_currency_value.findMany({ 
      where: {currency_id: +id}
    });

    if (b.length > 0) throw new NotFoundException('Delete not allowed!')

    const c = await this.prismaService.dbm_operation.findMany({ 
      where: {currency_id: +id}
    });

    if (c.length > 0) throw new NotFoundException('Delete not allowed!')

    return await this.prismaService.list_currency.delete({
        where:{id: +id}
    });
  }
}
