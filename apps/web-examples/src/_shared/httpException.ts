import type { ErrorServerActionResponseDto } from '@/_dtos/server-action.dto';
import { NextResponse } from 'next/server';

export class HttpException extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  static isHttpException(error: unknown): error is HttpException {
    return error instanceof HttpException;
  }

  static apiHandler(err: unknown) {
    if (HttpException.isHttpException(err)) {
      const { statusCode, message } = err;
      return NextResponse.json({ statusCode, message }, { status: statusCode });
    }

    return NextResponse.json(
      { statusCode: 500, message: err instanceof Error ? err.message : 'Internal Server Error' },
      { status: 500 }
    );
  }

  static serverActionHandler(err: unknown): ErrorServerActionResponseDto {
    if (HttpException.isHttpException(err)) {
      return {
        success: false,
        statusCode: err.statusCode,
        message: err.message,
      };
    }

    return {
      success: false,
      statusCode: 500,
      message: err instanceof Error ? err.message : 'Internal Server Error',
    };
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(message, 401);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string) {
    super(message, 403);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, 404);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string) {
    super(message, 409);
  }
}

export class InternalServerException extends HttpException {
  constructor(message: string) {
    super(message, 500);
  }
}
