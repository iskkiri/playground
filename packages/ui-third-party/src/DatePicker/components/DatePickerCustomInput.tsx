import type { DatePickerProps } from 'react-datepicker';
import FeatherIcons from '@repo/icons/featherIcons';
import { cn } from '@repo/utils/cn';

type CustomInputProps = {
  value?: DatePickerProps['value'];
  onClick?: DatePickerProps['onInputClick'];
  disabled?: boolean;
  isReadOnly?: boolean;
};

export default function DatePickerCustomInput({ isReadOnly, ...restProps }: CustomInputProps) {
  return (
    <div
      className={cn('date-picker__custom-input-container', {
        hasValue: !!restProps.value,
      })}
      onClick={restProps.onClick}
      aria-label="날짜 선택"
      aria-haspopup="dialog"
    >
      <input {...restProps} readOnly={isReadOnly} aria-label="날짜 입력" />
      <FeatherIcons.Calendar
        color={
          restProps.disabled ? 'var(--dp-input-icon-disabled-color)' : 'var(--dp-input-icon-color)'
        }
        aria-hidden="true"
      />
    </div>
  );
}
