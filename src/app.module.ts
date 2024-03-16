import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MSettingsModule } from './m-settings/m-settings.module';

@Module({
  imports: [MSettingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
