'use client';

import { useEffect } from 'react';
import Popover from '#src/overlay/Popover/Popover';
import PopoverTrigger from '#src/overlay/Popover/PopoverTrigger';
import PopoverContent from '#src/overlay/Popover/PopoverContent';
import TextInput from '../../TextInput/TextInput';
import { Calendar } from '../../Calendar/Calendar';
import FeatherIcons from '@repo/icons/featherIcons';
import type { DatePickerMode, DatePickerProps } from './types/datepicker.types';
import { cn } from '@repo/utils/cn';
import { useDatePickerPopover } from './hooks/useDatePickerPopover';
import { useDatePickerValue } from './hooks/useDatePickerValue';
import { useDatePickerInput } from './hooks/useDatePickerInput';
import { useDatePickerCalendar } from './hooks/useDatePickerCalendar';

export default function DatePicker<T extends DatePickerMode = 'single'>({
  // 핵심 모드 설정
  mode = 'single' as T,
  variant = 'readonly',
  disabled,
  // mode에 따른 조건부 타입
  value,
  onChange,
  // TextInput에서 상속받는 props
  placeholder,
  // Popover에서 상속받는 props
  isOpen: isOpenProp,
  onOpenChange: onOpenChangeProp,
  placement = 'bottom',
  offsetOptions = { mainAxis: 12 },
  // Calendar에서 상속받는 props
  captionLayout = 'dropdown',
  required = true,
  rangeValue,
  calendarDisabled,
  // range-start/range-end 전용 props
  minDate,
  maxDate,
  // 날짜 포맷
  dateFormat = 'YYYY-MM-DD',
  // classNames
  classNames,
  ...restCalendarProps
}: DatePickerProps<T>) {
  // 팝오버 관련 훅
  const { isOpen, setIsOpen, closePopover, preventPopoverOpen, togglePopover } =
    useDatePickerPopover({
      variant,
      isOpen: isOpenProp,
      onOpenChange: onOpenChangeProp,
    });

  // 값 관리 훅
  const { currentDate, changeCurrentDate } = useDatePickerValue({
    mode,
    value,
    onChange,
  });

  // 캘린더 관련 훅
  const { changeMonth, calendarProps, resetMonth } = useDatePickerCalendar({
    mode,
    currentDate,
    changeCurrentDate: (newValue) => {
      changeCurrentDate(newValue);
      updateInputValueOnSelectDate(newValue);
    },
    closePopover,
    rangeValue,
    minDate,
    maxDate,
    calendarDisabled: calendarDisabled as ((date: Date) => boolean) | undefined,
  });

  // 입력 관련 훅
  const { inputValue, changeInputValue, updateInputValueOnSelectDate } = useDatePickerInput({
    variant,
    mode,
    currentDate,
    changeCurrentDate,
    changeMonth,
    dateFormat,
  });

  /**
   * 팝오버 닫힐 때 month 초기화
   * 예시]
   * 1. 선택된 날짜: 2025-09-12
   * 2. month를 3월 선택. 그러나 최종적으로 날짜 변경은 하지 않음
   * 3. 팝오버를 닫았다가 다시 열었을 때는 선택된 날짜의 month인 9월로 설정되어 있어야 함
   */
  useEffect(() => {
    if (isOpen) return;
    resetMonth();
  }, [isOpen, resetMonth]);

  return (
    <Popover
      isOpen={disabled ? false : isOpen}
      onOpenChange={disabled ? undefined : setIsOpen}
      placement={placement}
      offsetOptions={offsetOptions}
    >
      <PopoverTrigger
        as="div"
        className={cn(
          'cursor-pointer',
          disabled && 'cursor-not-allowed',
          classNames?.popoverTrigger
        )}
      >
        <TextInput
          placeholder={placeholder}
          value={inputValue}
          onChange={variant === 'typeable' ? changeInputValue : undefined}
          onClick={preventPopoverOpen}
          onFocus={closePopover}
          suffix={
            variant === 'typeable' ? (
              <button
                type="button"
                onClick={togglePopover}
                className="flex items-center justify-center"
              >
                <FeatherIcons.Calendar color="var(--color-gray-400)" />
              </button>
            ) : (
              <FeatherIcons.Calendar color="var(--color-gray-400)" />
            )
          }
          className={cn(variant === 'readonly' && 'pointer-events-none', classNames?.input)}
          readOnly={variant === 'readonly'}
          disabled={disabled}
        />
      </PopoverTrigger>

      <PopoverContent
        className={cn(
          'rounded-16 bg-white p-24 shadow-[0_0_40px_0_rgba(0,0,0,0.1)]',
          classNames?.popoverContent
        )}
      >
        <Calendar
          required={required}
          captionLayout={captionLayout}
          classNames={classNames?.calendar}
          {...calendarProps}
          {...restCalendarProps}
        />
      </PopoverContent>
    </Popover>
  );
}
