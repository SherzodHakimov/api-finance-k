import { Module } from '@nestjs/common';
import { MListCurrencyService } from './m-list-currency.service';
import { MListCurrencyController } from './m-list-currency.controller';
import { PrismaService } from 'src/prisma-service';
import { MAuthModule } from '../m-auth/m-auth.module';

@Module({
  controllers: [MListCurrencyController],
  providers: [MListCurrencyService, PrismaService],
  imports: [MAuthModule], // import for guard
})
export class MListCurrencyModule {}
