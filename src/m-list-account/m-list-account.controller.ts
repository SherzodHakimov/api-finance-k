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
import { MListAccountService } from './m-list-account.service';
import { CreateMListAccountDto } from './dto/create-m-list-account.dto';
import { UpdateMListAccountDto } from './dto/update-m-list-account.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataMListAccountDto } from './dto/data-m-list-account.dto';
import { ErrorDto } from 'src/shared/dto/error.dto';
import { ResponseBodyInterceptor } from '../response-body.interceptor';
import { JwtAuthGuard } from '../m-auth/jwt-auth.guard';

@Controller('m-list-account')
@UsePipes(new ValidationPipe())
@UseInterceptors(ResponseBodyInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('listAccount')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: ErrorDto })
export class MListAccountController {
  constructor(private readonly mListsAccountService: MListAccountService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMListAccountDto,
  })
  create(@Body() createMListsAccountDto: CreateMListAccountDto) {
    return this.mListsAccountService.create(createMListsAccountDto);
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMListAccountDto,
  })
  findAll() {
    return this.mListsAccountService.findAll();
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Get one item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMListAccountDto,
  })
  findOne(@Param('id') id: string) {
    return this.mListsAccountService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update one item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMListAccountDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateMListsAccountDto: UpdateMListAccountDto,
  ) {
    return this.mListsAccountService.update(+id, updateMListsAccountDto);
  }

  @Delete('/remove/:id')
  @ApiOperation({ summary: 'Delete one item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMListAccountDto,
  })
  remove(@Param('id') id: string) {
    return this.mListsAccountService.remove(+id);
  }
}
