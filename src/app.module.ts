import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MSettingsModule } from './m-settings/m-settings.module';
import { ConfigModule } from '@nestjs/config';
import { MListAccountModule } from './m-list-account/m-list-account.module';
import { MListBankModule } from './m-list-bank/m-list-bank.module';
import { MListCurrrencyModule } from './m-list-currrency/m-list-currrency.module';
import { MListExpenseGroupModule } from './m-list-expense-group/m-list-expense-group.module';
import { MListExpenseModule } from './m-list-expense/m-list-expense.module';
import { MListPayerModule } from './m-list-payer/m-list-payer.module';
import { MListMeasureModule } from './m-list-measure/m-list-measure.module';


@Module({
  imports: [
  ConfigModule.forRoot({ 
    envFilePath: `.${process.env.NODE_ENV}.env`}),
    MListMeasureModule,
    MListPayerModule,  
    MListExpenseModule, 
    MListExpenseGroupModule,
    MListCurrrencyModule, 
    MListAccountModule, 
    MListBankModule, 
    MSettingsModule, 
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
