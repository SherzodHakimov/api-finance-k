import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers.authorization;
      const bearerToken = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearerToken !== 'Bearer' || !token) {
         throw new UnauthorizedException({message: 'Unauthorized'});
      }

      request.user = this.jwtService.verify(token);
      return true;

    } catch (e){
      throw new UnauthorizedException({message: 'Unauthorized'});
    }
  }
}