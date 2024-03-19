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
  ValidationPipe,
} from '@nestjs/common';
import { MSettingsService } from './m-settings.service';
import { CreateMSettingDto } from './dto/create-m-setting.dto';
import { UpdateMSettingDto } from './dto/update-m-setting.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMSettingOperationDto } from './dto/create-m-settong-operation.dto';
import { DataMSettingsDto } from './dto/data-m-settings.dto';
import { DataMSettingsOperationDto } from './dto/data-m-settings-operation.dto';

@Controller('m-settings')
@ApiTags('Settings')
export class MSettingsController {
  constructor(private readonly mSettingsService: MSettingsService) {}


  @Get('/user-status')
  // @ApiTags('user-status')
  @ApiOperation({ summary: 'Get user status list' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DataMSettingsDto] })
  async findAllUserStatus(): Promise<DataMSettingsDto[]> {
    return await this.mSettingsService.findAllUserStatus();
  }
  @Post('/user-status')
  @UsePipes(new ValidationPipe())
  // @ApiTags('user-status')
  @ApiOperation({ summary: 'Create user status' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMSettingsDto })
  async createUserStatus(@Body() createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.mSettingsService.createUserStatus(createMSettingDto);
  }

  // @ApiTags('list-status')
  @Get('/list-status')
  async findAllListStatus(): Promise<DataMSettingsDto[]> {
    return await this.mSettingsService.findAllListStatus();
  }
  // @ApiTags('list-status')
  @Post('/list-status')
  async createListStatus(@Body() createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.mSettingsService.createListStatus(createMSettingDto);
  }

  // @ApiTags('operation-status')
  @Get('/operation-status')
  async findAllOperationStatus(): Promise<DataMSettingsDto[]> {
    return await this.mSettingsService.findAllOperationStatus();
  }
  // @ApiTags('operation-status')
  @Post('/operation-status')
  async createOperationStatus(@Body() createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.mSettingsService.createOperationStatus(createMSettingDto);
  }

  // @ApiTags('currency-type')
  @Get('/currency-type')
  async findAllCurrencyType(): Promise<DataMSettingsDto[]> {
    return await this.mSettingsService.findAllCurrencyType();
  }
  // @ApiTags('currency-type')
  @Post('/currency-type')
  async createCurrencyType(@Body() createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.mSettingsService.createCurrencyType(createMSettingDto);
  }

  // @ApiTags('user-role')
  @Get('/user-role')
  async findAllUserRole(): Promise<DataMSettingsDto[]> {
    return await this.mSettingsService.findAllUserRole();
  }
  // @ApiTags('user-role')
  @Post('/user-role')
  async createUserRole(@Body() createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.mSettingsService.createUserRole(createMSettingDto);
  }

  // @ApiTags('user-action')
  @Get('/user-action')
  async findAllUserAction(): Promise<DataMSettingsDto[]> {
    return await this.mSettingsService.findAllUserAction();
  }
  // @ApiTags('user-action')
  @Post('/user-action')
  async createUserAction(@Body() createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.mSettingsService.createUserAction(createMSettingDto);
  }

  // @ApiTags('payment-doc')
  @Get('/payment-doc')
  async findAllPaymentDoc(): Promise<DataMSettingsDto[]> {
    return await this.mSettingsService.findAllPaymentDoc();
  }
  // @ApiTags('payment-doc')
  @Post('/payment-doc')
  async createPaymentDoc(@Body() createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.mSettingsService.createPaymentDoc(createMSettingDto);
  }

  // @ApiTags('operation')
  @Get('/operation')
  async findAllOperation(): Promise<DataMSettingsOperationDto[]> {
    return await this.mSettingsService.findAllOperation();
  }
  // @ApiTags('operation')
  @Post('/operation')
  async createOperation(@Body() createMSettingOperationDto: CreateMSettingOperationDto): Promise<DataMSettingsOperationDto> {
    return await this.mSettingsService.createOperation(createMSettingOperationDto);
  }

  // @ApiTags('account-type')
  @Get('/account-type')
  async findAllAccountType(): Promise<DataMSettingsDto[]> {
    return await this.mSettingsService.findAllAccountType();
  }
  // @ApiTags('account-type')
  @Post('/account-type')
  async createAccountType(@Body() createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.mSettingsService.createAccountType(createMSettingDto);
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
