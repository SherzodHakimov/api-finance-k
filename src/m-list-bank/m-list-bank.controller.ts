import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  HttpStatus, UseInterceptors, UseGuards,
} from '@nestjs/common';
import { MListBankService } from './m-list-bank.service';
import { CreateMListBankDto } from './dto/create-m-list-bank.dto';
import { UpdateMListBankDto } from './dto/update-m-list-bank.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataMListBankDto } from './dto/data-m-list-bank.dto';
import { ErrorDto } from 'src/shared/dto/error.dto';
import { ResponseBodyInterceptor } from '../response-body.interceptor';
import { JwtAuthGuard } from '../m-auth/jwt-auth.guard';

@Controller('m-list-bank')
@UsePipes(new ValidationPipe())
@UseInterceptors(ResponseBodyInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('listBank')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: ErrorDto })
export class MListBankController {
  constructor(private readonly mListsBankService: MListBankService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListBankDto })
  create(@Body() createMListsBankDto: CreateMListBankDto) {
    return this.mListsBankService.create(createMListsBankDto);
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListBankDto })
  findAll() {
    return this.mListsBankService.findAll();
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Get one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListBankDto })
  findOne(@Param('id') id: string) {
    return this.mListsBankService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListBankDto })
  update(@Param('id') id: string, @Body() updateMListsBankDto: UpdateMListBankDto) {
    return this.mListsBankService.update(+id, updateMListsBankDto);
  }

  @Delete('/remove/:id')
  @ApiOperation({ summary: 'Delete one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListBankDto })
  remove(@Param('id') id: string) {
    return this.mListsBankService.remove(+id);
  }

}
