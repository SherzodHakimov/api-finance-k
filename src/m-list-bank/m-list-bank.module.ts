import { Module } from '@nestjs/common';
import { MListBankService } from './m-list-bank.service';
import { MListBankController } from './m-list-bank.controller';
import { PrismaService } from 'src/prisma-service';

@Module({
  controllers: [MListBankController],
  providers: [MListBankService, PrismaService],
})
export class MListBankModule {}
