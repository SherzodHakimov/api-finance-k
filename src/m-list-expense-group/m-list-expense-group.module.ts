import { Module } from '@nestjs/common';
import { MListExpenseGroupService } from './m-list-expense-group.service';
import { MListExpenseGroupController } from './m-list-expense-group.controller';
import { PrismaService } from 'src/prisma-service';
import { MAuthModule } from '../m-auth/m-auth.module';

@Module({
  controllers: [MListExpenseGroupController],
  providers: [MListExpenseGroupService, PrismaService],
  imports: [MAuthModule]
})
export class MListExpenseGroupModule {}
