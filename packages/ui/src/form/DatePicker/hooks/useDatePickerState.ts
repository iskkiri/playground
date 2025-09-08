import { useCallback, useEffect, useState } from 'react';
import { isDateRange, isDateSingle } from '../types/datePicker.types';

interface UseDatePickerStateParams {
  selectsRange: boolean;
  startDate: Date | null;
  endDate: Date | null;
  selected: Date | null;
}

export function useDatePickerState({
  selectsRange,
  startDate,
  endDate,
  selected,
}: UseDatePickerStateParams) {
  // 완료 이전까지 내부에서 관리하는 상태값
  const [innerDate, setInnerDate] = useState<Date | null>(null);
  const [innerDateRange, setInnerDateRange] = useState<[Date | null, Date | null]>([null, null]);

  // 초기값 설정
  useEffect(() => {
    if (selectsRange) {
      setInnerDateRange([startDate ?? null, endDate ?? null]);
    } else {
      setInnerDate(selected ?? null);
    }
  }, [endDate, selected, selectsRange, startDate]);

  // 내부 상태 변경
  const onChangeInnerDate = useCallback(
    (selectedDate: Date | null | [Date | null, Date | null] | Date[]) => {
      if (selectsRange && isDateRange(selectedDate)) {
        setInnerDateRange(selectedDate);
      } else if (isDateSingle(selectedDate)) {
        setInnerDate(selectedDate);
      }
    },
    [selectsRange, setInnerDate, setInnerDateRange]
  );

  return { innerDate, innerDateRange, onChangeInnerDate };
}
