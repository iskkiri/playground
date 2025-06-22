import { useCallback } from 'react';
import { isDateRangeChange, isSingleChange } from '../types/datePicker.types';
import ReactDatePicker from 'react-datepicker';

interface UseDatePickerActionsParams {
  ref: React.RefObject<ReactDatePicker | null>;
  selectsRange: boolean;
  startDate: Date | null;
  endDate: Date | null;
  selected: Date | null;
  innerDate: Date | null;
  innerDateRange: [Date | null, Date | null];
  onChangeInnerDate: (
    date: Date | null | [Date | null, Date | null] | Date[]
  ) => void;
  onChange?:
    | ((date: Date | null) => void)
    | ((date: [Date | null, Date | null]) => void)
    | ((date: Date[] | null) => void);
}

export default function useDatePickerActions({
  ref,
  selectsRange,
  startDate,
  endDate,
  selected,
  innerDate,
  innerDateRange,
  onChangeInnerDate,
  onChange,
}: UseDatePickerActionsParams) {
  const onClose = useCallback(() => ref.current?.setOpen(false), [ref]);

  // 취소 버튼 클릭 시 초기값으로 돌리기
  const onCancel = useCallback(() => {
    if (selectsRange) {
      onChangeInnerDate([startDate ?? null, endDate ?? null]);
    } else {
      onChangeInnerDate(selected ?? null);
    }

    onClose();
  }, [onChangeInnerDate, onClose, endDate, selected, selectsRange, startDate]);

  // 완료 버튼 클릭 시 외부에서 전달된 onChange 함수 실행
  const onComplete = useCallback(() => {
    if (!onChange) {
      onClose();
      return;
    }

    if (selectsRange && isDateRangeChange(onChange)) {
      onChange(innerDateRange);
    } else if (isSingleChange(onChange)) {
      onChange(innerDate);
    }

    onClose();
  }, [innerDate, innerDateRange, onChange, onClose, selectsRange]);

  return {
    onClose,
    onCancel,
    onComplete,
  };
}
