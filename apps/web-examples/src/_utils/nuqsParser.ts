import dayjs from 'dayjs';
import { createParser } from 'nuqs';

/**
 * nuqs의 parseAsIsoDate를 사용하지 않는 이유
 * @docs https://nuqs.47ng.com/docs/parsers/built-in#iso-8601-date
 *
 * custom parser
 * @docs https://nuqs.47ng.com/docs/parsers/making-your-own
 *
 * The Date is parsed without the time zone offset, making it at 00:00:00 UTC.
 * 한국시간(KST)를 UTC 기준으로 변환하여 설정한 값이 일치하지 않는 경우가 발생함
 * 예시] Sat Jan 04 2025 00:00:00 GMT+0900 (한국 표준시)
 * -> 2025-01-04 00:00:00 KST → 2025-01-03 15:00:00 UTC
 */
export const parseAsDate = createParser({
  parse(queryValue) {
    return new Date(queryValue);
  },
  serialize(date) {
    return dayjs(date).format('YYYY-MM-DD');
  },
});
