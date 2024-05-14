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
import { MUserRoleActionsService } from './m-user-role-actions.service';
import { CreateMUserRoleActionDto } from './dto/create-m-user-role-action.dto';
import { UpdateMUserRoleActionDto } from './dto/update-m-user-role-action.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataMUserRoleActionDto } from './dto/data-m-user-role-action.dto';
import { ErrorDto } from '../shared/dto/error.dto';
import { JwtAuthGuard } from '../m-auth/jwt.-auth.guard';

@Controller('m-user-role-actions')
@UsePipes(new ValidationPipe())
@ApiTags('UserRoleAction')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: ErrorDto })
// @UseGuards(JwtAuthGuard) //guard
// @ApiBearerAuth() //swagger

export class MUserRoleActionsController {
  constructor(private readonly mUserRoleActionsService: MUserRoleActionsService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMUserRoleActionDto })
  create(@Body() createMUserRoleActionDto: CreateMUserRoleActionDto) {
    return this.mUserRoleActionsService.create(createMUserRoleActionDto);
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMUserRoleActionDto })
  findAll() {
    return this.mUserRoleActionsService.findAll();
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Get one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMUserRoleActionDto })
  findOne(@Param('id') id: string) {
    return this.mUserRoleActionsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMUserRoleActionDto: UpdateMUserRoleActionDto) {
  //   return this.mUserRoleActionsService.update(+id, updateMUserRoleActionDto);
  // }

  @Delete('/remove/:id')
  @ApiOperation({ summary: 'Delete one item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: DataMUserRoleActionDto })
  remove(@Param('id') id: string) {
    return this.mUserRoleActionsService.remove(+id);
  }
}
