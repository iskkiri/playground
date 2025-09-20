import { useCallback, useMemo, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import type { DatePickerMode, DatePickerProps } from '../types/datepicker.types';

export interface UseDatePickerValueProps<T extends DatePickerMode> {
  mode: T;
  value?: DatePickerProps<T>['value'];
  onChange?: DatePickerProps<T>['onChange'];
}

export function useDatePickerValue<T extends DatePickerMode>({
  mode,
  value,
  onChange,
}: UseDatePickerValueProps<T>) {
  // 내부 상태 (uncontrolled 모드) - mode별 분리
  const [internalSingleValue, setInternalSingleValue] = useState<Date | undefined>();
  const [internalRangeValue, setInternalRangeValue] = useState<DateRange | undefined>();

  // controlled 여부 확인
  const isControlled = useMemo(() => value !== undefined, [value]);

  // 실제 사용할 날짜 값 (controlled vs uncontrolled)
  const currentDate = useMemo(() => {
    if (isControlled) return value; // controlled

    // uncontrolled
    if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
      return internalSingleValue;
    }

    if (mode === 'range') {
      return internalRangeValue;
    }

    return undefined;
  }, [internalRangeValue, internalSingleValue, isControlled, mode, value]);

  // 날짜 변경 처리
  const changeCurrentDate = useCallback(
    (newValue: Date | DateRange | undefined) => {
      // 외부 onChange 호출 (controlled 모드)
      if (onChange) {
        if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
          (onChange as (value: Date | undefined) => void)(newValue as Date | undefined);
        } else if (mode === 'range') {
          (onChange as (value: DateRange | undefined) => void)(newValue as DateRange | undefined);
        }
      }

      // 내부 상태 업데이트 (uncontrolled 모드)
      if (!isControlled) {
        if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
          setInternalSingleValue(newValue as Date | undefined);
        } else if (mode === 'range') {
          setInternalRangeValue(newValue as DateRange | undefined);
        }
      }
    },
    [mode, onChange, isControlled]
  );

  return {
    currentDate,
    changeCurrentDate,
  };
}
