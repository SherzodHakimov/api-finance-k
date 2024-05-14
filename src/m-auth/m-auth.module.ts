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
      secret: '1234qwerty',
      signOptions: {
        expiresIn: '1h',
      }
    })
  ],
  exports: [
    MAuthModule,
    JwtModule
  ]
})
export class MAuthModule {}
