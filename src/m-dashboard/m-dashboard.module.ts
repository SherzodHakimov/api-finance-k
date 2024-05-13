import { Module } from '@nestjs/common';
import { MDashboardService } from './m-dashboard.service';
import { MDashboardController } from './m-dashboard.controller';
import { PrismaService } from '../prisma-service';

@Module({
  controllers: [MDashboardController],
  providers: [MDashboardService, PrismaService],
})
export class MDashboardModule {}
