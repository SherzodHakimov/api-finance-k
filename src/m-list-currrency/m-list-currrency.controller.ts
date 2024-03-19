import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MListCurrrencyService } from './m-list-currrency.service';
import { CreateMListCurrrencyDto } from './dto/create-m-list-currrency.dto';
import { UpdateMListCurrrencyDto } from './dto/update-m-list-currrency.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('m-list-currrency')
@ApiTags('listCurrency')
export class MListCurrrencyController {
  constructor(private readonly mListCurrrencyService: MListCurrrencyService) {}

  @Post('/create')
  create(@Body() createMListCurrrencyDto: CreateMListCurrrencyDto) {
    return this.mListCurrrencyService.create(createMListCurrrencyDto);
  }

  @Get('/list')
  findAll() {
    return this.mListCurrrencyService.findAll();
  }

  @Get('/get:id')
  findOne(@Param('id') id: string) {
    return this.mListCurrrencyService.findOne(+id);
  }

  @Patch('/update:id')
  update(@Param('id') id: string, @Body() updateMListCurrrencyDto: UpdateMListCurrrencyDto) {
    return this.mListCurrrencyService.update(+id, updateMListCurrrencyDto);
  }

  @Delete('/remove:id')
  remove(@Param('id') id: string) {
    return this.mListCurrrencyService.remove(+id);
  }
}
