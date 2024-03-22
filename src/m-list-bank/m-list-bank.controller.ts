import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { MListBankService } from './m-list-bank.service';
import { CreateMListBankDto } from './dto/create-m-list-bank.dto';
import { UpdateMListBankDto } from './dto/update-m-list-bank.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('m-list-bank')
@UsePipes(new ValidationPipe())
@ApiTags('listBank')
export class MListBankController {
  constructor(private readonly mListsBankService: MListBankService) {}

  @Post('/create')
  create(@Body() createMListsBankDto: CreateMListBankDto) {
    return this.mListsBankService.create(createMListsBankDto);
  }

  @Get('/list')
  findAll() {
    return this.mListsBankService.findAll();
  }

  @Get('/get/:id')
  findOne(@Param('id') id: string) {
    return this.mListsBankService.findOne(+id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateMListsBankDto: UpdateMListBankDto) {
    return this.mListsBankService.update(+id, updateMListsBankDto);
  }

  @Delete('/remove/:id')
  remove(@Param('id') id: string) {
    return this.mListsBankService.remove(+id);
  }

}
