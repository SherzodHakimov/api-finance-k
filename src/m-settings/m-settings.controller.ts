import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MSettingsService } from './m-settings.service';
import { CreateMSettingDto } from './dto/create-m-setting.dto';
import { UpdateMSettingDto } from './dto/update-m-setting.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateMSettingOperationDto } from './dto/create-m-settong-operation.dto';

@Controller('m-settings')
// @ApiTags('Settings')
export class MSettingsController {
  constructor(private readonly mSettingsService: MSettingsService) {}

  @ApiTags('user-status')
  @Get('/user-status')
  findAllUserStatus() {
    return this.mSettingsService.findAllUserStatus();
  }
  @ApiTags('user-status')
  @Post('/user-status')
  createUserStatus(@Body() createMSettingDto: CreateMSettingDto) {
    return this.mSettingsService.createUserStatus(createMSettingDto);
  }

  @ApiTags('list-status')
  @Get('/list-status')
  findAllListStatus() {
    return this.mSettingsService.findAllListStatus();
  }
  @ApiTags('list-status')
  @Post('/list-status')
  createListStatus(@Body() createMSettingDto: CreateMSettingDto) {
    return this.mSettingsService.createListStatus(createMSettingDto);
  }

  @ApiTags('operation-status')
  @Get('/operation-status')
  findAllOperationStatus() {
    return this.mSettingsService.findAllOperationStatus();
  }
  @ApiTags('operation-status')
  @Post('/operation-status')
  createOperationStatus(@Body() createMSettingDto: CreateMSettingDto) {
    return this.mSettingsService.createOperationStatus(createMSettingDto);
  }

  @ApiTags('currency-type')
  @Get('/currency-type')
  findAllCurrencyType() {
    return this.mSettingsService.findAllCurrencyType();
  }
  @ApiTags('currency-type')
  @Post('/currency-type')
  createCurrencyType(@Body() createMSettingDto: CreateMSettingDto) {
    return this.mSettingsService.createCurrencyType(createMSettingDto);
  }

  @ApiTags('user-role')
  @Get('/user-role')
  findAllUserRole() {
    return this.mSettingsService.findAllUserRole();
  }
  @ApiTags('user-role')
  @Post('/user-role')
  createUserRole(@Body() createMSettingDto: CreateMSettingDto) {
    return this.mSettingsService.createUserRole(createMSettingDto);
  }

  @ApiTags('user-action')
  @Get('/user-action')
  findAllUserAction() {
    return this.mSettingsService.findAllUserAction();
  }
  @ApiTags('user-action')
  @Post('/user-action')
  createUserAction(@Body() createMSettingDto: CreateMSettingDto) {
    return this.mSettingsService.createUserAction(createMSettingDto);
  }

  @ApiTags('payment-doc')
  @Get('/payment-doc')
  findAllPaymentDoc() {
    return this.mSettingsService.findAllPaymentDoc();
  }
  @ApiTags('payment-doc')
  @Post('/payment-doc')
  createPaymentDoc(@Body() createMSettingDto: CreateMSettingDto) {
    return this.mSettingsService.createPaymentDoc(createMSettingDto);
  }

  @ApiTags('operation')
  @Get('/operation')
  findAllOperation() {
    return this.mSettingsService.findAllOperation();
  }
  @ApiTags('operation')
  @Post('/operation')
  createOperation(
    @Body() createMSettingOperationDto: CreateMSettingOperationDto,
  ) {
    return this.mSettingsService.createOperation(createMSettingOperationDto);
  }

  @ApiTags('account-type')
  @Get('/account-type')
  findAllAccountType() {
    return this.mSettingsService.findAllAccountType();
  }
  @ApiTags('account-type')
  @Post('/account-type')
  createAccountType(@Body() createMSettingDto: CreateMSettingDto) {
    return this.mSettingsService.createAccountType(createMSettingDto);
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
