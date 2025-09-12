import type { DateRange } from 'react-day-picker';
import type { ComponentProps } from 'react';
import type TextInput from '../../TextInput/TextInput';
import type Popover from '#src/overlay/Popover/Popover';
import type { Calendar } from '../../Calendar/Calendar';

// 조건부 타입으로 mode에 따른 value와 onChange 타입 결정
export type DatePickerProps<T extends 'single' | 'range' | 'range-start' | 'range-end' = 'single'> = {
  // 핵심 모드 설정
  mode?: T;
  variant?: 'readonly' | 'typeable';
  
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
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  
  // Popover에서 상속받는 props  
  placement?: ComponentProps<typeof Popover>['placement'];
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  offsetOptions?: ComponentProps<typeof Popover>['offsetOptions'];
  
  // Calendar에서 상속받는 props
  captionLayout?: ComponentProps<typeof Calendar>['captionLayout'];
  required?: boolean;
  
  // range-start/range-end 전용 props
  rangeValue?: DateRange; // 전체 범위 (다른 DatePicker와 연동용)
  minDate?: Date;         // range-end에서 시작일보다 이전 날짜 비활성화
  maxDate?: Date;         // range-start에서 종료일보다 이후 날짜 비활성화
} & Omit<ComponentProps<typeof TextInput>, 'value' | 'onChange' | 'placeholder' | 'className' | 'disabled'>;