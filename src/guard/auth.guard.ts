import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UNAUTHORIZED_ACCESS } from 'src/constant/response.constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const token = this.extractTokenFromHeader(request)?.toString();
    if (!token) {
      response.status(HttpStatus.UNAUTHORIZED).json({
        message: UNAUTHORIZED_ACCESS,
      });
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException(UNAUTHORIZED_ACCESS);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const token = request.query?.token;
    return token !== '' ? token : undefined;
  }
}
