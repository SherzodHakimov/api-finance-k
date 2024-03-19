import { Module } from '@nestjs/common';
import { MListExpenseService } from './m-list-expense.service';
import { MListExpenseController } from './m-list-expense.controller';
import { PrismaService } from 'src/prisma-service';

@Module({
  controllers: [MListExpenseController],
  providers: [MListExpenseService, PrismaService],
})
export class MListExpenseModule {}
