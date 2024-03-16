import { Injectable } from '@nestjs/common';
import { CreateMSettingDto } from './dto/create-m-setting.dto';
import { UpdateMSettingDto } from './dto/update-m-setting.dto';
import { PrismaService } from 'src/prisma-service';
import { CreateMSettingOperationDto } from './dto/create-m-settong-operation.dto';

@Injectable()
export class MSettingsService {
  constructor(private prismaService: PrismaService) {}

  // set_user_status
  findAllUserStatus() {
    return this.prismaService.set_user_status.findMany();
  }
  createUserStatus(createMSettingDto: CreateMSettingDto) {
    return this.prismaService.set_user_status.create({
      data: createMSettingDto,
    });
  }

  // set_list_status
  findAllListStatus() {
    return this.prismaService.set_list_status.findMany();
  }
  createListStatus(createMSettingDto: CreateMSettingDto) {
    return this.prismaService.set_list_status.create({
      data: createMSettingDto,
    });
  }

  // set_operation_status
  findAllOperationStatus() {
    return this.prismaService.set_operation_status.findMany();
  }
  createOperationStatus(createMSettingDto: CreateMSettingDto) {
    return this.prismaService.set_operation_status.create({
      data: createMSettingDto,
    });
  }

  // set_currency_type
  findAllCurrencyType() {
    return this.prismaService.set_currency_type.findMany();
  }
  createCurrencyType(createMSettingDto: CreateMSettingDto) {
    return this.prismaService.set_currency_type.create({
      data: createMSettingDto,
    });
  }

  // set_user_role
  findAllUserRole() {
    return this.prismaService.set_user_role.findMany();
  }
  createUserRole(createMSettingDto: CreateMSettingDto) {
    return this.prismaService.set_user_role.create({
      data: createMSettingDto,
    });
  }

  // set_user_action
  findAllUserAction() {
    return this.prismaService.set_user_action.findMany();
  }
  createUserAction(createMSettingDto: CreateMSettingDto) {
    return this.prismaService.set_user_action.create({
      data: createMSettingDto,
    });
  }

  // set_payment_doc
  findAllPaymentDoc() {
    return this.prismaService.set_payment_doc.findMany();
  }
  createPaymentDoc(createMSettingDto: CreateMSettingDto) {
    return this.prismaService.set_payment_doc.create({
      data: createMSettingDto,
    });
  }

  // set_operation
  findAllOperation() {
    return this.prismaService.set_operation.findMany();
  }
  createOperation(createMSettingOperationDto: CreateMSettingOperationDto) {
    return this.prismaService.set_operation.create({
      data: createMSettingOperationDto,
    });
  }

  // set_account_type
  findAllAccountType() {
    return this.prismaService.set_account_type.findMany();
  }
  createAccountType(createMSettingDto: CreateMSettingDto) {
    return this.prismaService.set_account_type.create({
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
