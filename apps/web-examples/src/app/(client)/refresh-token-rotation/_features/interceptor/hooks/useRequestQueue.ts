import { useRef, useCallback } from 'react';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { FailedRequest } from '../types/interceptor.types';
import { client } from '../../../_api/client';

/**
 * 토큰 갱신 중 실패한 요청들을 관리하는 큐 훅
 *
 * 주요 기능:
 * - 실패한 요청을 큐에 추가
 * - 토큰 갱신 완료 후 큐의 모든 요청 일괄 재시도
 * - 토큰 갱신 실패 시 큐의 모든 요청에 에러 전파
 *
 * 동작 방식:
 * 1. 401 에러 발생 시 요청을 큐에 추가
 * 2. 토큰 갱신 완료를 기다림 (Promise)
 * 3. 갱신 완료 시 큐의 모든 요청을 새 토큰으로 재시도
 */
export const useRequestQueue = () => {
  // 실패한 요청을 저장하는 큐
  const failedRequestsQueueRef = useRef<FailedRequest[]>([]);

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

  return {
    addFailedRequest,
    processQueue,
  };
};
