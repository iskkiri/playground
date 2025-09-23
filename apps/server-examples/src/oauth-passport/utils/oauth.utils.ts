import { BadRequestException, ForbiddenException } from '@nestjs/common';

/**
 *
 * @param state - 인코딩된 Origin 헤더
 * @returns 정규화된 Origin 헤더
 */
export function decodeAndNormalizeOrigin(state: string): string {
  const origin = Buffer.from(state, 'base64').toString('utf-8');
  return origin.endsWith('/') ? origin.slice(0, -1) : origin;
}

/**
 * Origin 헤더를 검증하고 적절한 프론트엔드 URL을 반환하는 유틸리티 함수
 */
export function validateAndGetFrontendUrl(
  origin: string | undefined,
  allowedOrigins: string[]
): string {
  if (!origin) {
    throw new BadRequestException('Origin 헤더가 누락되었습니다.');
  }

  if (!allowedOrigins.includes(origin)) {
    throw new ForbiddenException(`허용되지 않은 Origin입니다: ${origin}`);
  }

  return origin;
}
