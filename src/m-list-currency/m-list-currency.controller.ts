import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { MListCurrencyService } from './m-list-currency.service';
import { CreateMListCurrencyDto } from './dto/create-m-list-currency.dto';
import { UpdateMListCurrencyDto } from './dto/update-m-list-currency.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('m-list-currency')
@UsePipes(new ValidationPipe())
@ApiTags('listCurrency')
export class MListCurrencyController {
    constructor(private readonly mListCurrrencyService: MListCurrencyService) {}

  @Post('/create')
  create(@Body() createMListCurrrencyDto: CreateMListCurrencyDto) {
    return this.mListCurrrencyService.create(createMListCurrrencyDto);
  }

  @Get('/list')
  findAll() {
    return this.mListCurrrencyService.findAll();
  }

  @Get('/get/:id')
  findOne(@Param('id') id: string) {
    return this.mListCurrrencyService.findOne(+id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateMListCurrrencyDto: UpdateMListCurrencyDto) {
    return this.mListCurrrencyService.update(+id, updateMListCurrrencyDto);
  }

  @Delete('/remove/:id')
  remove(@Param('id') id: string) {
    return this.mListCurrrencyService.remove(+id);
  }
}
