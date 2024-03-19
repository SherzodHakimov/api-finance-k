import { Module } from '@nestjs/common';
import { MListPayerService } from './m-list-payer.service';
import { MListPayerController } from './m-list-payer.controller';
import { PrismaService } from 'src/prisma-service';

@Module({
  controllers: [MListPayerController],
  providers: [MListPayerService, PrismaService],
})
export class MListPayerModule {}
