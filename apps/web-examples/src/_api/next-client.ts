import { appEnv } from '@/_schemas/env.schema';
import axios from 'axios';
import queryString from 'query-string';

export const nextClient = axios.create({
  baseURL: `${appEnv.NEXT_PUBLIC_API_URL}/api`,
  paramsSerializer: (params) => {
    return queryString.stringify(params);
  },
  /**
   * Axios는 다양한 환경에서 동작해야 하기 때문에, 실제 HTTP 요청을 처리하는 부분을 어댑터 패턴으로 추상화했습니다.
   * 어댑터는 Axios의 요청/응답 인터페이스를 특정 환경의 HTTP 클라이언트로 변환하는 역할을 합니다.
   *
   * 1. 'http' - Node.js의 http/https 모듈 사용
   * 2. 'xhr' - 브라우저의 XMLHttpRequest 사용
   * 3. 'fetch' - 브라우저/Node.js의 fetch API 사용
   *
   * MSW(Mock Service Worker)는 네트워크 레벨에서 요청을 가로채는데, 각 어댑터와의 호환성이 다릅니다:
   * adapter: 'http' // Node.js 환경에서 MSW와 잘 동작
   */
  ...(process.env.VITEST && { adapter: 'http' }),
});

// export const clientForMsw = axios.create({
//   baseURL: '/api',
//   paramsSerializer: (params) => {
//     return queryString.stringify(params);
//   },
// });
