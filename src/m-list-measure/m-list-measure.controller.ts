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
import { MListMeasureService } from './m-list-measure.service';
import { CreateMListMeasureDto } from './dto/create-m-list-measure.dto';
import { UpdateMListMeasureDto } from './dto/update-m-list-measure.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataMListMeasureDto } from './dto/data-m-list-measure.dto';
import { ErrorDto } from 'src/shared/dto/error.dto';
import { JwtAuthGuard } from '../m-auth/jwt.-auth.guard';

@Controller('m-list-measure')
@UsePipes(new ValidationPipe())
@ApiTags('listMeasure')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: ErrorDto })
// @UseGuards(JwtAuthGuard) //guard
// @ApiBearerAuth() //swagger

export class MListMeasureController {
  constructor(private readonly mListMeasureService: MListMeasureService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListMeasureDto })
  create(@Body() createMListMeasureDto: CreateMListMeasureDto) {
    return this.mListMeasureService.create(createMListMeasureDto);
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListMeasureDto })
  findAll() {
    return this.mListMeasureService.findAll();
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Get one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListMeasureDto })
  findOne(@Param('id') id: string) {
    return this.mListMeasureService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListMeasureDto })
  update(@Param('id') id: string, @Body() updateMListMeasureDto: UpdateMListMeasureDto) {
    return this.mListMeasureService.update(+id, updateMListMeasureDto);
  }

  @Delete('/remove/:id')
  @ApiOperation({ summary: 'Delete one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListMeasureDto })
  remove(@Param('id') id: string) {
    return this.mListMeasureService.remove(+id);
  }
}
