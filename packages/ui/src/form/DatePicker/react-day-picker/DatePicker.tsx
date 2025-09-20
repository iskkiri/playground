'use client';

import { useEffect, useMemo, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { DatePickerContext } from './context/DatePickerContext';
import type { DatePickerMode, DatePickerOnChange, DatePickerValue } from './types/datepicker.types';
import DatePickerInput from './components/DatePickerInput';
import DatePickerCalendar from './components/DatePickerCalendar';
import Popover from '#src/overlay/Popover/Popover';
import { getCalendarMonth } from './utils/datePickerUtils';

export interface DatePickerProps<T extends DatePickerMode = 'single'> {
  children: React.ReactNode;

  // Popover 관련
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  // DatePicker 관련
  mode?: T;
  value?: DatePickerValue<T>;
  onChange?: DatePickerOnChange<T>;
}

export default function DatePicker<T extends DatePickerMode = 'single'>({
  children,
  mode = 'single' as T,
  value,
  onChange,
  open: openProp,
  onOpenChange: onOpenChangeProp,
}: DatePickerProps<T>) {
  // Popover 상태 (Controlled/Uncontrolled)
  const [internalOpen, setInternalOpen] = useState(false);
  const open = openProp ?? internalOpen;
  const onOpenChange = onOpenChangeProp ?? setInternalOpen;

  // 날짜 상태 (Controlled/Uncontrolled) - mode에 따라 타입 다름
  const [internalDate, setInternalDate] = useState<Date | DateRange | undefined>();
  const date = value ?? internalDate;
  const setDate = onChange ?? setInternalDate;

  // Calendar 월 상태 - single은 date, range는 date.from 기준
  const [month, setMonth] = useState<Date | undefined>(() => getCalendarMonth(date, mode));

  // 팝오버 닫힐 때 month 초기화
  useEffect(() => {
    if (open) return;
    setMonth(getCalendarMonth(date, mode));
  }, [open, date, mode]);

  const contextValue = useMemo(
    () => ({
      open,
      onOpenChange,
      mode,
      date,
      setDate: setDate as (date: Date | DateRange | undefined) => void,
      month,
      setMonth,
    }),
    [mode, date, setDate, open, onOpenChange, month]
  );

  return (
    <DatePickerContext.Provider value={contextValue}>
      <Popover open={open} onOpenChange={onOpenChange}>
        {children}
      </Popover>
    </DatePickerContext.Provider>
  );
}

DatePicker.Input = DatePickerInput;
DatePicker.Calendar = DatePickerCalendar;
