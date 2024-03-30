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
import { MUserService } from './m-user.service';
import { CreateMUserDto } from './dto/create-m-user.dto';
import { UpdateMUserDto } from './dto/update-m-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataMUserDto } from './dto/data-m-user.dto';
import { ErrorDto } from 'src/shared/dto/error.dto';

@Controller('m-user')
@UsePipes(new ValidationPipe())
@ApiTags('User')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: ErrorDto })
export class MUserController {
  constructor(private readonly mUserService: MUserService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMUserDto,
  })
  create(@Body() createMUserDto: CreateMUserDto) {
    return this.mUserService.create(createMUserDto);
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMUserDto,
  })
  findAll() {
    return this.mUserService.findAll();
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Get one item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMUserDto,
  })
  findOne(@Param('id') id: string) {
    return this.mUserService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update one item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMUserDto,
  })
  update(@Param('id') id: string, @Body() updateMUserDto: UpdateMUserDto) {
    return this.mUserService.update(+id, updateMUserDto);
  }

  @Delete('/remove/:id')
  @ApiOperation({ summary: 'Delete one item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMUserDto,
  })
  remove(@Param('id') id: string) {
    return this.mUserService.remove(+id);
  }
}
