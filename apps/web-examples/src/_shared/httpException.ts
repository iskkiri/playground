import { NextResponse } from 'next/server';

export class HttpException extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  static isHttpException(error: unknown): error is HttpException {
    return error instanceof HttpException;
  }

  static handler(err: unknown) {
    if (HttpException.isHttpException(err)) {
      const { status, message } = err;
      return NextResponse.json({ status, message }, { status });
    }

    return NextResponse.json(
      { status: 500, message: err instanceof Error ? err.message : 'Internal Server Error' },
      { status: 500 }
    );
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
