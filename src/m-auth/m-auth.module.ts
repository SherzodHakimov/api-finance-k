import { Module } from '@nestjs/common';
import { MAuthService } from './m-auth.service';
import { MAuthController } from './m-auth.controller';
import { PrismaService } from '../prisma-service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [MAuthController],
  providers: [MAuthService, PrismaService],
  imports: [
    JwtModule.register({
      secret: '123456789',
      signOptions: {
        expiresIn: '1h',
      }
    })
  ]
})
export class MAuthModule {}
