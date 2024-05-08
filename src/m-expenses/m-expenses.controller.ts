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
  HttpStatus,
} from '@nestjs/common';
import { MExpensesService } from './m-expenses.service';
import { CreateMExpenseDto } from './dto/create-m-expense.dto';
import { UpdateMExpenseDto } from './dto/update-m-expense.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorDto } from '../shared/dto/error.dto';
import { DataMExpenseDto } from './dto/data-m-expense.dto';


@Controller('m-expenses')
@UsePipes(new ValidationPipe())
@ApiTags('Expenses')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: ErrorDto })
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
}