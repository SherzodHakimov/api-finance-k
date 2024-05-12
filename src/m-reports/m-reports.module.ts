import { Module } from '@nestjs/common';
import { MReportsService } from './m-reports.service';
import { MReportsController } from './m-reports.controller';
import { PrismaService } from '../prisma-service';

@Module({
  controllers: [MReportsController],
  providers: [MReportsService, PrismaService],
})
export class MReportsModule {}
