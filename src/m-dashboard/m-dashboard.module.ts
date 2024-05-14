import { Module } from '@nestjs/common';
import { MDashboardService } from './m-dashboard.service';
import { MDashboardController } from './m-dashboard.controller';
import { PrismaService } from '../prisma-service';
import { MAuthModule } from '../m-auth/m-auth.module';

@Module({
  controllers: [MDashboardController],
  providers: [MDashboardService, PrismaService],
  imports: [MAuthModule], // import for guard
})
export class MDashboardModule {}
