import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const formatDate = (date: dayjs.ConfigType) => {
  return dayjs(date).format('YYYY-MM-DD');
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
