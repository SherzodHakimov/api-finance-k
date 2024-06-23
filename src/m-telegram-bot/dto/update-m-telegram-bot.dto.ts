import { PartialType } from '@nestjs/swagger';
import { CreateMTelegramBotDto } from './create-m-telegram-bot.dto';

export class UpdateMTelegramBotDto extends PartialType(CreateMTelegramBotDto) {}
