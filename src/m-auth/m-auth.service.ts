import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma-service';
import { ParamMAuthDto } from './dto/param-m-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { DataUserJwtDto } from './dto/data-user-jwt.dto';
import { DataTokenDto } from './dto/data-token.dto';
import * as bcrypt from 'bcryptjs';
import { DataMUserDto } from '../m-user/dto/data-m-user.dto';

@Injectable()
export class MAuthService {

  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  private generateToken(user: DataMUserDto, actions: number[]){
    const payload: DataUserJwtDto = {
      id: user.id,
      login: user.login,
      name1: user.name1,
      name2: user.name2,
      user_role: user.user_role,
      actions: actions,
    };

    return { token: this.jwtService.sign(payload) };

  }

  async login(paramMAuthDto: ParamMAuthDto): Promise<DataTokenDto>{

    const user = await this.prismaService.dbm_user.findFirst({
      where: {
        login: paramMAuthDto.login
      },
      include: {
        set_user_role: { select: { name: true } },
        set_user_status: { select: { name: true } },
      }
    })

    if (!user) throw new NotFoundException(['User not found!'])
    if (user.status_id !== 1) throw new ForbiddenException(['User blocked!'])

    const passwordEquals = await bcrypt.compare(paramMAuthDto.password, user.password);
    if (!passwordEquals) throw new BadRequestException(['Password wrong!'])

    const roleAction = await this.prismaService.dba_user_roles.findMany({
      where: {
        user_role: user.user_role
      },
      select:{
        action_id: true
      }
    })

    const roleActionArr = []
    roleAction.forEach(el => {
      roleActionArr.push(el.action_id);
    })

    return this.generateToken(user, roleActionArr);

  }

  async update(request: Request): Promise<DataTokenDto>{

    try {
      const authHeader = request.headers['authorization'];
      const bearerToken = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearerToken !== 'Bearer' || !token) {
        throw new UnauthorizedException({message: 'Unauthorized'});
      }

      const payload = this.jwtService.decode(token);
      delete payload.iat;
      delete payload.exp;

      return { token: this.jwtService.sign(payload) };

    } catch (e){
      throw new UnauthorizedException({message: 'Unauthorized'});
    }

  }
}
