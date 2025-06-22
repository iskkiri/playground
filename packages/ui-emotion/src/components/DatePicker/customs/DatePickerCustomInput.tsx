import type { DatePickerProps } from 'react-datepicker';
import clsx from 'clsx';
import FeatherIcons from '@repo/theme/featherIcons';
import theme from '#src/theme';

interface CustomInputProps {
  value?: DatePickerProps['value'];
  onClick?: DatePickerProps['onInputClick'];
  isReadOnly?: boolean;
}

export default function DatePickerCustomInput({ isReadOnly, ...restProps }: CustomInputProps) {
  return (
    <div
      className={clsx('custom-input-container', {
        hasValue: !!restProps.value,
      })}
      onClick={restProps.onClick}
      aria-label="날짜 선택"
      aria-haspopup="dialog"
    >
      <input {...restProps} readOnly={isReadOnly} aria-label="날짜 입력" />
      <FeatherIcons.Calendar color={theme.colors.coolGray300} aria-hidden="true" />
    </div>
  );
}
