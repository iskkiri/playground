import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Response } from 'express';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('Prisma Exception');

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    this.logger.error(exception);

    const response = host.switchToHttp().getResponse<Response>();

    let statusCode: number;
    let message: string;
    let error: string;

    switch (exception.code) {
      case 'P2000': {
        // The provided value for the column is too long for the column’s type. Column: {column_name}”
        statusCode = HttpStatus.BAD_REQUEST;
        message = '잘못된 요청입니다.';
        error = 'Bad Request';
        break;
      }
      case 'P2002': {
        // Unique constraint failed on the {constraint}
        statusCode = HttpStatus.CONFLICT;
        message = '이미 존재하는 데이터입니다.';
        error = 'Conflict';
        break;
      }
      case 'P2025': {
        // An operation failed because it depends on one or more records that were required but not found. {cause}
        statusCode = HttpStatus.NOT_FOUND;
        message = '요청하신 데이터를 찾을 수 없습니다.';
        error = 'Not Found';
        break;
      }
      default:
        statusCode = 500;
        message = '서버 문제로 요청에 실패하였습니다. 잠시 후에 시도해 주세요.';
        error = 'Internal Server Error';
        break;
    }

    if (statusCode && error) {
      response.status(statusCode).json({ statusCode, message, error });
    } else {
      super.catch(exception, host);
    }
  }
}
