import type { DatePickerProps } from 'react-datepicker';
import FeatherIcons from '@repo/icons/featherIcons';
import { cn } from '@repo/utils/cn';
import { useDateInputFormatter } from '../hooks/useDateInputFormatter';

type CustomInputProps = {
  isReadOnly: boolean;
  value?: DatePickerProps['value'];
  onClick?: DatePickerProps['onInputClick'];
  disabled?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function DatePickerCustomInput({
  isReadOnly,
  onChange,
  ...restProps
}: CustomInputProps) {
  const { onChangeInput } = useDateInputFormatter({ onChange });

  return (
    <div
      className={cn('date-picker__custom-input-container')}
      onClick={restProps.onClick}
      aria-label="날짜 선택"
      aria-haspopup="dialog"
    >
      <input
        {...restProps}
        onChange={onChangeInput}
        readOnly={isReadOnly}
        aria-label="날짜 입력"
        style={{ pointerEvents: isReadOnly ? 'none' : 'auto' }}
      />

      <FeatherIcons.Calendar
        color={
          restProps.disabled ? 'var(--dp-input-icon-disabled-color)' : 'var(--dp-input-icon-color)'
        }
        aria-hidden="true"
      />
    </div>
  );
}
