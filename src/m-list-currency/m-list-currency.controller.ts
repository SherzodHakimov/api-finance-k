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
  HttpStatus, UseInterceptors, UseGuards,
} from '@nestjs/common';
import { MListCurrencyService } from './m-list-currency.service';
import { CreateMListCurrencyDto } from './dto/create-m-list-currency.dto';
import { UpdateMListCurrencyDto } from './dto/update-m-list-currency.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataMListCurrencyDto } from './dto/data-m-list-currency.dto';
import { ErrorDto } from 'src/shared/dto/error.dto';
import { ResponseBodyInterceptor } from '../response-body.interceptor';
import { JwtAuthGuard } from '../m-auth/jwt-auth.guard';


@Controller('m-list-currency')
@UsePipes(new ValidationPipe())
@UseInterceptors(ResponseBodyInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('listCurrency')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: ErrorDto })
export class MListCurrencyController {
    constructor(private readonly mListCurrencyService: MListCurrencyService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListCurrencyDto })
  create(@Body() createMListCurrencyDto: CreateMListCurrencyDto) {
    return this.mListCurrencyService.create(createMListCurrencyDto);
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListCurrencyDto })
  findAll() {
    return this.mListCurrencyService.findAll();
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Get one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListCurrencyDto })
  findOne(@Param('id') id: string) {
    return this.mListCurrencyService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListCurrencyDto })
  update(@Param('id') id: string, @Body() updateMListCurrencyDto: UpdateMListCurrencyDto) {
    return this.mListCurrencyService.update(+id, updateMListCurrencyDto);
  }

  @Delete('/remove/:id')
  @ApiOperation({ summary: 'Delete one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListCurrencyDto })
  remove(@Param('id') id: string) {
    return this.mListCurrencyService.remove(+id);
  }
}
