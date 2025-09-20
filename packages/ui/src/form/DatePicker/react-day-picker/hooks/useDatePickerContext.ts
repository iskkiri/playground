import { useContext } from 'react';
import { DatePickerContext } from '../context/DatePickerContext';

export function useDatePickerContext() {
  const context = useContext(DatePickerContext);

  if (!context) {
    throw new Error('useDatePickerContext must be used within a DatePicker component');
  }

  return context;
}