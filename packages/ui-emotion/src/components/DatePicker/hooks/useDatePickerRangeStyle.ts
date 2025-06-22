import dayjs from 'dayjs';
import { useCallback } from 'react';

interface UseDatePickerRangeStyleParams {
  innerDate: Date | null;
  selectsStart: boolean;
  selectsEnd: boolean;
  startDate: Date | null;
  endDate: Date | null;
  onChange?:
    | ((date: Date | null) => void)
    | ((date: [Date | null, Date | null]) => void)
    | ((date: Date[] | null) => void);
}

export default function useDatePickerRangeStyle({
  innerDate,
  selectsStart,
  selectsEnd,
  startDate,
  endDate,
}: UseDatePickerRangeStyleParams) {
  // Datepicker를 2개 사용하고, range를 표기하려는 경우 커스텀 클래스 설정하여 스타일 조정
  const getCustomRangeClass = useCallback(
    (date: Date) => {
      // Range : 시작 Datepicker (props.selectsStart = true)
      if (selectsStart) {
        // 내부 상태값이 시작 날짜
        const startDate = innerDate;

        if (!endDate) return '';

        // 시작 날짜
        if (dayjs(date).isSame(startDate, 'day')) {
          // 시작 날짜와 종료 날짜가 같은 경우
          if (dayjs(date).isSame(endDate, 'day')) {
            return 'custom-range-start custom-range-end';
          }

          return 'custom-range-start';
        }

        // 중간 날짜
        if (
          dayjs(date).isAfter(startDate, 'day') &&
          dayjs(date).isBefore(endDate, 'day')
        ) {
          return 'custom-range-middle';
        }

        // 종료 날짜
        if (dayjs(date).isSame(endDate, 'day')) {
          // 아직 시작 날짜를 선택하지 않은 경우
          if (!startDate) {
            return 'react-datepicker__day--selected';
          }

          return 'custom-range-end';
        }
      }

      // Range : 종료 Datepicker (props.selectsEnd = true)
      if (selectsEnd) {
        // 내부 상태값이 종료 날짜
        const endDate = innerDate;

        if (!startDate) return '';

        // 시작 날짜
        if (dayjs(date).isSame(startDate, 'day')) {
          // 아직 종료 날짜를 선택하지 않은 경우
          if (!endDate) {
            return 'react-datepicker__day--selected';
          }

          return 'custom-range-start';
        }

        // 중간 날짜
        if (
          dayjs(date).isAfter(startDate, 'day') &&
          dayjs(date).isBefore(endDate, 'day')
        ) {
          return 'custom-range-middle';
        }

        // 종료 날짜
        if (dayjs(date).isSame(endDate, 'day')) {
          // 시작 날짜와 종료 날짜가 같은 경우
          if (dayjs(date).isSame(startDate, 'day')) {
            return 'custom-range-start custom-range-end';
          }

          return 'custom-range-end';
        }
      }

      return '';
    },
    [innerDate, endDate, selectsEnd, selectsStart, startDate]
  );

  return getCustomRangeClass;
}
