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
import { MCurrencyValueService } from './m-currency-value.service';
import { CreateMCurrencyValueDto } from './dto/create-m-currency-value.dto';
import { UpdateMCurrencyValueDto } from './dto/update-m-currency-value.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorDto } from '../shared/dto/error.dto';
import { DataMCurrencyValueDto } from './dto/data-m-currency-value.dto';
import { PaginationItemsDto } from '../shared/dto/pagination-items.dto';


@Controller('m-currency-value')
@UsePipes(new ValidationPipe())
@ApiTags('CurrencyValue')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: ErrorDto })
export class MCurrencyValueController {
  constructor(private readonly mCurrencyValueService: MCurrencyValueService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMCurrencyValueDto,
  })
  create(@Body() createMCurrencyValueDto: CreateMCurrencyValueDto) {
    return this.mCurrencyValueService.create(createMCurrencyValueDto);
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMCurrencyValueDto,
  })
  @Get()
  findAll() {
    return this.mCurrencyValueService.findAll();
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Get one item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMCurrencyValueDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mCurrencyValueService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update one item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMCurrencyValueDto,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMCurrencyValueDto: UpdateMCurrencyValueDto) {
    return this.mCurrencyValueService.update(+id, updateMCurrencyValueDto);
  }

  @Delete('/remove/:id')
  @ApiOperation({ summary: 'Delete one item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMCurrencyValueDto,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mCurrencyValueService.remove(+id);
  }

  @Post('/list/pagination')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMCurrencyValueDto,
  })
  listPagination(@Body() dataPaginationDto: PaginationItemsDto) {
    return this.mCurrencyValueService.listPagination(dataPaginationDto);
  }
}
