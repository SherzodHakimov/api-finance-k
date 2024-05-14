import { Module } from '@nestjs/common';
import { MUserService } from './m-user.service';
import { MUserController } from './m-user.controller';
import { PrismaService } from 'src/prisma-service';
import { MAuthModule } from '../m-auth/m-auth.module';

@Module({
  controllers: [MUserController],
  providers: [MUserService, PrismaService],
  imports: [MAuthModule], // import for guard
})
export class MUserModule {}
