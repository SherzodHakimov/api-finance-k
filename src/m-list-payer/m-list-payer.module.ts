import { Module } from '@nestjs/common';
import { MListPayerService } from './m-list-payer.service';
import { MListPayerController } from './m-list-payer.controller';
import { PrismaService } from 'src/prisma-service';
import { MAuthModule } from '../m-auth/m-auth.module';

@Module({
  controllers: [MListPayerController],
  providers: [MListPayerService, PrismaService],
  imports: [MAuthModule]
})
export class MListPayerModule {}
