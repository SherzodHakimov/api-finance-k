import { Module } from '@nestjs/common';
import { MSettingsService } from './m-settings.service';
import { MSettingsController } from './m-settings.controller';
import { PrismaService } from 'src/prisma-service';

@Module({
  controllers: [MSettingsController],
  providers: [MSettingsService, PrismaService],
})
export class MSettingsModule {}
