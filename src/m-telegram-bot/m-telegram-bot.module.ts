import { Module } from '@nestjs/common';
import { MTelegramBotService } from './m-telegram-bot.service';
import { MTelegramBotController } from './m-telegram-bot.controller';
import { PrismaService } from '../prisma-service';

@Module({
  controllers: [MTelegramBotController],
  providers: [MTelegramBotService, PrismaService],
})
export class MTelegramBotModule {}
