import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

@Catch(UnauthorizedException, ForbiddenException)
export class UnauthorizedFilter implements ExceptionFilter {
  catch(
    exception: UnauthorizedException | ForbiddenException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(HttpStatus.UNAUTHORIZED).json({
      message: exception.message,
    });
  }
}
