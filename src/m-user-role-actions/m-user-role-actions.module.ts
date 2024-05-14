import { Module } from '@nestjs/common';
import { MUserRoleActionsService } from './m-user-role-actions.service';
import { MUserRoleActionsController } from './m-user-role-actions.controller';
import { PrismaService } from '../prisma-service';
import { MAuthModule } from '../m-auth/m-auth.module';

@Module({
  controllers: [MUserRoleActionsController],
  providers: [MUserRoleActionsService, PrismaService],
  imports: [MAuthModule]
})
export class MUserRoleActionsModule {}
