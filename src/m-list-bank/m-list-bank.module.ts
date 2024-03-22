import { Module } from '@nestjs/common';
import { MListBankService } from './m-list-bank.service';
import { MListBankController } from './m-list-bank.controller';
import { PrismaService } from 'src/prisma-service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseBodyInterceptor } from 'src/response-body.interceptor';

@Module({
  controllers: [MListBankController],
  providers: [MListBankService, PrismaService,     
    {
    provide: APP_INTERCEPTOR,
    useClass: ResponseBodyInterceptor,
  },],
})
export class MListBankModule {}
