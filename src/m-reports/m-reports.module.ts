import { Module } from '@nestjs/common';
import { MReportsService } from './m-reports.service';
import { MReportsController } from './m-reports.controller';
import { PrismaService } from '../prisma-service';
import { MAuthModule } from '../m-auth/m-auth.module';

@Module({
  controllers: [MReportsController],
  providers: [MReportsService, PrismaService],
  imports: [MAuthModule], // import for guard
})
export class MReportsModule {}
