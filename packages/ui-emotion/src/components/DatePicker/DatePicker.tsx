import { useRef } from 'react';
import ReactDatePicker, {
  type CalendarContainer,
  type DatePickerProps as ReactDatePickerProps,
} from 'react-datepicker';
import { Global, type Interpolation, type Theme } from '@emotion/react';
import DatePickerCustomInput from './customs/DatePickerCustomInput';
import DatePickerCustomHeader from './customs/DatePickerCustomHeader';
import DatePickerCustomDay from './customs/DatePickerCustomDay';
import DatepickerCustomContainer from './customs/DatePickerCustomContainer';
import { reactDatePickerCss } from './DatePicker.styles';
import { useDatePickerState } from './hooks/useDatePickerState';
import useDatePickerActions from './hooks/useDatePickerActions';
import useDatePickerRangeStyle from './hooks/useDatePickerRangeStyle';
import useDatePickerRangeValues from './hooks/useDatePickerRangeValues';

type DatePickerProps = ReactDatePickerProps & {
  cssStyle?: Interpolation<Theme>;
};

// 취소, 완료 버튼으로 인해 내부에서 상태값을 관리할 수 밖에 없는 구조
export default function DatePicker({ cssStyle, ...props }: DatePickerProps) {
  const ref = useRef<ReactDatePicker | null>(null);

  // 내부 상태 관리
  const { innerDate, innerDateRange, onChangeInnerDate } = useDatePickerState({
    selectsRange: props.selectsRange ?? false,
    startDate: props.startDate ?? null,
    endDate: props.endDate ?? null,
    selected: props.selected ?? null,
  });

  // selectsRange, selectsStart, selectsEnd 에 따른 범위 날짜 분기 처리
  const { startDate, endDate } = useDatePickerRangeValues({
    selectsRange: props.selectsRange ?? false,
    selectsStart: props.selectsStart ?? false,
    selectsEnd: props.selectsEnd ?? false,
    innerDate,
    innerDateRange,
  });

  // Datepicker를 2개 사용하고, range를 표기하려는 경우 커스텀 클래스 설정하여 스타일 조정
  const getCustomRangeClass = useDatePickerRangeStyle({
    innerDate,
    selectsStart: props.selectsStart ?? false,
    selectsEnd: props.selectsEnd ?? false,
    startDate: props.startDate ?? null,
    endDate: props.endDate ?? null,
  });

  // 취소, 완료 버튼 클릭 시 실행되는 함수
  const { onCancel, onComplete } = useDatePickerActions({
    ref,
    selectsRange: props.selectsRange ?? false,
    startDate: props.startDate ?? null,
    endDate: props.endDate ?? null,
    selected: props.selected ?? null,
    innerDate,
    innerDateRange,
    onChangeInnerDate,
    onChange: props.onChange,
  });

  return (
    <>
      {/* Portal을 사용할 경우 default portal element를 document.body로 설정하기 때문에 Global로 적용 */}
      <Global styles={reactDatePickerCss.datepicker} />

      <div css={[reactDatePickerCss.datepicker, cssStyle]}>
        <ReactDatePicker
          {...props}
          ref={ref}
          showPopperArrow={false}
          shouldCloseOnSelect={false} // 날짜 선택해도 달력이 안닫히도록 설정
          dateFormat="yyyy-MM-dd" // 인풋에 나타나는 날짜 형식
          dateFormatCalendar="yyyy년 MM월" // 팝업 head 날짜 형식 지정
          popperPlacement="bottom"
          customInput={<DatePickerCustomInput isReadOnly />}
          calendarContainer={(
            containerProps: React.ComponentProps<typeof CalendarContainer>
          ) => (
            <DatepickerCustomContainer
              {...containerProps}
              onCancel={onCancel}
              onComplete={onComplete}
            />
          )}
          selected={props.selectsRange ? innerDateRange[0] : innerDate}
          startDate={startDate}
          endDate={endDate}
          onChange={onChangeInnerDate}
          renderCustomHeader={DatePickerCustomHeader}
          renderDayContents={DatePickerCustomDay}
          onClickOutside={onCancel}
          dayClassName={getCustomRangeClass}
        />
      </div>
    </>
  );
}
