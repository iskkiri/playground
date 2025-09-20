'use client';

import { useCallback } from 'react';
import { Calendar } from '../../../Calendar/Calendar';
import Popover from '#src/overlay/Popover/Popover';
import { cn } from '@repo/utils/cn';
import { useDatePickerContext } from '../hooks/useDatePickerContext';
import { isDateRange, type DateRange } from 'react-day-picker';
import { isDate } from '../types/datepicker.types';

type DatePickerCalendarProps = Omit<
  React.ComponentProps<typeof Popover.Content>,
  'className' | 'onSelect'
> &
  Omit<
    React.ComponentProps<typeof Calendar>,
    'className' | 'classNames' | 'mode' | 'selected' | 'onSelect' | 'month' | 'onMonthChange'
  > & {
    classNames?: {
      popover?: string;
      calendar?: React.ComponentProps<typeof Calendar>['classNames'];
    };
  };

export default function DatePickerCalendar({
  side = 'bottom',
  align = 'center',
  sideOffset = 12,
  captionLayout = 'dropdown',
  classNames,
  ...props
}: DatePickerCalendarProps) {
  const { onOpenChange, mode, date, month, setDate, setMonth } = useDatePickerContext();

  // 날짜 선택 핸들러 - mode에 따라 다른 처리
  const onSelect = useCallback(
    (selectedValue: Date | DateRange | undefined) => {
      // 날짜 상태 업데이트
      setDate(selectedValue);

      // 월 상태 업데이트
      if (mode === 'single' || mode === 'range-start' || mode === 'range-end') {
        if (!isDate(selectedValue)) return;

        setMonth(selectedValue);
        onOpenChange(false);
      } else if (mode === 'range') {
        if (!isDateRange(selectedValue) || !selectedValue.from) return;

        setMonth(selectedValue.from);
        // range 모드에서는 자동으로 닫지 않음 (사용자가 범위를 조정할 수 있도록)
        // 팝오버는 사용자가 직접 닫거나 외부 클릭으로만 닫힘
      }
    },
    [mode, setDate, onOpenChange, setMonth]
  );

  // Calendar에서 사용할 disabled 함수 (range-start, range-end 모드에서 사용)
  const getDisabledDays = useCallback(
    (day: Date) => {
      if (mode === 'range-start' && isDateRange(date) && date.to) {
        return day > date.to;
      }
      if (mode === 'range-end' && isDateRange(date) && date.from) {
        return day < date.from;
      }
      return false;
    },
    [mode, date]
  );

  return (
    <Popover.Content
      side={side}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'rounded-16 bg-white p-24 shadow-[0_0_40px_0_rgba(0,0,0,0.1)]',
        classNames?.popover
      )}
    >
      {(() => {
        switch (mode) {
          case 'single':
            return (
              <Calendar
                required
                mode="single"
                captionLayout={captionLayout}
                month={month}
                selected={date instanceof Date ? date : undefined}
                onSelect={onSelect}
                onMonthChange={setMonth}
                classNames={classNames?.calendar}
                {...props}
              />
            );
          case 'range':
            return (
              <Calendar
                required
                mode="range"
                captionLayout={captionLayout}
                month={month}
                selected={isDateRange(date) ? date : undefined}
                onSelect={onSelect}
                onMonthChange={setMonth}
                classNames={classNames?.calendar}
                {...props}
              />
            );
          case 'range-start':
          case 'range-end':
            return (
              <Calendar
                required
                mode="range"
                captionLayout={captionLayout}
                month={month}
                selected={isDateRange(date) ? date : undefined}
                onDayClick={(day) => onSelect(day)}
                onMonthChange={setMonth}
                disabled={getDisabledDays}
                classNames={classNames?.calendar}
                {...props}
              />
            );
        }
      })()}
    </Popover.Content>
  );
}
