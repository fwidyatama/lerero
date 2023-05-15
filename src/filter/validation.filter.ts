import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Response } from 'express';
import { PROCESS_DATA_FAILED } from 'src/constant/response.constant';
import { HttpStatus } from '@nestjs/common';

@Catch(BadRequestException, MongoError)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: BadRequestException | MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      message: PROCESS_DATA_FAILED,
    });
  }
}
