import { Module } from '@nestjs/common';
import { MListMeasureService } from './m-list-measure.service';
import { MListMeasureController } from './m-list-measure.controller';
import { PrismaService } from 'src/prisma-service';

@Module({
  controllers: [MListMeasureController],
  providers: [MListMeasureService, PrismaService],
})
export class MListMeasureModule {}
