import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, HttpStatus } from '@nestjs/common';
import { MListExpenseService } from './m-list-expense.service';
import { CreateMListExpenseDto } from './dto/create-m-list-expense.dto';
import { UpdateMListExpenseDto } from './dto/update-m-list-expense.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataMListExpenseDto } from './dto/data-m-list-expense.dto';

@Controller('m-list-expense')
@UsePipes(new ValidationPipe())
@ApiTags('listExpense')
// @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: DataMListExpenseGroupDto })
export class MListExpenseController {
    constructor(private readonly mListExpenseService: MListExpenseService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListExpenseDto })
  create(@Body() createMListExpenseDto: CreateMListExpenseDto) {
    return this.mListExpenseService.create(createMListExpenseDto);
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListExpenseDto })
  findAll() {
    return this.mListExpenseService.findAll();
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Get one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListExpenseDto })
  findOne(@Param('id') id: string) {
    return this.mListExpenseService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListExpenseDto })
  update(@Param('id') id: string, @Body() updateMListExpenseDto: UpdateMListExpenseDto) {
    return this.mListExpenseService.update(+id, updateMListExpenseDto);
  }

  @Delete('/remove/:id')
  @ApiOperation({ summary: 'Delete one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListExpenseDto })
  remove(@Param('id') id: string) {
    return this.mListExpenseService.remove(+id);
  }
}
