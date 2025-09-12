'use client';

import { useCallback, useState, useEffect, useMemo } from 'react';
import type { DateRange } from 'react-day-picker';
import Popover from '#src/overlay/Popover/Popover';
import PopoverTrigger from '#src/overlay/Popover/PopoverTrigger';
import PopoverContent from '#src/overlay/Popover/PopoverContent';
import TextInput from '../../TextInput/TextInput';
import { Calendar } from '../../Calendar/Calendar';
import FeatherIcons from '@repo/icons/featherIcons';
import dayjs from 'dayjs';
import { useDateInputFormatter } from '../../Calendar/hooks/useDateInputFormatter';
import type { DatePickerMode, DatePickerProps } from './types/datepicker.types';
import { cn } from '@repo/utils/cn';

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
  ...calendarProps
}: DatePickerProps<T>) {
  // 날짜 포맷팅 헬퍼 함수
  const formatDate = useCallback(
    (date: Date) => {
      return dayjs(date).format(dateFormat);
    },
    [dateFormat]
  );

  // 내부 팝오버 상태 (제어되지 않는 경우)
  const [isInternalOpen, setIsInternalOpen] = useState(false);
  const isOpen = isOpenProp ?? isInternalOpen;
  const setIsOpen = onOpenChangeProp ?? setIsInternalOpen;

  // 내부 상태 (uncontrolled 모드) - mode별 분리
  const [internalSingleValue, setInternalSingleValue] = useState<Date | undefined>();
  const [internalRangeValue, setInternalRangeValue] = useState<DateRange | undefined>();

  // 실제 사용할 값 (controlled vs uncontrolled)
  const currentValue = useMemo(() => {
    if (value !== undefined) return value; // controlled

    // 불필요한 if문이지만, 코드 이해를 위해 '얼리 리턴'을 의도적으로 사용하지 않음
    // uncontrolled
    if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
      return internalSingleValue;
    }

    if (mode === 'range') {
      return internalRangeValue;
    }

    return undefined;
  }, [internalRangeValue, internalSingleValue, mode, value]);

  // 달(월) 상태 (캘린더 네비게이션용)
  const [month, setMonth] = useState<Date | undefined>(() => {
    // 불필요한 if문이지만, 코드 이해를 위해 '얼리 리턴'을 의도적으로 사용하지 않음
    if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
      const singleValue = currentValue;
      return singleValue instanceof Date ? singleValue : undefined;
    }

    if (mode === 'range') {
      const rangeValue = currentValue;
      return rangeValue && typeof rangeValue === 'object' && 'from' in rangeValue
        ? rangeValue.from
        : undefined;
    }

    return undefined;
  });

  // Typeable variant를 위한 입력 상태 (range 모드는 사용하지 않음)
  const [inputValue, setInputValue] = useState<string>(() => {
    if (mode === 'range') return '';

    // 불필요한 if문이지만, 코드 이해를 위해 '얼리 리턴'을 의도적으로 사용하지 않음
    if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
      const singleValue = currentValue;
      return singleValue instanceof Date ? formatDate(singleValue) : '';
    }

    return '';
  });

  // 날짜 입력 포맷터
  const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);
  const { onChangeInput } = useDateInputFormatter({ onChange: onInputChange });

  // Typeable variant에서 텍스트 입력 처리
  const onChangeTextInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (variant !== 'typeable' || mode === 'range') return;

      onChangeInput(event);
      const newValue = event.target.value;

      // dayjs로 날짜 파싱 (strict mode)
      const parsedDate = dayjs(newValue, dateFormat, true);
      if (!parsedDate.isValid()) return;

      const newDate = parsedDate.toDate();
      setMonth(newDate); // 파싱된 날짜로 month 업데이트

      if (onChange) {
        // 외부 onChange 호출 (controlled 모드)
        (onChange as (value: Date | undefined) => void)(newDate);
      } else {
        // 내부 상태 업데이트 (uncontrolled 모드)
        setInternalSingleValue(newDate);
      }
    },
    [variant, mode, onChangeInput, onChange, dateFormat]
  );

  // 텍스트 입력 클릭 시 팝오버 제어
  const onClickTextInput = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      if (variant !== 'typeable') return;

      e.stopPropagation();
    },
    [variant]
  );

  // 텍스트 입력 포커스 시 팝오버 닫기 (typeable에서)
  const onFocusTextInput = useCallback(() => {
    if (variant !== 'typeable') return;

    setIsOpen(false);
  }, [variant, setIsOpen]);

  // 캘린더 아이콘 클릭 (typeable에서만 사용)
  const onClickCalendar = useCallback(() => {
    if (variant !== 'typeable') return;

    setIsOpen(!isOpen);
  }, [variant, isOpen, setIsOpen]);

  // 달(월) 변경 처리
  const onMonthChange = useCallback((newMonth: Date) => {
    setMonth(newMonth);
  }, []);

  // 날짜 선택 처리
  const onSelectDate = useCallback(
    (selectedValue: Date | DateRange | undefined) => {
      // 불필요한 if문이지만, 코드 이해를 위해 '얼리 리턴'을 의도적으로 사용하지 않음
      if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
        // single 모드에서는 Date 타입만 허용
        const date = selectedValue instanceof Date ? selectedValue : undefined;
        setInputValue(date ? formatDate(date) : '');
        setMonth(date); // 선택된 날짜로 month 업데이트

        // 내부 상태 업데이트 (uncontrolled 모드)
        if (value === undefined) {
          setInternalSingleValue(date);
        }
        // 외부 onChange 호출 (controlled 모드)
        if (onChange) {
          (onChange as (value: Date | undefined) => void)(date);
        }
        setIsOpen(false);
      } else if (mode === 'range') {
        // range 모드에서는 DateRange 타입만 허용
        const isDateRange =
          selectedValue && typeof selectedValue === 'object' && 'from' in selectedValue;
        const range = isDateRange ? selectedValue : undefined;

        setInputValue(
          range?.from && range?.to ? `${formatDate(range.from)} ~ ${formatDate(range.to)}` : ''
        );
        // 내부 상태 업데이트 (uncontrolled 모드)
        if (value === undefined) {
          setInternalRangeValue(range);
        }
        // 외부 onChange 호출 (controlled 모드)
        if (onChange) {
          (onChange as (value: DateRange | undefined) => void)(range);
        }
        // range 모드에서는 자동으로 닫지 않음 (사용자가 범위를 조정할 수 있도록)
      }
    },
    [mode, onChange, setIsOpen, value, formatDate]
  );

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
      return currentValue instanceof Date ? currentValue : undefined;
    }
    if (mode === 'range') {
      const isDateRange =
        currentValue && typeof currentValue === 'object' && 'from' in currentValue;
      return isDateRange ? currentValue : undefined;
    }
    if (mode === 'range-start' || mode === 'range-end') {
      const dateValue = currentValue instanceof Date ? currentValue : undefined;
      return rangeValue || (dateValue ? { from: dateValue, to: undefined } : undefined);
    }
    return undefined;
  }, [currentValue, mode, rangeValue]);

  /**
   * 팝오버 닫힐 때 month 초기화
   * 예시]
   * 1. 선택된 날짜: 2025-09-12
   * 2. month를 3월 선택. 그러나 최종적으로 날짜 변경은 하지 않음
   * 3. 팝오버를 닫았다가 다시 열었을 때는 선택된 날짜의 month인 9월로 설정되어 있어야 함
   */
  useEffect(() => {
    if (isOpen) return;

    // 선택된 날짜가 있을 경우 month를 선택된 날짜의 month로 초기화
    if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
      const selectedDate = currentValue instanceof Date ? currentValue : undefined;
      setMonth(selectedDate);
    } else if (mode === 'range') {
      const isDateRange =
        currentValue && typeof currentValue === 'object' && 'from' in currentValue;
      const range = isDateRange ? currentValue : undefined;
      setMonth(range?.from);
    }
  }, [isOpen, currentValue, mode]);

  return (
    <Popover
      placement={placement}
      isOpen={disabled ? false : isOpen}
      onOpenChange={disabled ? undefined : setIsOpen}
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
          onChange={variant === 'typeable' ? onChangeTextInput : undefined}
          onClick={onClickTextInput}
          onFocus={onFocusTextInput}
          suffix={
            variant === 'typeable' ? (
              <button
                type="button"
                onClick={onClickCalendar}
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
        {mode === 'single' ? (
          <Calendar
            required={required}
            mode="single"
            captionLayout={captionLayout}
            month={month}
            onMonthChange={onMonthChange}
            selected={selected instanceof Date ? selected : undefined}
            onSelect={onSelectDate}
            disabled={calendarDisabled ?? getDisabledDays}
            classNames={classNames?.calendar}
            {...calendarProps}
          />
        ) : (
          <Calendar
            required={required}
            mode="range"
            captionLayout={captionLayout}
            month={month}
            onMonthChange={onMonthChange}
            selected={
              selected && typeof selected === 'object' && 'from' in selected ? selected : undefined
            }
            onSelect={mode === 'range' ? onSelectDate : undefined}
            onDayClick={mode === 'range-start' || mode === 'range-end' ? onSelectDate : undefined}
            disabled={calendarDisabled ?? getDisabledDays}
            classNames={classNames?.calendar}
            {...calendarProps}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
