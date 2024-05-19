import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MDashboardService } from './m-dashboard.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorDto } from '../shared/dto/error.dto';
import { DataAmountAccountTypeDto } from './dto/data-amount-account-type.dto';
import { DataAmountCurrencyTypeDto } from './dto/data-amount-currency-type.dto';
import { DataMainExpenseReportDto } from '../m-reports/dto/data-main-expense-report.dto';
import { BetweenDateDto } from '../m-reports/dto/between-date.dto';
import { DataAmountAccountTypeCurrencyDto } from './dto/data-amount-account-type-currency.dto';
import { ResponseBodyInterceptor } from '../response-body.interceptor';
import { JwtAuthGuard } from '../m-auth/jwt-auth.guard';

@Controller('m-dashboard')
@UsePipes(new ValidationPipe())
@UseInterceptors(ResponseBodyInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Dashboard')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: ErrorDto })
export class MDashboardController {
  constructor(private readonly mDashboardService: MDashboardService) {}

  @Post('/expense-group-expense')
  @ApiOperation({ summary: 'Get report' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMainExpenseReportDto })
  expenseListByExpenseGroup(@Body() reportParams: BetweenDateDto) {
    return this.mDashboardService.expenseListByExpenseGroup(reportParams);
  }

  @Post('/expense-group-payer')
  @ApiOperation({ summary: 'Get report' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMainExpenseReportDto })
  expenseListByPayer(@Body() reportParams: BetweenDateDto) {
    return this.mDashboardService.expenseListByPayer(reportParams);
  }

  @Get('/amount-currency-type')
  @ApiOperation({ summary: 'Get dashboard' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataAmountCurrencyTypeDto })
  amountByCurrencyType() {
    return this.mDashboardService.amountByCurrencyType();
  }

  @Get('/amount-account-type')
  @ApiOperation({ summary: 'Get dashboard' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataAmountAccountTypeDto })
  amountByAccountType() {
    return this.mDashboardService.amountByAccountType();
  }

}
