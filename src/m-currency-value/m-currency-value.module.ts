import { Module } from '@nestjs/common';
import { MCurrencyValueService } from './m-currency-value.service';
import { MCurrencyValueController } from './m-currency-value.controller';
import { PrismaService } from '../prisma-service';

@Module({
  controllers: [MCurrencyValueController],
  providers: [MCurrencyValueService, PrismaService],
})
export class MCurrencyValueModule {}
