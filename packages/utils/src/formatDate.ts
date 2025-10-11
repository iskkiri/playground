import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const formatDateISO = (date: dayjs.ConfigType) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const formatDateDotted = (date: dayjs.ConfigType): string => {
  return dayjs(date).format('YYYY.MM.DD');
};

export const formatDateTime = (date: dayjs.ConfigType) => {
  return dayjs(date).format('YYYY.MM.DD A hh:mm');
};

export const isValidDateFormat = (value: string): boolean => {
  if (!value) return false;

  // 1990-01-01 형태 (완전한 날짜)
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return dayjs(value, 'YYYY-MM-DD', true).isValid();
  }

  // 1990-01 또는 1990-01- 형태 (연-월)
  if (/^\d{4}-\d{2}-?$/.test(value)) {
    const cleanValue = value.replace(/-$/, '');
    return dayjs(cleanValue, 'YYYY-MM', true).isValid();
  }

  // 1990 또는 1990- 형태 (연도만)
  if (/^\d{4}-?$/.test(value)) {
    const year = value.replace(/-$/, '');
    return dayjs(year, 'YYYY', true).isValid() && parseInt(year) >= 1000 && parseInt(year) <= 9999;
  }

  // 그 외는 유효하지 않음 (예: 199)
  return false;
};

/**
 * 날짜를 다음과 같은 형식으로 포맷팅합니다:
 * - 오늘인 경우: "오늘 오전/오후 시간" (예: "오늘 오전 9:00")
 * - 일주일 이내: "N일 전 오전/오후 시간" (예: "1일 전 오후 9:00")
 * - 일주일 이후: "YYYY.MM.DD" (예: "2025.09.25")
 */
export function formatRelativeDateTime(date: dayjs.ConfigType): string {
  const targetDate = dayjs(date);
  const now = dayjs();
  const diffInDays = now.diff(targetDate, 'day');

  // 오늘인 경우
  if (diffInDays === 0 && now.isSame(targetDate, 'day')) {
    return `오늘 ${targetDate.format('A h:mm')}`;
  }

  // 일주일 이내인 경우
  if (diffInDays > 0 && diffInDays < 7) {
    return `${diffInDays}일 전 ${targetDate.format('A h:mm')}`;
  }

  // 일주일 이후인 경우
  return targetDate.format('YYYY.MM.DD A h:mm');
}
