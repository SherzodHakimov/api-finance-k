import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MListAccountService } from './m-list-account.service';
import { CreateMListAccountDto } from './dto/create-m-list-account.dto';
import { UpdateMListAccountDto } from './dto/update-m-list-account.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('m-list-account')
@ApiTags('listAccount')
export class MListAccountController {
  constructor(private readonly mListsAccountService: MListAccountService) {}

  @Post('/create')
  create(@Body() createMListsAccountDto: CreateMListAccountDto) {
    return this.mListsAccountService.create(createMListsAccountDto);
  }

  @Get('/list')
  findAll() {
    return this.mListsAccountService.findAll();
  }

  @Get('/get:id')
  findOne(@Param('id') id: string) {
    return this.mListsAccountService.findOne(+id);
  }

  @Patch('/update:id')
  update(@Param('id') id: string, @Body() updateMListsAccountDto: UpdateMListAccountDto) {
    return this.mListsAccountService.update(+id, updateMListsAccountDto);
  }

  @Delete('/remove:id')
  remove(@Param('id') id: string) {
    return this.mListsAccountService.remove(+id);
  }
}
