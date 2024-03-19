import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MListExpenseGroupService } from './m-list-expense-group.service';
import { CreateMListExpenseGroupDto } from './dto/create-m-list-expense-group.dto';
import { UpdateMListExpenseGroupDto } from './dto/update-m-list-expense-group.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('m-list-expense-group')
@ApiTags('listExpenseGroup')
export class MListExpenseGroupController {
  constructor(private readonly mListExpenseGroupService: MListExpenseGroupService) {}

  @Post('/create')
  create(@Body() createMListExpenseGroupDto: CreateMListExpenseGroupDto) {
    return this.mListExpenseGroupService.create(createMListExpenseGroupDto);
  }

  @Get('/list')
  findAll() {
    return this.mListExpenseGroupService.findAll();
  }

  @Get('/get:id')
  findOne(@Param('id') id: string) {
    return this.mListExpenseGroupService.findOne(+id);
  }

  @Patch('/update:id')
  update(@Param('id') id: string, @Body() updateMListExpenseGroupDto: UpdateMListExpenseGroupDto) {
    return this.mListExpenseGroupService.update(+id, updateMListExpenseGroupDto);
  }

  @Delete('/remove:id')
  remove(@Param('id') id: string) {
    return this.mListExpenseGroupService.remove(+id);
  }
}
