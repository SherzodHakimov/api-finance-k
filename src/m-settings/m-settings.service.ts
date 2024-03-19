import { Injectable } from '@nestjs/common';
import { CreateMSettingDto } from './dto/create-m-setting.dto';
import { UpdateMSettingDto } from './dto/update-m-setting.dto';
import { PrismaService } from 'src/prisma-service';
import { CreateMSettingOperationDto } from './dto/create-m-settong-operation.dto';
import { DataMSettingsDto } from './dto/data-m-settings.dto';
import { DataMSettingsOperationDto } from './dto/data-m-settings-operation.dto';

@Injectable()
export class MSettingsService {
  constructor(private prismaService: PrismaService) {}

  // set_user_status
  async findAllUserStatus(): Promise<DataMSettingsDto[]> {
    return await this.prismaService.set_user_status.findMany();
  }
  async createUserStatus(createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.prismaService.set_user_status.create({
      data: createMSettingDto,
    });
  }

  // set_list_status
  async findAllListStatus(): Promise<DataMSettingsDto[]> {
    return await this.prismaService.set_list_status.findMany();
  }
  async createListStatus(createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.prismaService.set_list_status.create({
      data: createMSettingDto,
    });
  }

  // set_operation_status
  async findAllOperationStatus(): Promise<DataMSettingsDto[]> {
    return await this.prismaService.set_operation_status.findMany();
  }
  async createOperationStatus(createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.prismaService.set_operation_status.create({
      data: createMSettingDto,
    });
  }

  // set_currency_type
   async findAllCurrencyType(): Promise<DataMSettingsDto[]> {
    return await this.prismaService.set_currency_type.findMany();
  }
  async createCurrencyType(createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.prismaService.set_currency_type.create({
      data: createMSettingDto,
    });
  }

  // set_user_role
  async findAllUserRole(): Promise<DataMSettingsDto[]> {
    return await this.prismaService.set_user_role.findMany();
  }
  async createUserRole(createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.prismaService.set_user_role.create({
      data: createMSettingDto,
    });
  }

  // set_user_action
  async findAllUserAction(): Promise<DataMSettingsDto[]> {
    return await this.prismaService.set_user_action.findMany();
  }
  async createUserAction(createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.prismaService.set_user_action.create({
      data: createMSettingDto,
    });
  }

  // set_payment_doc
  async findAllPaymentDoc(): Promise<DataMSettingsDto[]> {
    return await this.prismaService.set_payment_doc.findMany();
  }
  async createPaymentDoc(createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.prismaService.set_payment_doc.create({
      data: createMSettingDto,
    });
  }

  // set_operation
  async findAllOperation(): Promise<DataMSettingsOperationDto[]> {
    return await this.prismaService.set_operation.findMany();
  }
  async createOperation(createMSettingOperationDto: CreateMSettingOperationDto): Promise<DataMSettingsOperationDto> {
    return await this.prismaService.set_operation.create({
      data: createMSettingOperationDto,
    });
  }

  // set_account_type
  async findAllAccountType(): Promise<DataMSettingsDto[]> {
    return await this.prismaService.set_account_type.findMany();
  }
  async createAccountType(createMSettingDto: CreateMSettingDto): Promise<DataMSettingsDto> {
    return await this.prismaService.set_account_type.create({
      data: createMSettingDto,
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} mSetting`;
  // }

  // update(id: number, updateMSettingDto: UpdateMSettingDto) {
  //   return `This action updates a #${id} mSetting`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} mSetting`;
  // }
}
