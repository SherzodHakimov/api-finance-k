import { Module } from '@nestjs/common';
import { MExpensesService } from './m-expenses.service';
import { MExpensesController } from './m-expenses.controller';
import { PrismaService } from '../prisma-service';
import { MAuthModule } from '../m-auth/m-auth.module';

@Module({
  controllers: [MExpensesController],
  providers: [MExpensesService, PrismaService],
  imports: [MAuthModule]
})
export class MExpensesModule {}
