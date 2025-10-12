/**
 * Interceptor 관련 상수 정의
 */

/**
 * 토큰 재발급 API 엔드포인트
 * 이 URL로 오는 에러는 리프레시 토큰 자체가 만료된 것으로 간주하여 로그아웃 처리
 */
export const REFRESH_TOKEN_URL = '/auth/refresh';
