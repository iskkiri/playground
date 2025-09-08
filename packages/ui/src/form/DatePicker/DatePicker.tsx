'use client';

import './styles/date-picker.scss';

import { useRef } from 'react';
import ReactDatePicker, {
  type CalendarContainer,
  type DatePickerProps as ReactDatePickerProps,
} from 'react-datepicker';
import DatePickerCustomInput from './components/DatePickerCustomInput';
import DatePickerCustomHeader from './components/DatePickerCustomHeader';
import DatePickerCustomDay from './components/DatePickerCustomDay';
import DatepickerCustomContainer from './components/DatePickerCustomContainer';
import { useDatePickerState } from './hooks/useDatePickerState';
import useDatePickerActions from './hooks/useDatePickerActions';
import useDatePickerRangeStyle from './hooks/useDatePickerRangeStyle';
import useDatePickerRangeValues from './hooks/useDatePickerRangeValues';

type DatePickerProps = ReactDatePickerProps & {
  cancelButton?: ({ onCancel }: { onCancel: () => void }) => React.ReactNode;
  completeButton?: ({ onComplete }: { onComplete: () => void }) => React.ReactNode;
};

export default function DatePicker({
  className,
  selectsRange,
  startDate: startDateProps,
  endDate: endDateProps,
  selected: selectedProps,
  selectsStart,
  selectsEnd,
  onChange,
  cancelButton,
  completeButton,
  ...props
}: DatePickerProps) {
  const ref = useRef<ReactDatePicker | null>(null);

  // 내부 상태 관리
  const { innerDate, innerDateRange, onChangeInnerDate } = useDatePickerState({
    selectsRange: selectsRange ?? false,
    startDate: startDateProps ?? null,
    endDate: endDateProps ?? null,
    selected: selectedProps ?? null,
  });

  // selectsRange, selectsStart, selectsEnd 에 따른 범위 날짜 분기 처리
  const { startDate, endDate } = useDatePickerRangeValues({
    selectsRange: selectsRange ?? false,
    selectsStart: selectsStart ?? false,
    selectsEnd: selectsEnd ?? false,
    innerDate,
    innerDateRange,
  });

  // Datepicker를 2개 사용하고, range를 표기하려는 경우 커스텀 클래스 설정하여 스타일 조정
  const getCustomRangeClass = useDatePickerRangeStyle({
    innerDate,
    selectsStart: selectsStart ?? false,
    selectsEnd: selectsEnd ?? false,
    startDate: startDateProps ?? null,
    endDate: endDateProps ?? null,
  });

  // 취소, 완료 버튼 클릭 시 실행되는 함수
  const { onCancel, onComplete } = useDatePickerActions({
    ref,
    selectsRange: selectsRange ?? false,
    startDate: startDateProps ?? null,
    endDate: endDateProps ?? null,
    selected: selectedProps ?? null,
    innerDate,
    innerDateRange,
    onChangeInnerDate,
    onChange,
  });

  return (
    <div className={className}>
      <ReactDatePicker
        ref={ref}
        showPopperArrow={false}
        shouldCloseOnSelect={false} // 날짜 선택해도 달력이 안닫히도록 설정
        dateFormat="yyyy-MM-dd" // 인풋에 나타나는 날짜 형식
        dateFormatCalendar="yyyy년 MM월" // 팝업 head 날짜 형식 지정
        popperPlacement="bottom"
        customInput={<DatePickerCustomInput isReadOnly />}
        calendarContainer={(containerProps: React.ComponentProps<typeof CalendarContainer>) => (
          <DatepickerCustomContainer
            {...containerProps}
            onCancel={onCancel}
            onComplete={onComplete}
            cancelButton={cancelButton ? () => cancelButton({ onCancel }) : undefined}
            completeButton={completeButton ? () => completeButton({ onComplete }) : undefined}
          />
        )}
        selectsRange={selectsRange as undefined}
        selected={selectsRange ? innerDateRange[0] : innerDate}
        startDate={startDate}
        endDate={endDate}
        selectsStart={selectsStart}
        selectsEnd={selectsEnd}
        onChange={onChangeInnerDate}
        renderCustomHeader={DatePickerCustomHeader}
        renderDayContents={DatePickerCustomDay}
        onClickOutside={onCancel}
        dayClassName={getCustomRangeClass}
        {...props}
      />
    </div>
  );
}
