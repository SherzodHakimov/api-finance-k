import { Module } from '@nestjs/common';
import { MExpensesService } from './m-expenses.service';
import { MExpensesController } from './m-expenses.controller';
import { PrismaService } from '../prisma-service';

@Module({
  controllers: [MExpensesController],
  providers: [MExpensesService, PrismaService],
})
export class MExpensesModule {}
