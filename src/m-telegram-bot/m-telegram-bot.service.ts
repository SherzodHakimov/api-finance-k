import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
import { CreateMTelegramBotUserDto } from './dto/create-m-telegram-bot-user.dto';
import { UpdateMTelegramBotUserDataDto } from './dto/update-m-telegram-bot-user-data.dto';
import { UpdateMTelegramBotUserStatusDto } from './dto/update-m-telegram-bot-user-status.dto';
import { UpdateMTelegramBotUserPhoneDto } from './dto/update-m-telegram-bot-user-phone.dto';
import { CreateMTelegramBotBonusDtoDto } from './dto/create-m-telegram-bot-bonus.dto';
import { DataMTelegramBotBonusDto } from './dto/data-m-telegrem-bot-bonus.dto';


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
      orderBy: {
        list_bot_user_position: { name: 'asc' },
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
    const q = this.getMonthStartAndEndDates(`${sana[2]}-${sana[1]}-${sana[0]}`);

    const total = await this.prismaService.dbm_bot_score.groupBy({
      by: ['user_id'],
      where: {
        created_at: {
          gte: q.firstDay,
          lte: q.lastDay,
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
        avg: Math.round(Number(el._avg.score) * Math.pow(10, 1)) / Math.pow(10, 1),
        sum: Number(el._sum.score),
        count: Number(el._count.score),
      });
    });

    return res.sort((a, b) => a.name.localeCompare(b.name));
  }

  async getScore(dataMTelegramBotSanaIdDto: DataMTelegramBotSanaIdDto): Promise<DataMTelegramBotAvgDto> {

    const id = dataMTelegramBotSanaIdDto.user_id;
    const sana = dataMTelegramBotSanaIdDto.sana.split('.');
    const q = this.getMonthStartAndEndDates(`${sana[2]}-${sana[1]}-${sana[0]}`);

    // SUM ITEM
    const total = await this.prismaService.dbm_bot_score.aggregate({
      where: {
        user_id: id,
        created_at: {
          gte: q.firstDay,
          lte: q.lastDay,
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
      avg: Math.round(Number(total._avg.score) * Math.pow(10, 1)) / Math.pow(10, 1),
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
      orderBy: {
        created_at: 'desc',
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

    return res.sort((a, b) => b.created_at - a.created_at);
  }

  async getConfirmedBillList(dataMTelegramBotSanaDto: DataMTelegramBotSanaDto): Promise<DataMTelegramBotBillDto[]> {

    const sana = dataMTelegramBotSanaDto.sana.split('.');
    const q = this.getMonthStartAndEndDates(`${sana[2]}-${sana[1]}-${sana[0]}`);

    const bills = await this.prismaService.dbm_bot_payment_bills.findMany({
      include: {
        dbm_bot_user: { select: { name1: true, name2: true } },
      },
      where: {
        confirmed: 1,
        created_at: {
          gte: q.firstDay,
          lte: q.lastDay,
        },
      },
      orderBy: {
        created_at: 'desc',
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

    return res.sort((a, b) => b.created_at - a.created_at);
  }

  async removeBill(id: number): Promise<DataMTelegramBotBillDto> {

    const confirmedBill = await this.prismaService.dbm_bot_payment_bills.findFirst({
      where: {
        id: id,
        confirmed: 1,
      },
    });

    if (confirmedBill) throw new ForbiddenException(['Delete not allowed!']);

    const existBill = await this.prismaService.dbm_bot_payment_bills.findFirst({
      where: {
        id: id,
        confirmed: 0,
      },
    });

    if (!existBill) throw new NotFoundException(['Bill not found!']);


    const bill = await this.prismaService.dbm_bot_payment_bills.delete({
      include: {
        dbm_bot_user: { select: { name1: true, name2: true } },
      },
      where: {
        id: id,
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

  async getUserUnconfirmedBillList(id: number): Promise<DataMTelegramBotBillDto[]> {

    const q = this.getMonthStartAndEndDates();

    const bills = await this.prismaService.dbm_bot_payment_bills.findMany({
      include: {
        dbm_bot_user: { select: { name1: true, name2: true } },
      },
      where: {
        user_id: id,
        confirmed: 0,
        created_at: {
          gte: q.firstDay,
          lte: q.lastDay,
        },
      },
      orderBy: {
        created_at: 'desc',
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

    return res.sort((a, b) => b.created_at - a.created_at);
  }

  async updateBill(id: number, updateMTelegramBotBillDto: UpdateMTelegramBotBillDto): Promise<DataMTelegramBotBillDto> {
    const bill = await this.prismaService.dbm_bot_payment_bills.update({
      data: updateMTelegramBotBillDto,
      include: {
        dbm_bot_user: { select: { name1: true, name2: true } },
      },
      where: {
        id: id,
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

  async getFile(filename: string): Promise<DataMTelegramBotBase64Dto> {

    const filePath = path.join(__dirname, '../../static', filename);
    const fileExt = filename.split('.').pop();

    try {
      return { file: fs.readFileSync(filePath, { encoding: 'base64' }), ext: fileExt };
    } catch (error) {
      throw new NotFoundException(['File not found!']);
    }

  }

  async getUsers(): Promise<DataMTelegramStaffDto[]> {
    return this.prismaService.dbm_bot_user.findMany({
      include: {
        list_bot_user_position: { select: { name: true } },
        list_bot_user_roles: { select: { name: true } },
        set_user_status: { select: { name: true } },
      },
      where: {
        OR: [{ status_id: 1 }, { status_id: 2 }],
      },
      orderBy: [
        { set_user_status: { name: 'asc' } },
        { list_bot_user_position: { name: 'asc' } },
      ],
    });
  }

  async setUser(createMTelegramBotUserDto: CreateMTelegramBotUserDto): Promise<DataMTelegramStaffDto> {

    const user = await this.prismaService.dbm_bot_user.findFirst({
      where: {
        phone: createMTelegramBotUserDto.phone,
      },
    });

    if (user) throw new ConflictException(['User phone exist!']);

    createMTelegramBotUserDto.status_id = 1;

    return this.prismaService.dbm_bot_user.create({
      include: {
        list_bot_user_position: { select: { name: true } },
        list_bot_user_roles: { select: { name: true } },
        set_user_status: { select: { name: true } },
      },
      data: createMTelegramBotUserDto,
    });
  }

  async updateUserData(id: number, updateMTelegramBotUserDataDto: UpdateMTelegramBotUserDataDto): Promise<DataMTelegramStaffDto> {
    return this.prismaService.dbm_bot_user.update({
      include: {
        list_bot_user_position: { select: { name: true } },
        list_bot_user_roles: { select: { name: true } },
        set_user_status: { select: { name: true } },
      },
      data: updateMTelegramBotUserDataDto,
      where: {
        id: id,
      },
    });
  }

  async updateUserStatus(id: number, updateMTelegramBotUserStatusDto: UpdateMTelegramBotUserStatusDto): Promise<DataMTelegramStaffDto> {
    return this.prismaService.dbm_bot_user.update({
      include: {
        list_bot_user_position: { select: { name: true } },
        list_bot_user_roles: { select: { name: true } },
        set_user_status: { select: { name: true } },
      },
      data: updateMTelegramBotUserStatusDto,
      where: {
        id: id,
      },
    });
  }

  async updateUserPhone(id: number, updateMTelegramBotUserPhoneDto: UpdateMTelegramBotUserPhoneDto): Promise<DataMTelegramStaffDto> {

    const user = await this.prismaService.dbm_bot_user.findFirst({
      where: {
        phone: updateMTelegramBotUserPhoneDto.phone,
      },
    });

    if (user) throw new ConflictException(['User phone exist!']);

    return this.prismaService.dbm_bot_user.update({
      include: {
        list_bot_user_position: { select: { name: true } },
        list_bot_user_roles: { select: { name: true } },
        set_user_status: { select: { name: true } },
      },
      data: updateMTelegramBotUserPhoneDto,
      where: {
        id: id,
      },
    });
  }

  async removeUser(id: number): Promise<DataMTelegramStaffDto> {

    const bill = await this.prismaService.dbm_bot_payment_bills.findFirst({
      where: {
        user_id: id,
      },
    });

    if (bill) throw new ForbiddenException(['Delete not allowed!']);

    const score = await this.prismaService.dbm_bot_score.findFirst({
      where: {
        user_id: id,
      },
    });

    if (score) throw new ForbiddenException(['Delete not allowed!']);

    return this.prismaService.dbm_bot_user.delete({
      include: {
        list_bot_user_position: { select: { name: true } },
        list_bot_user_roles: { select: { name: true } },
        set_user_status: { select: { name: true } },
      },
      where: {
        id: id,
      },
    });
  }

  async setBonus(createMTelegramBotBonusDtoDto: CreateMTelegramBotBonusDtoDto): Promise<DataMTelegramBotBonusDto> {

    const q = this.getQuarterStartAndEndDates();

    const bonus = await this.prismaService.dbm_bot_bonus.findFirst({
      where: {
        created_at: {
          gte: q.firstDay,
          lte: q.lastDay,
        },
        user_id: createMTelegramBotBonusDtoDto.user_id,
      },
    });

    if (bonus) throw new ForbiddenException(['Bonus exist!']);

    return this.prismaService.dbm_bot_bonus.create({
      data: createMTelegramBotBonusDtoDto,
      include: {
        dbm_bot_user: { select: { id: true, name1: true, name2: true } },
      },
    });
  }

  async getBonus(id: number): Promise<DataMTelegramBotBonusDto> {

    const q = this.getQuarterStartAndEndDates();

    const bonus = await this.prismaService.dbm_bot_bonus.findFirst({
      include: {
        dbm_bot_user: { select: { id: true, name1: true, name2: true } },
      },
      where: {
        created_at: {
          gte: q.firstDay,
          lte: q.lastDay,
        },
        user_id: id,
      },
    });

    if (!bonus) throw new NotFoundException(['Bonus not found!']);

    return bonus;
  }

  async getBonusList(dataMTelegramBotSanaDto: DataMTelegramBotSanaDto): Promise<DataMTelegramBotBonusDto[]> {

    const sana = dataMTelegramBotSanaDto.sana.split('.');
    const q = this.getQuarterStartAndEndDates(`${sana[2]}-${sana[1]}-${sana[0]}`);

    return this.prismaService.dbm_bot_bonus.findMany({
      include: {
        dbm_bot_user: { select: { id: true, name1: true, name2: true } },
      },
      where: {
        created_at: {
          gte: q.firstDay,
          lte: q.lastDay,
        },
      },
    });

  }

  getQuarterStartAndEndDates(sDate?: string | null) {
    const today = sDate ? new Date(sDate) : new Date();
    const currentMonth = today.getMonth() + 1; // getMonth() is zero-based
    let startMonth, endMonth;

    if (currentMonth >= 1 && currentMonth <= 3) {
      startMonth = 0; // January
      endMonth = 2; // March
    } else if (currentMonth >= 4 && currentMonth <= 6) {
      startMonth = 3; // April
      endMonth = 5; // June
    } else if (currentMonth >= 7 && currentMonth <= 9) {
      startMonth = 6; // July
      endMonth = 8; // September
    } else {
      startMonth = 9; // October
      endMonth = 11; // December
    }

    const startDate = new Date(today.getFullYear(), startMonth, 1);
    const endDate = new Date(today.getFullYear(), endMonth + 1, 0); // 0th day of the next month gives the last day of the current month

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    return {
      firstDay: new Date(formatDate(startDate)),
      lastDay: new Date(new Date(formatDate(endDate)).getTime() + 86400000 - 1),
    };
  }

  getMonthStartAndEndDates(sDate?: string | null) {

    const today = sDate ? new Date(sDate) : new Date();

    const getMonth = today.getMonth();

    const startDate = new Date(today.getFullYear(), getMonth, 1);
    const endDate = new Date(today.getFullYear(), getMonth + 1, 0);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    return {
      firstDay: new Date(formatDate(startDate)),
      lastDay: new Date(new Date(formatDate(endDate)).getTime() + 86400000 - 1),
    };
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
