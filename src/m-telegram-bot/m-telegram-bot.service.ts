import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma-service';
import { CreateMTelegramBotScoreDto } from './dto/create-m-telegram-bot-score.dto';
import { DataMTelegramBotAvgDto } from './dto/data-m-telegram-bot-avg.dto';
import { DataMTelegramBotScoreDto } from './dto/data-m-telegram-bot-score.dto';
import { DataMTelegramStaffDto } from './dto/data-m-telegram-staff.dto';
import { DataMTelegramBotPositionCheckList } from './dto/data-m-telegram-position-check-list.dto';
import { DataMTelegramBotPositionList } from './dto/data-m-telegram-position-list.dto';
import { DataMTelegramBotSanaDto } from './dto/data-m-telegram-bot-sana.dto';
import { DataMTelegramBotSanaIdDto } from './dto/data-m-telegram-bot-sana-id.dto';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { CreateMTelegramBotBillDto } from './dto/create-m-telegram-bot-bill.dto';
import { DataMTelegramBotBillDto } from './dto/data-m-telegram-bot-bill.dto';
import { DataMTelegramBotFileDto } from './dto/data-m-telegram-bot-file.dto';
import { UpdateMTelegramBotBillDto } from './dto/update-m-telegram-bot-bill.dto';
import { DataMTelegramBotBase64Dto } from './dto/data-m-telegram-bot-base64.dto';


@Injectable()
export class MTelegramBotService {

  constructor(private prismaService: PrismaService) {
  }

  async registerUser(phone: string): Promise<DataMTelegramStaffDto> {

    const user = await this.prismaService.dbm_bot_user.findFirst({
      include: {
        list_bot_user_position: { select: { name: true } },
        list_bot_user_roles: { select: { name: true } },
        set_user_status: { select: { name: true } },
      },
      where: { phone },
    });

    if (!user) throw new NotFoundException(['User not found!']);
    if (user.status_id !== 1) throw new ForbiddenException(['User blocked!']);

    return user;
  }

  async getPositionList(): Promise<DataMTelegramBotPositionList[]> {
    return this.prismaService.list_bot_user_position.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        show: 1,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getPositionChecklist(id: number): Promise<DataMTelegramBotPositionCheckList[]> {
    return this.prismaService.list_bot_check_list.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        user_position_id: id,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getStaffList(): Promise<DataMTelegramStaffDto[]> {
    return this.prismaService.dbm_bot_user.findMany({
      include: {
        list_bot_user_position: { select: { name: true } },
        list_bot_user_roles: { select: { name: true } },
        set_user_status: { select: { name: true } },
      },
      where: {
        status_id: 1,
      },
    });
  }

  async setScore(scoreData: CreateMTelegramBotScoreDto): Promise<DataMTelegramBotScoreDto> {
    return this.prismaService.dbm_bot_score.create({
      data: scoreData,
      include: {
        dbm_bot_user: { select: { id: true, name1: true, name2: true } },
        list_bot_check_list: { select: { name: true } },
        list_bot_user_position: { select: { name: true } },
      },
    });
  }

  async getScoreList(dataMTelegramBotSanaDto: DataMTelegramBotSanaDto): Promise<DataMTelegramBotAvgDto[]> {

    const sana = dataMTelegramBotSanaDto.sana.split('.');
    const firstDay = new Date(Number(sana[2]), Number(sana[1]) - 1, Number(sana[0]));
    const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0);

    const total = await this.prismaService.dbm_bot_score.groupBy({
      by: ['user_id'],
      where: {
        created_at: {
          gte: firstDay,
          lte: lastDay,
        },
      },
      _avg: {
        score: true,
      },
      _count: {
        score: true,
      },
      _sum: {
        score: true,
      },
    });

    const user = await this.prismaService.dbm_bot_user.findMany();
    const position = await this.prismaService.list_bot_user_position.findMany();

    const res = [];
    total.forEach(el => {
      const user_data = user.find(f => f.id === el.user_id);
      const position_data = position.find(f => f.id === user_data.user_position_id);
      res.push({
        user_id: el.user_id,
        name: user_data.name1 + ' ' + user_data.name2,
        position: position_data.name,
        avg: Number(el._avg.score),
        sum: Number(el._sum.score),
        count: Number(el._count.score),
      });
    });

    return res;
  }

  async getScore(dataMTelegramBotSanaIdDto: DataMTelegramBotSanaIdDto): Promise<DataMTelegramBotAvgDto> {

    const id = dataMTelegramBotSanaIdDto.user_id;
    const sana = dataMTelegramBotSanaIdDto.sana.split('.');
    const firstDay = new Date(Number(sana[2]), Number(sana[1]) - 1, Number(sana[0]));
    const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0);

    // SUM ITEM
    const total = await this.prismaService.dbm_bot_score.aggregate({
      where: {
        user_id: id,
        created_at: {
          gte: firstDay,
          lte: lastDay,
        },
      },
      _avg: {
        score: true,
      },
      _count: {
        score: true,
      },
      _sum: {
        score: true,
      },
    });

    const user = await this.prismaService.dbm_bot_user.findFirst({
      include: {
        list_bot_user_position: { select: { name: true } },
      },
      where: {
        id: id,
      },
    });

    return {
      user_id: id,
      name: user.name1 + ' ' + user.name2,
      position: user.list_bot_user_position.name,
      avg: Number(total._avg.score),
      count: Number(total._count.score),
      sum: Number(total._sum.score),
    };
  }

