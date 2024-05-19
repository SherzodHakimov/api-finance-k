import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MReportsService } from './m-reports.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BetweenDateDto } from './dto/between-date.dto';
import { DataMainReportDto } from './dto/data-main-report.dto';
import { DataMainAllReportDto } from './dto/data-main-all-report.dto';
import { DataMainExpenseReportDto } from './dto/data-main-expense-report.dto';
import { DataMainCurrencyValuesDto } from './dto/data-main-currency-values.dto';
import { BetweenDateIdDto } from './dto/between-date-id.dto';
import { DataMExpenseDto } from '../m-expenses/dto/data-m-expense.dto';
import { ErrorDto } from '../shared/dto/error.dto';
import { ResponseBodyInterceptor } from '../response-body.interceptor';
import { JwtAuthGuard } from '../m-auth/jwt-auth.guard';

@Controller('m-reports')
@UsePipes(new ValidationPipe())
@UseInterceptors(ResponseBodyInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Reports')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: ErrorDto })
export class MReportsController {
  constructor(private readonly mReportsService: MReportsService) {}

  @Post('/main-local')
  @ApiOperation({ summary: 'Get report' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMainReportDto })
  mainLocal(@Body() reportParams: BetweenDateDto) {
    return this.mReportsService.mainLocal(reportParams);
  }

  @Post('/main-convert')
  @ApiOperation({ summary: 'Get report' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMainReportDto })
  mainConvert(@Body() reportParams: BetweenDateDto) {
    return this.mReportsService.mainConvert(reportParams);
  }

  @Post('/main-all')
  @ApiOperation({ summary: 'Get report' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMainAllReportDto })
  mainAll(@Body() reportParams: BetweenDateDto) {
    return this.mReportsService.mainAll(reportParams);
  }

  @Post('/main-expenses')
  @ApiOperation({ summary: 'Get report' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMainExpenseReportDto })
  mainExpenses(@Body() reportParams: BetweenDateDto) {
    return this.mReportsService.mainExpenses(reportParams);
  }

  @Post('/currency-values')
  @ApiOperation({ summary: 'Get report' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMainCurrencyValuesDto })
  currencyValues(@Body() reportParams: BetweenDateDto) {
    return this.mReportsService.currencyValues(reportParams);
  }

  @Post('/expense-list')
  @ApiOperation({ summary: 'Get report' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMExpenseDto })
  expenseList(@Body() reportParams: BetweenDateIdDto) {
    return this.mReportsService.expenseList(reportParams);
  }

  @Post('/expense-list-group')
  @ApiOperation({ summary: 'Get report' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMainExpenseReportDto })
  expenseListGroup(@Body() reportParams: BetweenDateIdDto) {
    return this.mReportsService.expenseListGroup(reportParams);
  }
}
