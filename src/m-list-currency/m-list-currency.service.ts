import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateMListCurrencyDto } from './dto/create-m-list-currency.dto';
import { UpdateMListCurrencyDto } from './dto/update-m-list-currency.dto';
import { PrismaService } from 'src/prisma-service';
import { DataMListCurrencyDto } from './dto/data-m-list-currency.dto';

@Injectable()
export class MListCurrencyService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createMListCurrencyDto: CreateMListCurrencyDto,
  ): Promise<DataMListCurrencyDto> {
    return this.checkLocalCurrency(
      createMListCurrencyDto.currency_type_id,
    ).then(async () => {
      return this.prismaService.list_currency.create({
        data: createMListCurrencyDto,
        include: {
          set_currency_type: { select: { name: true } },
        },
      });
    });
  }

  async findAll(): Promise<DataMListCurrencyDto[]> {
    return this.prismaService.list_currency.findMany({
      include: {
        set_currency_type: { select: { name: true } },
      },
      orderBy: { id: 'asc' }
    });
  }

  async findOne(id: number): Promise<DataMListCurrencyDto> {
    return this.prismaService.list_currency.findUnique({
      where: { id: +id },
      include: {
        set_currency_type: { select: { name: true } },
      },
    });
  }

  async update(
    id: number,
    updateMListCurrencyDto: UpdateMListCurrencyDto,
  ): Promise<DataMListCurrencyDto> {
    return this.checkLocalCurrency(
      updateMListCurrencyDto.currency_type_id,
      id
    ).then(async () => {
      return this.prismaService.list_currency.update({
        where: { id: +id },
        data: updateMListCurrencyDto,
        include: {
          set_currency_type: { select: { name: true } },
        },
      });
    });
  }

  async remove(id: number): Promise<DataMListCurrencyDto> {
    const l = await this.prismaService.list_currency.findFirst({
      where: { id: +id, currency_type_id: 1 },
    });

    if (l) throw new ForbiddenException(['Delete not allowed!']);

    const r = await this.prismaService.list_account.findFirst({
      where: { currency_id: +id },
    });

    if (r) throw new ForbiddenException(['Delete not allowed!']);

    const b = await this.prismaService.dbm_currency_value.findFirst({
      where: { currency_id: +id },
    });

    if (b) throw new ForbiddenException(['Delete not allowed!']);

    const c = await this.prismaService.dbm_operation.findFirst({
      where: { currency_id: +id },
    });

    if (c) throw new ForbiddenException(['Delete not allowed!']);

    return this.prismaService.list_currency.delete({
      where: { id: +id },
      include: {
        set_currency_type: { select: { name: true } },
      },
    });
  }

  async checkLocalCurrency(
    currencyTypeId: number = 1,
    id: number | null = null,
  ) {
    const w = id
      ? { currency_type_id: 1, NOT: { id: id } }
      : { currency_type_id: 1 };
    if (currencyTypeId === 1) {
      const isSetLocalCurrency = await this.prismaService.list_currency.findMany(
        {
          where: w,
        },
      );

      if (isSetLocalCurrency.length > 0)
        throw new ForbiddenException(['Allowed only one local currency!']);
    }
  }
}
