import type { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { isBaseError } from '@/_api/dtos/base.dto';
import { appEnv } from '@/_schemas/env.schema';
import authStorage from '../../../_storages/authStorage';
import { REFRESH_TOKEN_URL } from '../constants/constants';

const isDevelopment = appEnv.NODE_ENV === 'development';

interface ResponseInterceptorDeps {
  /** 토큰 갱신 함수 */
  reIssueTokens: (refreshToken: string) => void;
  /** 실패한 요청을 큐에 추가하는 함수 */
  addFailedRequest: (config: AxiosRequestConfig) => Promise<AxiosResponse>;
  /** 로그아웃 함수 */
  logoutClient: () => void;
}

/**
 * Axios Response Interceptor
 *
 * 401 에러 시 토큰 갱신 및 요청 재시도 처리
 *
 * 처리 흐름:
 * 1. 401 에러 발생 시 요청을 큐에 추가
 * 2. 토큰 갱신 시작 (중복 실행 방지는 useTokenRefresh에서 처리)
 * 3. 갱신 완료 시 큐의 모든 요청 재시도
 *
 * 특별 처리:
 * - 토큰 재발급 API 자체가 실패하면 로그아웃 처리
 * - 개발 환경에서는 에러 로그 출력
 */
export const createResponseInterceptor = ({
  reIssueTokens,
  addFailedRequest,
  logoutClient,
}: ResponseInterceptorDeps) => {
  return {
    onFulfilled: (res: AxiosResponse) => res,
    onRejected: async (error: AxiosError) => {
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
      // -> 에러(리프레시 토큰 만료 또는 잘못된 리프레시 토큰으로 간주) -> 클라이언트 사이드에서 로그아웃 처리 (유효하지 않은 리프레시 토큰이므로 서버 사이드에서 로그아웃 처리할 필요가 없음)
      const isReIssueRequest = error.config.url === REFRESH_TOKEN_URL;
      if (isReIssueRequest) {
        /******************* 로그아웃 처리 *******************/
        // 이곳에 로그아웃 처리 로직이 들어갑니다.
        const refreshToken = authStorage.getRefreshToken();
        if (refreshToken) {
          logoutClient();
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
      reIssueTokens(refreshToken);

      return queuedPromise;
    },
  };
};
