import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMListCurrencyDto } from './dto/create-m-list-currency.dto';
import { UpdateMListCurrencyDto } from './dto/update-m-list-currency.dto';
import { PrismaService } from 'src/prisma-service';
import { DataMListCurrencyDto } from './dto/data-m-list-currency.dto';


@Injectable()
export class MListCurrencyService {

  constructor(private prismaService: PrismaService) {}
  
  async create(createMListCurrrencyDto: CreateMListCurrencyDto): Promise<DataMListCurrencyDto> {
    return await this.prismaService.list_currency.create({
      data: createMListCurrrencyDto
    });
  }

  async findAll(): Promise<DataMListCurrencyDto[]> {
    return await this.prismaService.list_currency.findMany({
      include: {
        set_currency_type: true
      }
    });

  }

  async findOne(id: number): Promise<DataMListCurrencyDto> {
    return await this.prismaService.list_currency.findUnique({
      where: {id: +id}
    });
  }

  async update(id: number, updateMListCurrrencyDto: UpdateMListCurrencyDto): Promise<DataMListCurrencyDto> {
    return await this.prismaService.list_currency.update({
      where: {id: +id},
      data: updateMListCurrrencyDto
    });
  }

  async remove(id: number): Promise<DataMListCurrencyDto> {
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
