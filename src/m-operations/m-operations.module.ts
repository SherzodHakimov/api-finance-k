import { Module } from '@nestjs/common';
import { MOperationsService } from './m-operations.service';
import { MOperationsController } from './m-operations.controller';
import { PrismaService } from '../prisma-service';
import { MAuthModule } from '../m-auth/m-auth.module';

@Module({
  controllers: [MOperationsController],
  providers: [MOperationsService, PrismaService],
  imports: [MAuthModule]
})
export class MOperationsModule {}
