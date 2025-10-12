import type { InternalAxiosRequestConfig, AxiosError } from 'axios';
import authStorage from '../../../_storages/authStorage';

/**
 * Axios Request Interceptor
 *
 * 매 요청 시 액세스 토큰이 존재할 경우, 액세스 토큰을 Authorization 헤더에 추가
 */
export const createRequestInterceptor = () => {
  return {
    onFulfilled: (config: InternalAxiosRequestConfig) => {
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
    onRejected: (error: AxiosError) => {
      console.error('Request Interceptor Error:', error);
      return Promise.reject(error);
    },
  };
};
