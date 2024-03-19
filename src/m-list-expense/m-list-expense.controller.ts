import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MListExpenseService } from './m-list-expense.service';
import { CreateMListExpenseDto } from './dto/create-m-list-expense.dto';
import { UpdateMListExpenseDto } from './dto/update-m-list-expense.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('m-list-expense')
@ApiTags('listExpense')
export class MListExpenseController {
  constructor(private readonly mListExpenseService: MListExpenseService) {}

  @Post('/create')
  create(@Body() createMListExpenseDto: CreateMListExpenseDto) {
    return this.mListExpenseService.create(createMListExpenseDto);
  }

  @Get('/list')
  findAll() {
    return this.mListExpenseService.findAll();
  }

  @Get('/get:id')
  findOne(@Param('id') id: string) {
    return this.mListExpenseService.findOne(+id);
  }

  @Patch('/update:id')
  update(@Param('id') id: string, @Body() updateMListExpenseDto: UpdateMListExpenseDto) {
    return this.mListExpenseService.update(+id, updateMListExpenseDto);
  }

  @Delete('/remove:id')
  remove(@Param('id') id: string) {
    return this.mListExpenseService.remove(+id);
  }
}
