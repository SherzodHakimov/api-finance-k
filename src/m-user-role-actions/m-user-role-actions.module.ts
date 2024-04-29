import { Module } from '@nestjs/common';
import { MUserRoleActionsService } from './m-user-role-actions.service';
import { MUserRoleActionsController } from './m-user-role-actions.controller';
import { PrismaService } from '../prisma-service';

@Module({
  controllers: [MUserRoleActionsController],
  providers: [MUserRoleActionsService, PrismaService],
})
export class MUserRoleActionsModule {}
