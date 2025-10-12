import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * 토큰 갱신 중 실패한 요청을 큐에 저장하기 위한 타입
 *
 * 401 에러로 실패한 요청들을 큐에 모아두었다가,
 * 토큰 갱신 완료 후 일괄적으로 재시도하기 위해 사용
 */
export interface FailedRequest {
  /** 요청 성공 시 호출될 resolve 함수 */
  resolve: (value: AxiosResponse) => void;
  /** 요청 실패 시 호출될 reject 함수 */
  reject: (error: AxiosError) => void;
  /** 재시도할 요청의 설정 정보 */
  config: AxiosRequestConfig;
}
