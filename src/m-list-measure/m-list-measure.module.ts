import { Module } from '@nestjs/common';
import { MListMeasureService } from './m-list-measure.service';
import { MListMeasureController } from './m-list-measure.controller';
import { PrismaService } from 'src/prisma-service';
import { MAuthModule } from '../m-auth/m-auth.module';

@Module({
  controllers: [MListMeasureController],
  providers: [MListMeasureService, PrismaService],
  imports: [MAuthModule]
})
export class MListMeasureModule {}
