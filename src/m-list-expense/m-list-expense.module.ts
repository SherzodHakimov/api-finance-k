import { Module } from '@nestjs/common';
import { MListExpenseService } from './m-list-expense.service';
import { MListExpenseController } from './m-list-expense.controller';
import { PrismaService } from 'src/prisma-service';
import { MAuthModule } from '../m-auth/m-auth.module';

@Module({
  controllers: [MListExpenseController],
  providers: [MListExpenseService, PrismaService],
  imports: [MAuthModule]
})
export class MListExpenseModule {}
