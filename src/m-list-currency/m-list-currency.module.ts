import { Module } from '@nestjs/common';
import { MListCurrencyService } from './m-list-currency.service';
import { MListCurrencyController } from './m-list-currency.controller';
import { PrismaService } from 'src/prisma-service';

@Module({
  controllers: [MListCurrencyController],
  providers: [MListCurrencyService, PrismaService],
})
export class MListCurrencyModule {}
