'use client';

import { useCallback, useState, useEffect } from 'react';
import type { DateRange } from 'react-day-picker';
import Popover from '#src/overlay/Popover/Popover';
import PopoverTrigger from '#src/overlay/Popover/PopoverTrigger';
import PopoverContent from '#src/overlay/Popover/PopoverContent';
import TextInput from '../../TextInput/TextInput';
import { Calendar } from '../../Calendar/Calendar';
import FeatherIcons from '@repo/icons/featherIcons';
import { formatDate, isValidDateFormat } from '@repo/utils/formatDate';
import { useDateInputFormatter } from '../../Calendar/hooks/useDateInputFormatter';
import type { DatePickerProps } from './types';

export default function DatePicker<T extends 'single' | 'range' | 'range-start' | 'range-end' = 'single'>({
  mode = 'single' as T,
  variant = 'readonly',
  value,
  onChange,
  placeholder = '날짜를 선택해주세요.',
  className = 'w-300',
  isOpen: isOpenProp,
  onOpenChange: onOpenChangeProp,
  placement = 'bottom',
  offsetOptions = { mainAxis: 12 },
  captionLayout = 'dropdown',
  required = true,
  rangeValue,
  minDate,
  maxDate,
  ...otherProps
}: DatePickerProps<T>) {
  // 내부 팝오버 상태 (제어되지 않는 경우)
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isOpenProp ?? internalIsOpen;
  const setIsOpen = onOpenChangeProp ?? setInternalIsOpen;

  // 월 상태 (캘린더 네비게이션용)
  const [month, setMonth] = useState<Date | undefined>(() => {
    if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
      return value as Date;
    }
    if (mode === 'range') {
      const range = value as DateRange;
      return range?.from;
    }
    return undefined;
  });

  // Typeable variant를 위한 입력 상태
  const [inputValue, setInputValue] = useState<string>(() => {
    if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
      return value ? formatDate(value as Date) : '';
    }
    if (mode === 'range') {
      const range = value as DateRange;
      return range?.from && range?.to ? `${formatDate(range.from)} ~ ${formatDate(range.to)}` : '';
    }
    return '';
  });

  // 날짜 입력 포맷터
  const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);
  const { onChangeInput } = useDateInputFormatter({ onChange: onInputChange });

  // 부분 날짜를 완전한 날짜로 보완하는 함수
  const parsePartialDate = useCallback((value: string): Date | null => {
    if (!isValidDateFormat(value)) return null;
    
    // 1990-01-01 형태 (완전한 날짜)
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return new Date(value);
    }
    
    // 1990-01 또는 1990-01- 형태 (연-월) -> 해당 월의 1일로 설정
    if (/^\d{4}-\d{2}-?$/.test(value)) {
      const cleanValue = value.replace(/-$/, '');
      return new Date(`${cleanValue}-01`);
    }
    
    // 1990 또는 1990- 형태 (연도만) -> 해당 년의 1월 1일로 설정
    if (/^\d{4}-?$/.test(value)) {
      const year = value.replace(/-$/, '');
      return new Date(`${year}-01-01`);
    }
    
    return null;
  }, []);

  // Typeable variant에서 텍스트 입력 처리
  const onChangeTextInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (variant !== 'typeable') return;
      
      onChangeInput(event);
      const newValue = event.target.value;
      
      if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
        const newDate = parsePartialDate(newValue);
        if (newDate) {
          setMonth(newDate); // 파싱된 날짜로 month 업데이트
          (onChange as (value: Date) => void)?.(newDate);
        }
      }
    },
    [variant, mode, onChangeInput, onChange, parsePartialDate]
  );

  // 텍스트 입력 클릭 시 팝오버 제어
  const onClickTextInput = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    if (variant === 'typeable') {
      e.stopPropagation();
    }
  }, [variant]);

  // 텍스트 입력 포커스 시 팝오버 닫기 (typeable에서)
  const onFocusTextInput = useCallback(() => {
    if (variant === 'typeable') {
      setIsOpen(false);
    }
  }, [variant, setIsOpen]);

  // 캘린더 아이콘 클릭 (typeable에서만 사용)
  const onClickCalendar = useCallback(() => {
    if (variant === 'typeable') {
      setIsOpen(!isOpen);
    }
  }, [variant, isOpen, setIsOpen]);

  // 월 변경 처리
  const onMonthChange = useCallback((newMonth: Date) => {
    // Calendar.stories.tsx의 TypeableDatePicker 패턴과 동일하게 month만 업데이트
    setMonth(newMonth);
  }, []);

  // 날짜 선택 처리
  const onSelectDate = useCallback((selectedValue: Date | DateRange | undefined) => {
    if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
      const date = selectedValue as Date;
      setInputValue(date ? formatDate(date) : '');
      setMonth(date); // 선택된 날짜로 month 업데이트
      (onChange as (value: Date) => void)?.(date);
      setIsOpen(false);
    } else if (mode === 'range') {
      const range = selectedValue as DateRange;
      setInputValue(range?.from && range?.to ? `${formatDate(range.from)} ~ ${formatDate(range.to)}` : '');
      // range 모드에서는 날짜 선택 시 month 업데이트하지 않음 (Calendar.stories.tsx 패턴)
      // 팝오버 닫힐 때만 useEffect에서 range.from으로 초기화됨
      (onChange as (value: DateRange) => void)?.(range);
      // range 모드에서는 자동으로 닫지 않음 (사용자가 범위를 조정할 수 있도록)
    }
  }, [mode, onChange, setIsOpen]);

  // Calendar에서 사용할 disabled 함수
  const getDisabledDays = useCallback((day: Date) => {
    if (mode === 'range-start' && maxDate) {
      return day > maxDate;
    }
    if (mode === 'range-end' && minDate) {
      return day < minDate;
    }
    return false;
  }, [mode, minDate, maxDate]);

  // Calendar에서 사용할 selected 값
  const getSelectedValue = () => {
    if (mode === 'single') {
      return value as Date;
    }
    if (mode === 'range') {
      return value as DateRange;
    }
    if (mode === 'range-start' || mode === 'range-end') {
      return rangeValue || { from: value as Date, to: undefined };
    }
    return undefined;
  };

  // Calendar mode 결정
  const getCalendarMode = () => {
    if (mode === 'range' || mode === 'range-start' || mode === 'range-end') {
      return 'range' as const;
    }
    return 'single' as const;
  };

  // 팝오버 닫힐 때 month 초기화 (Calendar.stories.tsx 패턴 적용)
  useEffect(() => {
    if (isOpen) return;

    // 선택된 날짜가 있을 경우 month를 선택된 날짜의 month로 초기화
    if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
      const selectedDate = value as Date;
      setMonth(selectedDate);
    } else if (mode === 'range') {
      const range = value as DateRange;
      setMonth(range?.from);
    }
  }, [isOpen, value, mode]);

  return (
    <Popover
      placement={placement}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      offsetOptions={offsetOptions}
    >
      <PopoverTrigger as="div" className="cursor-pointer">
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
          className={`${className} ${variant === 'readonly' ? 'pointer-events-none' : ''}`}
          readOnly={variant === 'readonly'}
          {...otherProps}
        />
      </PopoverTrigger>

      <PopoverContent className="rounded-16 bg-white p-24 shadow-[0_0_40px_0_rgba(0,0,0,0.1)]">
        {getCalendarMode() === 'single' ? (
          <Calendar
            required={required}
            mode="single"
            captionLayout={captionLayout}
            month={month}
            onMonthChange={onMonthChange}
            selected={getSelectedValue() as Date}
            onSelect={onSelectDate}
            disabled={getDisabledDays}
          />
        ) : (
          <Calendar
            required={required}
            mode="range"
            captionLayout={captionLayout}
            month={month}
            onMonthChange={onMonthChange}
            selected={getSelectedValue() as DateRange}
            onSelect={mode === 'range' ? onSelectDate : undefined}
            onDayClick={mode === 'range-start' || mode === 'range-end' ? onSelectDate : undefined}
            disabled={getDisabledDays}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}