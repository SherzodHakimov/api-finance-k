import { Module } from '@nestjs/common';
import { MListBankService } from './m-list-bank.service';
import { MListBankController } from './m-list-bank.controller';
import { PrismaService } from 'src/prisma-service';
import { MAuthModule } from '../m-auth/m-auth.module';

@Module({
  controllers: [MListBankController],
  providers: [MListBankService, PrismaService],
  imports: [MAuthModule]
})
export class MListBankModule {}
