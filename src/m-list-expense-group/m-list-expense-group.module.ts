import { Module } from '@nestjs/common';
import { MListExpenseGroupService } from './m-list-expense-group.service';
import { MListExpenseGroupController } from './m-list-expense-group.controller';
import { PrismaService } from 'src/prisma-service';

@Module({
  controllers: [MListExpenseGroupController],
  providers: [MListExpenseGroupService, PrismaService],
})
export class MListExpenseGroupModule {}
