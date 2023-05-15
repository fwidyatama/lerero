import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UNAUTHORIZED_ACCESS } from 'src/constant/response.constant';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<string>('role', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { profile } = request.user;
    const isValidRole = this.matchRoles(role, profile);

    if (isValidRole) {
      return true;
    } else {
      response.status(HttpStatus.UNAUTHORIZED).json({
        message: UNAUTHORIZED_ACCESS,
      });
    }
  }

  matchRoles(role: string, userRole: string) {
    return role === userRole ? true : false;
  }
}
