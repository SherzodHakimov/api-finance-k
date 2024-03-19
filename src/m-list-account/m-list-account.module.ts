import { Module } from '@nestjs/common';
import { MListAccountService } from './m-list-account.service';
import { MListAccountController } from './m-list-account.controller';
import { PrismaService } from 'src/prisma-service';

@Module({
  controllers: [MListAccountController],
  providers: [MListAccountService, PrismaService],
})
export class MListAccountModule {}