  async uploadFile(file: Express.Multer.File): Promise<DataMTelegramBotFileDto> {

    try {

      const fileExt = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExt;
      const filePath = path.resolve(__dirname, '../..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      return { file: fileName };

    } catch (e) {
      throw new InternalServerErrorException(e);
    }

  }

  async setFileData(createMTelegramBotBillDto: CreateMTelegramBotBillDto): Promise<DataMTelegramBotBillDto> {
    const bill = await this.prismaService.dbm_bot_payment_bills.create({
      include: {
        dbm_bot_user: { select: { name1: true, name2: true } },
      },
      data: {
        file: createMTelegramBotBillDto.file,
        user_id: Number(createMTelegramBotBillDto.user_id),
        amount: Number(createMTelegramBotBillDto.amount),
        comment: createMTelegramBotBillDto.comment,
      },
    });

    const user = await this.prismaService.dbm_bot_user.findMany();
    const position = await this.prismaService.list_bot_user_position.findMany();

    const user_data = user.find(f => f.id === bill.user_id);
    const position_data = position.find(f => f.id === user_data.user_position_id);

    return {
      id: bill.id,
      user_id: bill.user_id,
      name: bill.dbm_bot_user.name1 + ' ' + bill.dbm_bot_user.name2,
      position: position_data.name,
      file: bill.file,
      amount: Number(bill.amount),
      comment: bill.comment,
      confirmed: bill.confirmed,
      created_at: bill.created_at,
    };
  }

  async getUnconfirmedBillList(): Promise<DataMTelegramBotBillDto[]> {

    const bills = await this.prismaService.dbm_bot_payment_bills.findMany({
      include: {
        dbm_bot_user: { select: { name1: true, name2: true } },
      },
      where: {
        confirmed: 0,
      },
    });

    const user = await this.prismaService.dbm_bot_user.findMany();
    const position = await this.prismaService.list_bot_user_position.findMany();

    const res = [];
    bills.forEach(el => {
      const user_data = user.find(f => f.id === el.user_id);
      const position_data = position.find(f => f.id === user_data.user_position_id);
      res.push({
        id: el.id,
        user_id: el.user_id,
        name: el.dbm_bot_user.name1 + ' ' + el.dbm_bot_user.name2,
        position: position_data.name,
        file: el.file,
        amount: Number(el.amount),
        comment: el.comment,
        confirmed: el.confirmed,
        created_at: el.created_at,
      });
    });

    return res;

  }

  async getConfirmedBillList(dataMTelegramBotSanaDto: DataMTelegramBotSanaDto): Promise<DataMTelegramBotBillDto[]> {

    const sana = dataMTelegramBotSanaDto.sana.split('.');
    const firstDay = new Date(Number(sana[2]), Number(sana[1]) - 1, Number(sana[0]));
    const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0);

    const bills = await this.prismaService.dbm_bot_payment_bills.findMany({
      include: {
        dbm_bot_user: { select: { name1: true, name2: true } },
      },
      where: {
        confirmed: 1,
        created_at: {
          gte: firstDay,
          lte: lastDay,
        },
      },
    });

    const user = await this.prismaService.dbm_bot_user.findMany();
    const position = await this.prismaService.list_bot_user_position.findMany();

    const res = [];
    bills.forEach(el => {
      const user_data = user.find(f => f.id === el.user_id);
      const position_data = position.find(f => f.id === user_data.user_position_id);
      res.push({
        id: el.id,
        user_id: el.user_id,
        name: el.dbm_bot_user.name1 + ' ' + el.dbm_bot_user.name2,
        position: position_data.name,
        file: el.file,
        amount: Number(el.amount),
        comment: el.comment,
        confirmed: el.confirmed,
        created_at: el.created_at,
      });
    });

    return res;
  }

  async updateBill(id: number, updateMTelegramBotBillDto: UpdateMTelegramBotBillDto):Promise<DataMTelegramBotBillDto> {
    const bill = await this.prismaService.dbm_bot_payment_bills.update({
      data: updateMTelegramBotBillDto,
      include: {
        dbm_bot_user: { select: { name1: true, name2: true } },
      },
      where: {
        id: id
      }
    })

    const user = await this.prismaService.dbm_bot_user.findMany();
    const position = await this.prismaService.list_bot_user_position.findMany();

    const user_data = user.find(f => f.id === bill.user_id);
    const position_data = position.find(f => f.id === user_data.user_position_id);

    return {
      id: bill.id,
      user_id: bill.user_id,
      name: bill.dbm_bot_user.name1 + ' ' + bill.dbm_bot_user.name2,
      position: position_data.name,
      file: bill.file,
      amount: Number(bill.amount),
      comment: bill.comment,
      confirmed: bill.confirmed,
      created_at: bill.created_at,
    };
  }

  async getFile(filename: string): Promise<DataMTelegramBotBase64Dto> {

    const filePath = path.join(__dirname, '../../static', filename);
    const fileExt = filename.split('.').pop();

    try {
      return {file: fs.readFileSync(filePath, { encoding: 'base64' }), ext: fileExt};
    } catch (error) {
      throw new NotFoundException(['File not found!'])
    }

  }

  // create(createMTelegramBotDto: CreateMTelegramBotDto) {
  //   return 'This action adds a new mTelegramBot';
  // }
  //
  // findAll() {
  //   return `This action returns all mTelegramBot`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} mTelegramBot`;
  // }
  //
  // update(id: number, updateMTelegramBotDto: UpdateMTelegramBotDto) {
  //   return `This action updates a #${id} mTelegramBot`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} mTelegramBot`;
  // }


}
