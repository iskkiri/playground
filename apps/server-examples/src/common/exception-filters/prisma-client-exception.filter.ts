import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('Prisma Exception');

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    this.logger.error(exception);

    const response = host.switchToHttp().getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    let statusCode: number;
    let error: string;

    switch (exception.code) {
      case 'P2000': {
        // The provided value for the column is too long for the column’s type. Column: {column_name}”
        statusCode = HttpStatus.BAD_REQUEST;
        error = 'Bad Request';
        break;
      }
      case 'P2002': {
        // Unique constraint failed on the {constraint}
        statusCode = HttpStatus.CONFLICT;
        error = 'Conflict';
        break;
      }
      case 'P2025': {
        // An operation failed because it depends on one or more records that were required but not found. {cause}
        statusCode = HttpStatus.NOT_FOUND;
        error = 'Not Found';
        break;
      }
      default:
        statusCode = 500;
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
