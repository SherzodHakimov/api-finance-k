import { Controller, Get, Param, HttpStatus, UsePipes, ValidationPipe, Body, Post, UseInterceptors, UploadedFile, Patch} from '@nestjs/common';
import { MTelegramBotService } from './m-telegram-bot.service';

import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorDto } from '../shared/dto/error.dto';

import { DataMTelegramBotPositionCheckList } from './dto/data-m-telegram-position-check-list.dto';
import { DataMTelegramBotPositionList } from './dto/data-m-telegram-position-list.dto';
import { DataMTelegramStaffDto } from './dto/data-m-telegram-staff.dto';
import { CreateMTelegramBotScoreDto } from './dto/create-m-telegram-bot-score.dto';
import { DataMTelegramBotScoreDto } from './dto/data-m-telegram-bot-score.dto';
import { DataMTelegramBotAvgDto } from './dto/data-m-telegram-bot-avg.dto';
import { DataMTelegramBotSanaDto } from './dto/data-m-telegram-bot-sana.dto';
import { DataMTelegramBotSanaIdDto } from './dto/data-m-telegram-bot-sana-id.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataMTelegramBotBillDto } from './dto/data-m-telegram-bot-bill.dto';
import { CreateMTelegramBotBillDto } from './dto/create-m-telegram-bot-bill.dto';
import { DataMTelegramBotFileDto } from './dto/data-m-telegram-bot-file.dto';
import { UpdateMTelegramBotBillDto } from './dto/update-m-telegram-bot-bill.dto';
import { DataMTelegramBotBase64Dto } from './dto/data-m-telegram-bot-base64.dto';


@Controller('m-telegram-bot')
@UsePipes(new ValidationPipe())
@ApiTags('TelegramBot')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: ErrorDto })
export class MTelegramBotController {
  constructor(private readonly mTelegramBotService: MTelegramBotService) {}

  @Get('/register/:phone')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMTelegramStaffDto,
  })
  registerUser(@Param('phone') phone: string) {
    return this.mTelegramBotService.registerUser(phone);
  }

  @Get('/position-list')
  @ApiOperation({ summary: 'Get position list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [DataMTelegramBotPositionList],
  })
  getPositionList() {
    return this.mTelegramBotService.getPositionList();
  }

  @Get('/position-check-list/:id')
  @ApiOperation({ summary: 'Get position check list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [DataMTelegramBotPositionCheckList],
  })
  getPositionChecklist(@Param('id') id: string) {
    return this.mTelegramBotService.getPositionChecklist(+id);
  }

  @Get('/staff')
  @ApiOperation({ summary: 'Get staff list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [DataMTelegramStaffDto],
  })
  getStaffList() {
    return this.mTelegramBotService.getStaffList();
  }

  @Post('/set-score')
  @ApiOperation({ summary: 'Create new score' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMTelegramBotScoreDto,
  })
  create(@Body() createMTelegramBotScoreDto: CreateMTelegramBotScoreDto) {
    return this.mTelegramBotService.setScore(createMTelegramBotScoreDto);
  }

  @Post('/score/list')
  @ApiOperation({ summary: 'Get score avg. list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [DataMTelegramBotAvgDto],
  })
  getScoreList(@Body() dataMTelegramBotSanaDto: DataMTelegramBotSanaDto) {
    return this.mTelegramBotService.getScoreList(dataMTelegramBotSanaDto);
  }

  @Post('/score')
  @ApiOperation({ summary: 'Get score avg.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMTelegramBotAvgDto,
  })
  getScore(@Body() dataMTelegramBotSanaIdDto: DataMTelegramBotSanaIdDto) {
    return this.mTelegramBotService.getScore(dataMTelegramBotSanaIdDto);
  }

  @Post('upload')
  @ApiOperation({ summary: 'Upload file' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMTelegramBotFileDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        }
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File) {
    return this.mTelegramBotService.uploadFile(file)
  }

  @Post('/bill/set-file-data')
  @ApiOperation({ summary: 'Set file data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMTelegramBotBillDto,
  })
  setFileData(@Body() createMTelegramBotBillDto: CreateMTelegramBotBillDto) {
    return this.mTelegramBotService.setFileData(createMTelegramBotBillDto);
  }

  @Get('/bill/unconfirmed')
  @ApiOperation({ summary: 'Get unconfirmed bill list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [DataMTelegramBotBillDto],
  })
  getUnconfirmedBillList() {
    return this.mTelegramBotService.getUnconfirmedBillList();
  }

  @Post('/bill/confirmed')
  @ApiOperation({ summary: 'Get confirmed bill list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [DataMTelegramBotBillDto],
  })
  getConfirmedBillList(@Body() dataMTelegramBotSanaDto: DataMTelegramBotSanaDto) {
    return this.mTelegramBotService.getConfirmedBillList(dataMTelegramBotSanaDto);
  }

  @Patch('bill/update-confirm/:id')
  @ApiOperation({ summary: 'Update bill confirmed status' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMTelegramBotBillDto,
  })
  updateBill(@Param('id') id: string, @Body() updateMTelegramBotBillDto: UpdateMTelegramBotBillDto) {
    return this.mTelegramBotService.updateBill(+id, updateMTelegramBotBillDto);
  }

  @Get('bill/download/:filename')
  @ApiOperation({ summary: 'Get file in base64' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataMTelegramBotBase64Dto,
  })
  getFile(@Param('filename') filename: string) {
    return this.mTelegramBotService.getFile(filename)
  }

  // @Post()
  // create(@Body() createMTelegramBotDto: CreateMTelegramBotDto) {
  //   return this.mTelegramBotService.create(createMTelegramBotDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.mTelegramBotService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mTelegramBotService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMTelegramBotDto: UpdateMTelegramBotDto) {
  //   return this.mTelegramBotService.update(+id, updateMTelegramBotDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mTelegramBotService.remove(+id);
  // }
}
