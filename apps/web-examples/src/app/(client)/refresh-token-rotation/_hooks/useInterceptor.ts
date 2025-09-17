import { useEffect, useRef, useCallback } from 'react';
import { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import { isBaseError } from '@/_api/dtos/base.dto';
import { appEnv } from '@/_schemas/env.schema';
import useRefreshTokens from './useRefreshTokens';
import useLogout from './useLogout';
import { client } from '../_api/client';
import authStorage from '../_storages/authStorage';
import type { RefreshTokensResponseDto } from '../_api/dtos/refreshTokens.dto';

const isDevelopment = appEnv.NODE_ENV === 'development';

interface FailedRequest {
  resolve: (value: AxiosResponse) => void;
  reject: (error: AxiosError) => void;
  config: AxiosRequestConfig;
}

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
 */
export const useInterceptor = () => {
  // 토큰 갱신 동시성 제어를 위한 ref들
  const refreshPromiseRef = useRef<Promise<RefreshTokensResponseDto> | null>(null);
  const failedRequestsQueueRef = useRef<FailedRequest[]>([]);

  // 리프레시 토큰 재발급
  const { mutateAsync: refreshTokensAsync } = useRefreshTokens();
  // 로그아웃
  const { mutate: logout } = useLogout();

  // 실패한 요청을 큐에 추가
  const addFailedRequest = useCallback((config: AxiosRequestConfig): Promise<AxiosResponse> => {
    return new Promise((resolve, reject) => {
      failedRequestsQueueRef.current.push({ resolve, reject, config });
    });
  }, []);

  // 토큰 갱신 완료 후 큐의 모든 요청 재시도
  const processQueue = useCallback((error?: AxiosError) => {
    failedRequestsQueueRef.current.forEach(({ resolve, reject, config }) => {
      if (error) {
        reject(error);
      } else {
        // request interceptor가 자동으로 최신 토큰을 헤더에 설정하므로 수동 설정 불필요
        client(config).then(resolve).catch(reject);
      }
    });

    failedRequestsQueueRef.current.length = 0; // 큐 초기화
  }, []);

  // 토큰 갱신 시작 (동시성 제어 포함)
  const refreshTokenWithConcurrencyControl = useCallback(
    async (refreshToken: string) => {
      // 이미 갱신 중이면 실행하지 않음
      if (refreshPromiseRef.current) {
        return;
      }

      // 새로운 갱신 요청 시작
      refreshPromiseRef.current = refreshTokensAsync(refreshToken);

      try {
        const result = await refreshPromiseRef.current;

        // 스토리지에 새 토큰 저장
        authStorage.setAccessToken(result.accessToken);
        authStorage.setRefreshToken(result.refreshToken);

        // 대기 중인 모든 요청 재시도
        processQueue();
      } catch (refreshError) {
        if (isAxiosError(refreshError)) {
          // 토큰 갱신 실패 시 대기 중인 모든 요청에 에러 전파
          processQueue(refreshError);
        }
      } finally {
        // 완료되면 Promise 초기화
        refreshPromiseRef.current = null;
      }
    },
    [refreshTokensAsync, processQueue]
  );

  useEffect(() => {
    // 매 요청 시 액세스 토큰이 존재할 경우, 액세스 토큰을 Authorization 헤더에 추가
    client.interceptors.request.use(
      (config) => {
        try {
          const accessToken = authStorage.getAccessToken();
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
          return config;
        } catch (error) {
          console.error('Request Interceptor Error:', error);
          return Promise.reject(error);
        }
      },
      (error) => {
        console.error('Request Interceptor Error:', error);
        return Promise.reject(error);
      }
    );

    client.interceptors.response.use(
      (res) => res,
      async (error: AxiosError) => {
        if (!error.config || !isBaseError(error) || !error.response) {
          return Promise.reject(error);
        }

        if (isDevelopment) {
          /**
           * 개발 환경에서만 에러 로그를 출력합니다.
           * 예시) ERROR[GET] /users/me
           */
          console.error(`ERROR[${error.config.method?.toUpperCase()}] ${error.config.url}`);
        }

        // 재인증 요청에서 에러가 발생했을 경우에는 로그아웃 처리
        // 토큰 만료 -> 에러 -> 리프레시 토큰을 이용하여 엑세스 토큰 재발급
        // -> 에러(리프레시 토큰 만료 또는 잘못된 리프레시 토큰으로 간주) -> 로그아웃 처리
        const isReIssueRequest = error.config.url === '/auth/refresh';
        if (isReIssueRequest) {
          /******************* 로그아웃 처리 *******************/
          // 이곳에 로그아웃 처리 로직이 들어갑니다.
          const refreshToken = authStorage.getRefreshToken();
          if (refreshToken) {
            logout(refreshToken);
          }
          /******************* 로그아웃 처리 *******************/
          return Promise.reject(error);
        }

        const isExpiredAccessToken = error.response.status === 401;
        // 액세스 토큰 만료가 아니면 별도의 처리를 하지 않고 에러를 반환
        if (isExpiredAccessToken === false) {
          return Promise.reject(error);
        }

        const refreshToken = authStorage.getRefreshToken();
        // 리프레시 토큰이 존재하지 않는 경우, 에러를 반환
        if (!refreshToken) {
          return Promise.reject(error);
        }

        // 모든 액세스 토큰 만료로 실패한 요청을 큐에 추가
        const queuedPromise = addFailedRequest(error.config);

        // 토큰 갱신 시작 (함수 내부에서 중복 실행 방지)
        refreshTokenWithConcurrencyControl(refreshToken);

        return queuedPromise;
      }
    );
  }, [
    logout,
    refreshTokensAsync,
    addFailedRequest,
    refreshTokenWithConcurrencyControl,
    processQueue,
  ]);
};
