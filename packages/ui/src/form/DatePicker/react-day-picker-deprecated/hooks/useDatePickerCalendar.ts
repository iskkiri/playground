import { useCallback, useMemo, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import type { DatePickerMode } from '../types/datepicker.types';

export interface UseDatePickerCalendarProps {
  mode: DatePickerMode;
  currentDate: Date | DateRange | undefined;
  changeCurrentDate: (value: Date | DateRange | undefined) => void;
  closePopover: () => void;
  rangeValue?: DateRange;
  minDate?: Date;
  maxDate?: Date;
  calendarDisabled?: (date: Date) => boolean;
}

export function useDatePickerCalendar({
  mode,
  currentDate,
  changeCurrentDate,
  closePopover,
  rangeValue,
  minDate,
  maxDate,
  calendarDisabled,
}: UseDatePickerCalendarProps) {
  // 달(월) 상태 (캘린더 네비게이션용)
  const [month, setMonth] = useState<Date | undefined>(() => {
    if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
      const singleValue = currentDate;
      return singleValue instanceof Date ? singleValue : undefined;
    }

    if (mode === 'range') {
      const rangeValue = currentDate;
      return rangeValue && typeof rangeValue === 'object' && 'from' in rangeValue
        ? rangeValue.from
        : undefined;
    }

    return undefined;
  });

  // 달(월) 변경 처리
  const changeMonth = useCallback((newMonth: Date) => {
    setMonth(newMonth);
  }, []);

  // Calendar에서 사용할 disabled 함수
  const getDisabledDays = useCallback(
    (day: Date) => {
      if (mode === 'range-start' && maxDate) {
        return day > maxDate;
      }
      if (mode === 'range-end' && minDate) {
        return day < minDate;
      }
      return false;
    },
    [mode, minDate, maxDate]
  );

  // Calendar에서 사용할 selected 값
  const selected = useMemo(() => {
    if (mode === 'single') {
      return currentDate instanceof Date ? currentDate : undefined;
    }
    if (mode === 'range') {
      const isDateRange = currentDate && typeof currentDate === 'object' && 'from' in currentDate;
      return isDateRange ? currentDate : undefined;
    }
    if (mode === 'range-start' || mode === 'range-end') {
      const dateValue = currentDate instanceof Date ? currentDate : undefined;
      return rangeValue || (dateValue ? { from: dateValue, to: undefined } : undefined);
    }
    return undefined;
  }, [currentDate, mode, rangeValue]);

  // 날짜 선택 처리
  const selectDate = useCallback(
    (selectedValue: Date | DateRange | undefined) => {
      if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
        // single 모드에서는 Date 타입만 허용
        const date = selectedValue instanceof Date ? selectedValue : undefined;
        setMonth(date); // 선택된 날짜로 month 업데이트
        changeCurrentDate(date);
        closePopover();
      } else if (mode === 'range') {
        // range 모드에서는 DateRange 타입만 허용
        const isDateRange =
          selectedValue && typeof selectedValue === 'object' && 'from' in selectedValue;
        const range = isDateRange ? selectedValue : undefined;

        changeCurrentDate(range);
        // range 모드에서는 자동으로 닫지 않음 (사용자가 범위를 조정할 수 있도록)
      }
    },
    [mode, changeCurrentDate, closePopover]
  );

  // Calendar props 생성
  const calendarProps = useMemo(() => {
    const baseProps = {
      month,
      onMonthChange: changeMonth,
      selected,
      disabled: calendarDisabled ?? getDisabledDays,
    };

    if (mode === 'single') {
      return {
        ...baseProps,
        mode: 'single' as const,
        selected: selected instanceof Date ? selected : undefined,
        onSelect: selectDate,
      };
    } else {
      return {
        ...baseProps,
        mode: 'range' as const,
        selected:
          selected && typeof selected === 'object' && 'from' in selected ? selected : undefined,
        onSelect: mode === 'range' ? selectDate : undefined,
        onDayClick: mode === 'range-start' || mode === 'range-end' ? selectDate : undefined,
      };
    }
  }, [mode, month, changeMonth, selected, calendarDisabled, getDisabledDays, selectDate]);

  // 팝오버가 닫힐 때 month 초기화 (외부에서 호출)
  const resetMonth = useCallback(() => {
    // 선택된 날짜가 있을 경우 month를 선택된 날짜의 month로 초기화
    if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
      const selectedDate = currentDate instanceof Date ? currentDate : undefined;
      setMonth(selectedDate);
    } else if (mode === 'range') {
      const isDateRange = currentDate && typeof currentDate === 'object' && 'from' in currentDate;
      const range = isDateRange ? currentDate : undefined;
      setMonth(range?.from);
    }
  }, [currentDate, mode]);

  return {
    changeMonth,
    calendarProps,
    resetMonth,
  };
}
