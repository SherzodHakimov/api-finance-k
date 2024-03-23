import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { MListCurrencyService } from './m-list-currency.service';
import { CreateMListCurrencyDto } from './dto/create-m-list-currency.dto';
import { UpdateMListCurrencyDto } from './dto/update-m-list-currency.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataMListCurrencyDto } from './dto/data-m-list-currency.dto';

@Controller('m-list-currency')
@UsePipes(new ValidationPipe())
@ApiTags('listCurrency')
// @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: DataMListExpenseGroupDto })
export class MListCurrencyController {
    constructor(private readonly mListCurrrencyService: MListCurrencyService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListCurrencyDto })
  create(@Body() createMListCurrrencyDto: CreateMListCurrencyDto) {
    return this.mListCurrrencyService.create(createMListCurrrencyDto);
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListCurrencyDto })
  findAll() {
    return this.mListCurrrencyService.findAll();
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Get one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListCurrencyDto })
  findOne(@Param('id') id: string) {
    return this.mListCurrrencyService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListCurrencyDto })
  update(@Param('id') id: string, @Body() updateMListCurrrencyDto: UpdateMListCurrencyDto) {
    return this.mListCurrrencyService.update(+id, updateMListCurrrencyDto);
  }

  @Delete('/remove/:id')
  @ApiOperation({ summary: 'Delete one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListCurrencyDto })
  remove(@Param('id') id: string) {
    return this.mListCurrrencyService.remove(+id);
  }
}
