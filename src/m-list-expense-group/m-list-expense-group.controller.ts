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
import { MListExpenseGroupService } from './m-list-expense-group.service';
import { CreateMListExpenseGroupDto } from './dto/create-m-list-expense-group.dto';
import { UpdateMListExpenseGroupDto } from './dto/update-m-list-expense-group.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataMListExpenseGroupDto } from './dto/data-m-list-expense-group.dto';
import { ErrorDto } from 'src/shared/dto/error.dto';
import { ResponseBodyInterceptor } from '../response-body.interceptor';
import { JwtAuthGuard } from '../m-auth/jwt-auth.guard';

@Controller('m-list-expense-group')
@UsePipes(new ValidationPipe())
@UseInterceptors(ResponseBodyInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('listExpenseGroup')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: ErrorDto })
export class MListExpenseGroupController {
  constructor(private readonly mListExpenseGroupService: MListExpenseGroupService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListExpenseGroupDto })
  create(@Body() createMListExpenseGroupDto: CreateMListExpenseGroupDto) {
    return this.mListExpenseGroupService.create(createMListExpenseGroupDto);
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListExpenseGroupDto })
  findAll() {
    return this.mListExpenseGroupService.findAll();
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Get one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListExpenseGroupDto })
  findOne(@Param('id') id: string) {
    return this.mListExpenseGroupService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListExpenseGroupDto })
  update(@Param('id') id: string, @Body() updateMListExpenseGroupDto: UpdateMListExpenseGroupDto) {
    return this.mListExpenseGroupService.update(+id, updateMListExpenseGroupDto);
  }

  @Delete('/remove/:id')
  @ApiOperation({ summary: 'Delete one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMListExpenseGroupDto })
  remove(@Param('id') id: string) {
    return this.mListExpenseGroupService.remove(+id);
  }
}
