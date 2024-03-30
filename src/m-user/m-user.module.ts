import { Module } from '@nestjs/common';
import { MUserService } from './m-user.service';
import { MUserController } from './m-user.controller';
import { PrismaService } from 'src/prisma-service';

@Module({
  controllers: [MUserController],
  providers: [MUserService, PrismaService],
})
export class MUserModule {}
