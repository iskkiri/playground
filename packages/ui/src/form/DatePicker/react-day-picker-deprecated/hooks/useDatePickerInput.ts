import { useCallback, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import dayjs from 'dayjs';
import { useDateInputFormatter } from '../../../Calendar/hooks/useDateInputFormatter';
import type { DatePickerMode } from '../types/datepicker.types';

export interface UseDatePickerInputProps {
  variant: 'readonly' | 'typeable';
  mode: DatePickerMode;
  currentDate: Date | DateRange | undefined;
  changeCurrentDate: (value: Date | DateRange | undefined) => void;
  changeMonth: (month: Date) => void;
  dateFormat: string;
}

export function useDatePickerInput({
  variant,
  mode,
  currentDate,
  changeCurrentDate,
  changeMonth,
  dateFormat,
}: UseDatePickerInputProps) {
  // 날짜 포맷팅 헬퍼 함수
  const formatDate = useCallback(
    (date: Date) => {
      return dayjs(date).format(dateFormat);
    },
    [dateFormat]
  );

  // Typeable variant를 위한 입력 상태 (range 모드는 사용하지 않음)
  const [inputValue, setInputValue] = useState<string>(() => {
    if (mode === 'range') return '';

    if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
      const singleValue = currentDate;
      return singleValue instanceof Date ? formatDate(singleValue) : '';
    }

    return '';
  });

  // 날짜 입력 포맷터
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);
  const { onInputChange } = useDateInputFormatter({ onChange });

  // Typeable variant에서 텍스트 입력 처리 (range 모드는 사용하지 않음)
  const changeInputValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (variant !== 'typeable' || mode === 'range') return;

      onInputChange(event);
      const newValue = event.target.value;

      // dayjs로 날짜 파싱 (strict mode)
      const parsedDate = dayjs(newValue, dateFormat, true);
      if (!parsedDate.isValid()) return;

      const newDate = parsedDate.toDate();
      changeMonth(newDate); // 파싱된 날짜로 month 업데이트
      changeCurrentDate(newDate);
    },
    [variant, mode, onInputChange, changeCurrentDate, changeMonth, dateFormat]
  );

  // 날짜 선택 시 inputValue 업데이트
  const updateInputValueOnSelectDate = useCallback(
    (value: Date | DateRange | undefined) => {
      if (mode === 'range') {
        const isDateRange = value && typeof value === 'object' && 'from' in value;
        const range = isDateRange ? value : undefined;
        setInputValue(
          range?.from && range?.to ? `${formatDate(range.from)} ~ ${formatDate(range.to)}` : ''
        );
      } else if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
        const date = value instanceof Date ? value : undefined;
        setInputValue(date ? formatDate(date) : '');
      }
    },
    [mode, formatDate]
  );

  return {
    inputValue,
    changeInputValue,
    updateInputValueOnSelectDate,
  };
}
