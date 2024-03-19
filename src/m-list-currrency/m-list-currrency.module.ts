import { Module } from '@nestjs/common';
import { MListCurrrencyService } from './m-list-currrency.service';
import { MListCurrrencyController } from './m-list-currrency.controller';
import { PrismaService } from 'src/prisma-service';

@Module({
  controllers: [MListCurrrencyController],
  providers: [MListCurrrencyService, PrismaService],
})
export class MListCurrrencyModule {}
