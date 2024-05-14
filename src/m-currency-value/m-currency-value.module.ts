import { Module } from '@nestjs/common';
import { MCurrencyValueService } from './m-currency-value.service';
import { MCurrencyValueController } from './m-currency-value.controller';
import { PrismaService } from '../prisma-service';
import { MAuthModule } from '../m-auth/m-auth.module';


@Module({
  controllers: [MCurrencyValueController],
  providers: [MCurrencyValueService, PrismaService],
  imports: [], // import for guard
})
export class MCurrencyValueModule {}
