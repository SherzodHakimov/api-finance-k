import { Module } from '@nestjs/common';
import { MOperationsService } from './m-operations.service';
import { MOperationsController } from './m-operations.controller';
import { PrismaService } from '../prisma-service';

@Module({
  controllers: [MOperationsController],
  providers: [MOperationsService, PrismaService],
})
export class MOperationsModule {}
