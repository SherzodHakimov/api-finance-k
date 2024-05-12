import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { MReportsService } from './m-reports.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BetweenDateDto } from './dto/between-date.dto';
import { DataMainReportDto } from './dto/data-main-report.dto';
import { DataMainAllReportDto } from './dto/data-main-all-report.dto';
import { DataMainExpenseReportDto } from './dto/data-main-expense-report.dto';
import { DataMainCurrencyValuesDto } from './dto/data-main-currency-values.dto';

@Controller('m-reports')
export class MReportsController {

  constructor(private readonly mReportsService: MReportsService) {}

  @Post('/report-main-local')
  @ApiOperation({ summary: 'Get report' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMainReportDto })
  reportMainLocal(@Body() reportParams: BetweenDateDto) {
    return this.mReportsService.reportMainLocal(reportParams);
  }

  @Post('/report-main-convert')
  @ApiOperation({ summary: 'Get report' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMainReportDto })
  reportMaiConvert(@Body() reportParams: BetweenDateDto) {
    return this.mReportsService.reportMainConvert(reportParams);
  }

  @Post('/report-main-all')
  @ApiOperation({ summary: 'Get report' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMainAllReportDto })
  reportMaiAll(@Body() reportParams: BetweenDateDto) {
    return this.mReportsService.reportMainAll(reportParams);
  }

  @Post('/report-main-expenses')
  @ApiOperation({ summary: 'Get report' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMainExpenseReportDto })
  reportMainExpenses(@Body() reportParams: BetweenDateDto) {
    return this.mReportsService.reportMainExpenses(reportParams);
  }

  @Post('/report-currency-values')
  @ApiOperation({ summary: 'Get report' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMainCurrencyValuesDto })
  reportCurrencyValues(@Body() reportParams: BetweenDateDto) {
    return this.mReportsService.reportCurrencyValues(reportParams);
  }
}
