import { Module } from '@nestjs/common';
import { MListAccountService } from './m-list-account.service';
import { MListAccountController } from './m-list-account.controller';
import { PrismaService } from 'src/prisma-service';
import { MAuthModule } from '../m-auth/m-auth.module';

@Module({
  controllers: [MListAccountController],
  providers: [MListAccountService, PrismaService],
  imports: [MAuthModule], // import for guard
})
export class MListAccountModule {}
