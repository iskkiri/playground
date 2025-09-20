import type { DateRange } from 'react-day-picker';
import type { ComponentProps } from 'react';
import type TextInput from '../../../TextInput/TextInput';
import type Popover from '#src/overlay/Popover/Popover';
import type { Calendar } from '../../../Calendar/Calendar';

export type DatePickerMode = 'single' | 'range' | 'range-start' | 'range-end';

type DatePickerClassNames = {
  popoverTrigger?: string;
  popoverContent?: string;
  input?: string;
  calendar?: ComponentProps<typeof Calendar>['classNames'];
};

// 조건부 타입으로 mode에 따른 value와 onChange 타입 결정
export type DatePickerProps<T extends DatePickerMode = 'single'> = {
  // 핵심 모드 설정
  mode?: T;
  variant?: 'readonly' | 'typeable';
  disabled?: boolean;

  // mode에 따른 조건부 타입
  value?: T extends 'single' | 'range-start' | 'range-end'
    ? Date | undefined
    : T extends 'range'
      ? DateRange | undefined
      : never;

  onChange?: T extends 'single' | 'range-start' | 'range-end'
    ? (value: Date | undefined) => void
    : T extends 'range'
      ? (value: DateRange | undefined) => void
      : never;

  // TextInput에서 상속받는 props
  placeholder?: ComponentProps<typeof TextInput>['placeholder'];

  // Popover에서 상속받는 props
  open?: ComponentProps<typeof Popover>['open'];
  onOpenChange?: ComponentProps<typeof Popover>['onOpenChange'];
  side?: ComponentProps<typeof Popover.Content>['side'];
  align?: ComponentProps<typeof Popover.Content>['align'];
  sideOffset?: ComponentProps<typeof Popover.Content>['sideOffset'];

  // Calendar에서 상속받는 props
  captionLayout?: ComponentProps<typeof Calendar>['captionLayout'];
  required?: ComponentProps<typeof Calendar>['required'];
  calendarDisabled?: ComponentProps<typeof Calendar>['disabled'];

  // range-start/range-end 전용 props
  rangeValue?: DateRange; // 전체 범위 (다른 DatePicker와 연동용)
  minDate?: Date; // range-end에서 시작일보다 이전 날짜 비활성화
  maxDate?: Date; // range-start에서 종료일보다 이후 날짜 비활성화

  // 날짜 포맷 (dayjs 포맷 문자열)
  dateFormat?: string; // 기본값: 'YYYY-MM-DD'

  // classNames
  classNames?: DatePickerClassNames;
} & Omit<
  React.ComponentProps<typeof Calendar>,
  'mode' | 'selected' | 'onMonthChange' | 'onSelect' | 'disabled' | 'classNames'
>;
