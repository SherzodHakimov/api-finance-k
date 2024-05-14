import { Module } from '@nestjs/common';
import { MSettingsService } from './m-settings.service';
import { MSettingsController } from './m-settings.controller';
import { PrismaService } from 'src/prisma-service';
import { MAuthModule } from '../m-auth/m-auth.module';

@Module({
  controllers: [MSettingsController],
  providers: [MSettingsService, PrismaService],
  imports: [MAuthModule], // import for guard
})
export class MSettingsModule {}
