import axios from 'axios';
import queryString from 'query-string';

export const client = axios.create({
  baseURL: `http://localhost:8080`,
  paramsSerializer: (params) => {
    /**
     * Axios에서 HTTP 요청의 쿼리 문자열을 구성할 때, 객체 형태의 params를 URL에 사용할 수 있는 쿼리 문자열 형식으로 변환하는 역할
     * 특히, 배열 형태의 값을 가지는 쿼리 문자열을 구성할 때 유용합니다.
     * const params = {
     *   userId: 123,
     *   filter: ['active', 'new'],
     * };
     * queryString.stringify(params);
     * => "userId=123&filter=active&filter=new"
     *
     * 참고로 Axios의 기본 직렬화 방식에서는 배열이 다음과 같이 변환됩니다.
     * /api/v1/users?filter[]=active&filter[]=new
     */
    return queryString.stringify(params);
  },
});
