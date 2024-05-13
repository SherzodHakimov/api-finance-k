import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma-service';
import { ParamMAuthDto } from './dto/param-m-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { DataUserJwtDto } from './dto/data-user-jwt.dto';
import { DataTokenDto } from './dto/data-token.dto';

@Injectable()
export class MAuthService {

  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  private generateToken(user: any){
    const payload: DataUserJwtDto = {
      id: user.id,
      login: user.login,
      name1: user.name1,
      name2: user.name2,
      user_role: user.user_role
    };

    return { token: this.jwtService.sign(payload) };

  }

  async login(paramMAuthDto: ParamMAuthDto): Promise<DataTokenDto>{

    const password = paramMAuthDto.password;

    const user = await this.prismaService.dbm_user.findFirst({
      where: {
        login: paramMAuthDto.login
      }
    })

    if (!user) throw new NotFoundException(['User not found!'])
    if (user.status_id !== 1) throw new ForbiddenException(['User blocked!'])
    if (user.password !== password) throw new BadRequestException(['Password wrong!'])

    return this.generateToken(user)

  }
}
