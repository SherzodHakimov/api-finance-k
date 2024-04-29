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
import { MOperationsService } from './m-operations.service';
import { CreateMOperationDto } from './dto/create-m-operation.dto';
import { UpdateMOperationDto } from './dto/update-m-operation.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorDto } from '../shared/dto/error.dto';
import { DataMOperationDto } from './dto/data-m-operation.dto';

@Controller('m-operations')
@UsePipes(new ValidationPipe())
@ApiTags('Operations')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: ErrorDto })
export class MOperationsController {

  constructor(private readonly mOperationsService: MOperationsService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMOperationDto,
  })
  create(@Body() createMOperationDto: CreateMOperationDto) {
    return this.mOperationsService.create(createMOperationDto);
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMOperationDto,
  })
  findAll() {
    return this.mOperationsService.findAll();
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Get one item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMOperationDto,
  })
  findOne(@Param('id') id: string) {
    return this.mOperationsService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update one item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMOperationDto,
  })
  update(@Param('id') id: string, @Body() updateMOperationDto: UpdateMOperationDto) {
    return this.mOperationsService.update(+id, updateMOperationDto);
  }

  @Delete('/remove/:id')
  @ApiOperation({ summary: 'Delete one item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMOperationDto,
  })
  remove(@Param('id') id: string) {
    return this.mOperationsService.remove(+id);
  }
}
