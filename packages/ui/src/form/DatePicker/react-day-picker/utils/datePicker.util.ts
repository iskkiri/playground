import type { DateRange } from 'react-day-picker';
import type { DatePickerMode } from '../types/datepicker.types';
import { formatDateISO } from '@repo/utils/formatDate';
import { isDate, isDateRange } from '../types/datepicker.types';

/**
 * 날짜 값으로부터 월(month)을 계산하는 순수 함수
 * @param dateValue 날짜 또는 날짜 범위 값
 * @param mode DatePicker 모드
 * @returns 월 (Date | undefined)
 */
export function getCalendarMonth(
  dateValue: Date | DateRange | undefined,
  mode: DatePickerMode
): Date | undefined {
  if (!dateValue) return undefined;

  if (mode === 'single') {
    if (!isDate(dateValue)) return undefined;

    return dateValue;
  }

  if (mode === 'range') {
    if (!isDateRange(dateValue)) return undefined;

    return dateValue.from;
  }

  if (mode === 'range-start') {
    if (!isDateRange(dateValue)) return undefined;

    // from이 있으면 from 월을, 없고 to만 있으면 to 월을 보여줌
    return dateValue.from || dateValue.to;
  }

  if (mode === 'range-end') {
    if (!isDateRange(dateValue)) return undefined;

    // to가 있으면 to 월을, 없고 from만 있으면 from 월을 보여줌
    return dateValue.to || dateValue.from;
  }

  return undefined;
}

/**
 * 날짜 값으로부터 Input 값을 계산하는 순수 함수
 * @param dateValue 날짜 또는 날짜 범위 값
 * @param mode DatePicker 모드
 * @returns 포맷된 날짜 문자열
 */
export function getInputValue(
  dateValue: Date | DateRange | undefined,
  mode: DatePickerMode
): string {
  if (!dateValue) return '';

  if (mode === 'single') {
    if (!isDate(dateValue)) return '';

    return formatDateISO(dateValue);
  }

  if (mode === 'range') {
    if (!isDateRange(dateValue)) return '';

    return `${formatDateISO(dateValue.from)} ~ ${formatDateISO(dateValue.to)}`;
  }

  if (mode === 'range-start') {
    if (!isDateRange(dateValue)) return '';

    return `${formatDateISO(dateValue.from)}`;
  }

  if (mode === 'range-end') {
    if (!isDateRange(dateValue)) return '';

    return `${formatDateISO(dateValue.to)}`;
  }

  return '';
}
