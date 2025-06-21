import { useEffect, useMemo } from 'react';
import { AxiosError } from 'axios';
import { client } from '../_api/client';
import authStorage from '../_storages/authStorage';
import { appEnv } from '@/schemas/env.schema';
import { isBaseError } from '@/common/base.dto';

export const useInterceptor = () => {
  const isDevelopment = useMemo(() => appEnv.NODE_ENV === 'development', []);

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
        const isReIssueRequest = error.config.url === 'REISSUE_ACCESS_TOKEN_URL';
        if (isReIssueRequest) {
          /******************* 로그아웃 처리 *******************/
          // 이곳에 로그아웃 처리 로직이 들어갑니다.
          /******************* 로그아웃 처리 *******************/
          return Promise.reject(error);
        }

        const isExpiredAccessToken = error.response.data.errorCode === 'A-001';
        // 액세스 토큰 만료가 아니면 별도의 처리를 하지 않고 에러를 반환
        if (isExpiredAccessToken === false) {
          return Promise.reject(error);
        }

        const refreshToken = authStorage.getRefreshToken();
        if (!refreshToken) {
          return Promise.reject(error);
        }

        /****************** 리프레시 토큰을 이용하여 액세스 토큰 재발급 ******************/
        // 이곳에 액세스 토큰 재발급 로직이 들어갑니다.
        // 1. 액세스 토큰 재발급
        // 2. 스토리지에 액세스 토큰 저장
        /****************** 리프레시 토큰을 이용하여 액세스 토큰 재발급 ******************/

        const response = await client(error.config);
        return response;
      }
    );
  }, [isDevelopment]);
};
