'use client';

import { createContext } from 'react';
import type { DatePickerMode } from '../types/datepicker.types';
import type { DateRange } from 'react-day-picker';

export interface DatePickerContextType {
  // Popover 상태
  open: boolean;
  onOpenChange: (open: boolean) => void;

  // 핵심 상태
  mode: DatePickerMode;
  date: Date | DateRange | undefined;
  setDate: (date: Date | DateRange | undefined) => void;

  // Calendar 상태
  month: Date | undefined;
  setMonth: (month: Date) => void;
}

export const DatePickerContext = createContext<DatePickerContextType | null>(null);
