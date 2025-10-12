import { useEffect } from 'react';
import useRefreshTokens from '../../../_hooks/useRefreshTokens';
import { client } from '../../../_api/client';
import { useTokenRefresh } from './useTokenRefresh';
import { useRequestQueue } from './useRequestQueue';
import { createRequestInterceptor } from '../interceptors/requestInterceptor';
import { createResponseInterceptor } from '../interceptors/responseInterceptor';
import { useLogoutClient } from '../../../_hooks/useLogout';

/**
 * Axios Request/Response Interceptor Hook
 *
 * JWT 토큰 기반 인증을 위한 HTTP 요청/응답 인터셉터를 설정하는 훅입니다.
 *
 * 주요 기능:
 * - Request Interceptor: 모든 요청에 액세스 토큰을 자동으로 헤더에 추가
 * - Response Interceptor: 401 에러 시 토큰 갱신 및 요청 재시도 처리
 * - 동시성 제어: 여러 요청이 동시에 401을 받아도 토큰 갱신은 한 번만 실행
 * - 큐 시스템: 토큰 갱신 중인 요청들을 큐에 저장 후 갱신 완료 시 일괄 재시도
 *
 * RTR (Refresh Token Rotation) 전략:
 * - 토큰 갱신 시마다 새로운 리프레시 토큰 발급
 * - 재사용 공격 방지를 위한 토큰 패밀리 무효화
 * - 서버에서 row-level lock으로 동시성 문제 해결
 *
 * 리팩토링 구조:
 * - 관심사 분리를 통해 각 로직을 독립적인 모듈로 분리
 * - useTokenRefresh: 토큰 갱신 로직
 * - useRequestQueue: 요청 큐 관리
 * - createRequestInterceptor: 요청 인터셉터 설정
 * - createResponseInterceptor: 응답 인터셉터 설정
 */
export const useInterceptor = () => {
  // 리프레시 토큰 재발급 API 호출
  const { mutateAsync: refreshTokensAsync } = useRefreshTokens();
  // 로그아웃 클라이언트
  const { logoutClient } = useLogoutClient();

  // 요청 큐 관리 (401 에러로 실패한 요청들을 저장 및 재시도)
  const { addFailedRequest, processQueue } = useRequestQueue();

  // 토큰 갱신 로직 (동시성 제어 포함)
  const { reIssueTokens } = useTokenRefresh({
    refreshTokensAsync,
    processQueue, // 성공 시 큐의 모든 요청 재시도, 실패 시 큐의 모든 요청에 에러 전파
  });

  useEffect(() => {
    // Request Interceptor 설정
    // 매 요청 시 액세스 토큰이 존재할 경우, 액세스 토큰을 Authorization 헤더에 추가
    const requestInterceptor = createRequestInterceptor();
    const requestInterceptorId = client.interceptors.request.use(
      requestInterceptor.onFulfilled,
      requestInterceptor.onRejected
    );

    // Response Interceptor 설정
    // 401 에러 시 토큰 갱신 및 요청 재시도 처리
    const responseInterceptor = createResponseInterceptor({
      reIssueTokens,
      addFailedRequest,
      logoutClient,
    });
    const responseInterceptorId = client.interceptors.response.use(
      responseInterceptor.onFulfilled,
      responseInterceptor.onRejected
    );

    // Cleanup: 컴포넌트 언마운트 시 인터셉터 제거 (메모리 누수 방지)
    return () => {
      client.interceptors.request.eject(requestInterceptorId);
      client.interceptors.response.eject(responseInterceptorId);
    };
  }, [refreshTokensAsync, addFailedRequest, processQueue, reIssueTokens, logoutClient]);
};
