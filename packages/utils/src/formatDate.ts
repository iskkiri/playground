import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const formatDate = (date: dayjs.ConfigType) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const formatDateTime = (date: dayjs.ConfigType) => {
  return dayjs(date).format('YYYY.MM.DD A hh:mm');
};
