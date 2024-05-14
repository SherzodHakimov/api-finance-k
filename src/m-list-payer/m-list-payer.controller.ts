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
  UseGuards,
} from '@nestjs/common';
import { MListPayerService } from './m-list-payer.service';
import { CreateMListPayerDto } from './dto/create-m-list-payer.dto';
import { UpdateMListPayerDto } from './dto/update-m-list-payer.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataMListPayerDto } from './dto/data-m-list-payer.dto';
import { ErrorDto } from 'src/shared/dto/error.dto';
import { JwtAuthGuard } from '../m-auth/jwt.-auth.guard';

@Controller('m-list-payer')
@UsePipes(new ValidationPipe())
@ApiTags('listPayer')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: ErrorDto })
// @UseGuards(JwtAuthGuard) //guard
// @ApiBearerAuth() //swagger

export class MListPayerController {
  constructor(private readonly mListPayerService: MListPayerService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListPayerDto })
  create(@Body() createMListPayerDto: CreateMListPayerDto) {
    return this.mListPayerService.create(createMListPayerDto);
  }
  
  @Get('/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListPayerDto })
  findAll() {
    return this.mListPayerService.findAll();
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Get one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListPayerDto })
  findOne(@Param('id') id: string) {
    return this.mListPayerService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListPayerDto })
  update(@Param('id') id: string, @Body() updateMListPayerDto: UpdateMListPayerDto) {
    return this.mListPayerService.update(+id, updateMListPayerDto);
  }

  @Delete('/remove/:id')
  @ApiOperation({ summary: 'Delete one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListPayerDto })
  remove(@Param('id') id: string) {
    return this.mListPayerService.remove(+id);
  }
}
