import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UsePipes,
  ValidationPipe, UseGuards,
} from '@nestjs/common';
import { MSettingsService } from './m-settings.service';
import { CreateMSettingDto } from './dto/create-m-setting.dto';
import { UpdateMSettingDto } from './dto/update-m-setting.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMSettingOperationDto } from './dto/create-m-settong-operation.dto';
import { DataMSettingsDto } from './dto/data-m-settings.dto';
import { DataMSettingsOperationDto } from './dto/data-m-settings-operation.dto';
import { ErrorDto } from 'src/shared/dto/error.dto';
import { JwtAuthGuard } from '../m-auth/jwt.-auth.guard';

@Controller('m-settings')
@UsePipes(new ValidationPipe())
@ApiTags('Settings')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: ErrorDto })
// @UseGuards(JwtAuthGuard) //guard
// @ApiBearerAuth() //swagger

export class MSettingsController {

  constructor(private readonly mSettingsService: MSettingsService) {}

  // @ApiTags('user-status')
  @Post('/user-status/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async createUserStatus(@Body() createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.mSettingsService.createUserStatus(createMSettingDto);
  }
  @Get('/user-status/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async findAllUserStatus(): Promise<DataMSettingsDto[]> {
    return await this.mSettingsService.findAllUserStatus();
  }

  // @ApiTags('list-status')
  @Post('/list-status/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async createListStatus(@Body() createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.mSettingsService.createListStatus(createMSettingDto);
  }
  @Get('/list-status/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async findAllListStatus(): Promise<DataMSettingsDto[]> {
    return await this.mSettingsService.findAllListStatus();
  }


  // @ApiTags('operation-status')
  @Post('/operation-status/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async createOperationStatus(@Body() createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.mSettingsService.createOperationStatus(createMSettingDto);
  }
  @Get('/operation-status/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async findAllOperationStatus(): Promise<DataMSettingsDto[]> {
    return await this.mSettingsService.findAllOperationStatus();
  }


  // @ApiTags('currency-type')
  @Post('/currency-type/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async createCurrencyType(@Body() createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.mSettingsService.createCurrencyType(createMSettingDto);
  }
  @Get('/currency-type/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async findAllCurrencyType(): Promise<DataMSettingsDto[]> {
    return await this.mSettingsService.findAllCurrencyType();
  }


  // @ApiTags('user-role')
  @Post('/user-role/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async createUserRole(@Body() createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.mSettingsService.createUserRole(createMSettingDto);
  }
  @Get('/user-role/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async findAllUserRole(): Promise<DataMSettingsDto[]> {
    return await this.mSettingsService.findAllUserRole();
  }


  // @ApiTags('user-action')
  @Post('/user-action/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async createUserAction(@Body() createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.mSettingsService.createUserAction(createMSettingDto);
  }
  @Get('/user-action/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async findAllUserAction(): Promise<DataMSettingsDto[]> {
    return await this.mSettingsService.findAllUserAction();
  }


  // @ApiTags('payment-doc')
  @Post('/payment-doc/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async createPaymentDoc(@Body() createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.mSettingsService.createPaymentDoc(createMSettingDto);
  }
  @Get('/payment-doc/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async findAllPaymentDoc(): Promise<DataMSettingsDto[]> {
    return await this.mSettingsService.findAllPaymentDoc();
  }


  // @ApiTags('operation')
  @Post('/operation/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async createOperation(@Body() createMSettingOperationDto: CreateMSettingOperationDto): Promise<DataMSettingsOperationDto> {
    return await this.mSettingsService.createOperation(createMSettingOperationDto);
  }
  @Get('/operation/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async findAllOperation(): Promise<DataMSettingsOperationDto[]> {
    return await this.mSettingsService.findAllOperation();
  }


  // @ApiTags('account-type')
  @Post('/account-type/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async createAccountType(@Body() createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.mSettingsService.createAccountType(createMSettingDto);
  }
  @Get('/account-type/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async findAllAccountType(): Promise<DataMSettingsDto[]> {
    return await this.mSettingsService.findAllAccountType();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mSettingsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMSettingDto: UpdateMSettingDto) {
  //   return this.mSettingsService.update(+id, updateMSettingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mSettingsService.remove(+id);
  // }
}
