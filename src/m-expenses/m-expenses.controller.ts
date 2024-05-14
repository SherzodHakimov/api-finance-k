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
  HttpStatus, UseGuards,
} from '@nestjs/common';
import { MExpensesService } from './m-expenses.service';
import { CreateMExpenseDto } from './dto/create-m-expense.dto';
import { UpdateMExpenseDto } from './dto/update-m-expense.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorDto } from '../shared/dto/error.dto';
import { DataMExpenseDto } from './dto/data-m-expense.dto';
import { DataMOperationPaginationDto } from '../m-operations/dto/data-m-operation-pagination.dto';
import { DataMOperationStatusDto } from '../m-operations/dto/data-m-operation-status.dto';
import { UpdateMOperationStatusDto } from '../m-operations/dto/update-m-operation-status.dto';
import { PaginationItemsDto } from '../shared/dto/pagination-items.dto';
import { JwtAuthGuard } from '../m-auth/jwt.-auth.guard';


@Controller('m-expenses')
@UsePipes(new ValidationPipe())
@ApiTags('Expenses')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: ErrorDto })
// @UseGuards(JwtAuthGuard) //guard
// @ApiBearerAuth() //swagger

export class MExpensesController {

  constructor(private readonly mExpensesService: MExpensesService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMExpenseDto,
  })
  @Post()
  create(@Body() createMExpenseDto: CreateMExpenseDto) {
    return this.mExpensesService.create(createMExpenseDto);
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMExpenseDto,
  })
  @Get()
  findAll() {
    return this.mExpensesService.findAll();
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Get one item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMExpenseDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mExpensesService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update one item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMExpenseDto,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMExpenseDto: UpdateMExpenseDto) {
    return this.mExpensesService.update(+id, updateMExpenseDto);
  }

  @Delete('/remove/:id')
  @ApiOperation({ summary: 'Delete one item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMExpenseDto,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mExpensesService.remove(+id);
  }

  @Patch('/update/operation-status/:id')
  @ApiOperation({ summary: 'Change operation status by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMOperationStatusDto,
  })
  updateStatus(@Param('id') id: string, @Body() updateMExpenseDto: UpdateMExpenseDto) {
    return this.mExpensesService.updateStatus(+id, updateMExpenseDto);
  }

  @Post('/list/pagination')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMExpenseDto,
  })
  listPagination(@Body() paginationItemsDto: PaginationItemsDto) {
    return this.mExpensesService.listPagination(paginationItemsDto);
  }

  @Post('/confirm-items')
  @ApiOperation({ summary: 'Confirm items array' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Number,
  })
  confirmItems(@Body() arr: number[]) {
    return this.mExpensesService.confirmItems(arr);
  }
}
