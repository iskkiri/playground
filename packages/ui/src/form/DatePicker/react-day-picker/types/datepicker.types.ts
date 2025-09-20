import type { DateRange } from 'react-day-picker';

export type DatePickerMode = 'single' | 'range' | 'range-start' | 'range-end';

export type DatePickerValue<T extends DatePickerMode> = T extends 'single'
  ? Date | undefined
  : T extends 'range-start' | 'range-end'
    ? DateRange | undefined
    : DateRange | undefined;

export type DatePickerOnChange<T extends DatePickerMode> = T extends 'single'
  ? (date: Date | undefined) => void
  : T extends 'range-start' | 'range-end'
    ? (date: Date | undefined) => void
    : (date: DateRange | undefined) => void;

// Type Guard
export const isDate = (value: unknown): value is Date => {
  return value instanceof Date;
};

export const isDateRange = (value: unknown): value is DateRange => {
  return !!value && typeof value === 'object' && 'from' in value && 'to' in value;
};
