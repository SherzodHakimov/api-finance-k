import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MSettingsModule } from './m-settings/m-settings.module';
import { ConfigModule } from '@nestjs/config';
import { MListAccountModule } from './m-list-account/m-list-account.module';
import { MListBankModule } from './m-list-bank/m-list-bank.module';
import { MListCurrencyModule } from './m-list-currency/m-list-currency.module';
import { MListExpenseGroupModule } from './m-list-expense-group/m-list-expense-group.module';
import { MListExpenseModule } from './m-list-expense/m-list-expense.module';
import { MListPayerModule } from './m-list-payer/m-list-payer.module';
import { MListMeasureModule } from './m-list-measure/m-list-measure.module';
import { MUserModule } from './m-user/m-user.module';
import { MUserRoleActionsModule } from './m-user-role-actions/m-user-role-actions.module';
import { MOperationsModule } from './m-operations/m-operations.module';
import { MExpensesModule } from './m-expenses/m-expenses.module';
import { MCurrencyValueModule } from './m-currency-value/m-currency-value.module';
import { MReportsModule } from './m-reports/m-reports.module';
import { MDashboardModule } from './m-dashboard/m-dashboard.module';
import { MAuthModule } from './m-auth/m-auth.module';
import { MTelegramBotModule } from './m-telegram-bot/m-telegram-bot.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: path.resolve(__dirname, '../', 'static')
    // }),
    MTelegramBotModule,
    MAuthModule,
    MDashboardModule,
    MReportsModule,
    MCurrencyValueModule,
    MExpensesModule,
    MOperationsModule,
    MUserRoleActionsModule,
    MUserModule,
    MListMeasureModule,
    MListPayerModule,
    MListExpenseModule,
    MListExpenseGroupModule,
    MListCurrencyModule,
    MListAccountModule,
    MListBankModule,
    MSettingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
