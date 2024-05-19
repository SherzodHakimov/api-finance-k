import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpStatus, UseInterceptors, UseGuards,
} from '@nestjs/common';
import { MOperationsService } from './m-operations.service';
import { CreateMOperationDto } from './dto/create-m-operation.dto';
import { UpdateMOperationDto } from './dto/update-m-operation.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorDto } from '../shared/dto/error.dto';
import { DataMOperationDto } from './dto/data-m-operation.dto';
import { UpdateMOperationStatusDto } from './dto/update-m-operation-status.dto';
import { DataMOperationStatusDto } from './dto/data-m-operation-status.dto';
import { DataToCheckMOperationInitDto } from './dto/data-to-check-m-operation-init.dto';
import { DataMOperationPaginationDto } from './dto/data-m-operation-pagination.dto';
import { CreateMOperationAccToAccDto } from './dto/create-m-operation-acc-to-acc.dto';
import { CreateMOperationConvertDto } from './dto/create-m-operation-convert.dto';
import { CreateMOperationBankCashCardDto } from './dto/create-m-operation-bank-cash-card.dto';
import { DataMOperationDoubleDts } from './dto/data-m-operation-double.dts';
import { CreateMOperationExpenseDto } from './dto/create-m-operation-expense.dto';
import { AccountAmountDto } from './dto/data-account-amount.dto';
import { ResponseBodyInterceptor } from '../response-body.interceptor';
import { JwtAuthGuard } from '../m-auth/jwt-auth.guard';

@Controller('m-operations')
@UsePipes(new ValidationPipe())
@UseInterceptors(ResponseBodyInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Operations')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: ErrorDto })
export class MOperationsController {
  constructor(private readonly mOperationsService: MOperationsService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMOperationDto,
  })
  create(@Body() createMOperationDto: CreateMOperationDto) {
    return this.mOperationsService.create(createMOperationDto);
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMOperationDto,
  })
  findAll() {
    return this.mOperationsService.findAll();
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Get one item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMOperationDto,
  })
  findOne(@Param('id') id: string) {
    return this.mOperationsService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update one item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMOperationDto,
  })
  update(@Param('id') id: string, @Body() updateMOperationDto: UpdateMOperationDto) {
    return this.mOperationsService.update(+id, updateMOperationDto);
  }

  @Delete('/remove/:id')
  @ApiOperation({ summary: 'Delete one item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMOperationDto,
  })
  remove(@Param('id') id: string) {
    return this.mOperationsService.remove(+id);
  }

  @Post('/list/pagination/:id')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMOperationDto,
  })
  listPagination(@Param('id') id: string, @Body() dataMOperationPaginationDto: DataMOperationPaginationDto) {
    return this.mOperationsService.listPagination(+id, dataMOperationPaginationDto);
  }

  @Patch('/update/operation-status/:id')
  @ApiOperation({ summary: 'Change operation status by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMOperationStatusDto,
  })
  updateStatus(@Param('id') id: string, @Body() updateMOperationStatusDto: UpdateMOperationStatusDto) {
    return this.mOperationsService.updateStatus(+id, updateMOperationStatusDto);
  }

  @Post('/check-has-operation')
  @ApiOperation({ summary: 'Check is has any operation' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Boolean,
  })
  isHasAnyOperation(@Body() checkMOperationInitDto: DataToCheckMOperationInitDto) {
    return this.mOperationsService.isHasAnyOperation(checkMOperationInitDto);
  }

  @Post('/create/acc-to-acc')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMOperationDoubleDts,
  })
  createAccToAcc(@Body() createMOperationAccToAccDto: CreateMOperationAccToAccDto) {
    return this.mOperationsService.createAccToAcc(createMOperationAccToAccDto);
  }

  @Post('/create/convert')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMOperationDoubleDts,
  })
  createConvert(@Body() createMOperationConvertDto: CreateMOperationConvertDto) {
    return this.mOperationsService.createConvert(createMOperationConvertDto);
  }

  @Post('/create/bank-cash-card')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMOperationDoubleDts,
  })
  createBankCashCard(@Body() createMOperationBankCashCardDto: CreateMOperationBankCashCardDto) {
    return this.mOperationsService.createBankCashCard(createMOperationBankCashCardDto);
  }

  @Post('/create/expense')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMOperationDoubleDts,
  })
  createExpense(@Body() createMOperationExpenseDto: CreateMOperationExpenseDto) {
    return this.mOperationsService.createExpense(createMOperationExpenseDto);
  }

  @Post('/get-account-amount')
  @ApiOperation({ summary: 'Get amount of item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Number,
  })
  getAccountAmount(@Body() accountAmountDto: AccountAmountDto) {
    return this.mOperationsService.getAccountAmount(accountAmountDto);
  }

  @Post('/confirm-items')
  @ApiOperation({ summary: 'Confirm items array' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Number,
  })
  confirmItems(@Body() arr: number[]) {
    return this.mOperationsService.confirmItems(arr);
  }


  @Post('/get-tags')
  @ApiOperation({ summary: 'Get tags array' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: String,
  })
  getTags(@Body() str: {name: string}) {
    return this.mOperationsService.getTags(str);
  }
}
