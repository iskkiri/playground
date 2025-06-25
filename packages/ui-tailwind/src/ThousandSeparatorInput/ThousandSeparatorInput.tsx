import { useCallback, useMemo, useRef } from 'react';
import TextInput, { type TextInputProps } from '../TextInput/TextInput';
import { addThousandSeparator } from '@repo/utils/formatThousandSeparator';

export interface ThousandSeparatorInputProps
  extends Omit<TextInputProps, 'type' | 'inputMode' | 'min' | 'max'> {
  min?: number;
  max?: number;
}

/**
 * React Hook Form과 사용할 경우
 * register는 비제어 컴포넌트 방식(uncontrolled)이므로 사용할 수 없습니다.
 * Controller 또는 useController를 이용하여 제어 컴포넌트 방식(controlled)으로 사용해야 합니다.
 */
export default function ThousandSeparatorInput({
  ref,
  onChange,
  value,
  min,
  max,
  ...restProps
}: ThousandSeparatorInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const combinedRef = useCallback(
    (node: HTMLInputElement) => {
      inputRef.current = node;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  const formattedValue = useMemo(() => {
    if (typeof value === 'number' || typeof value === 'string') {
      return addThousandSeparator(value);
    }

    return '';
  }, [value]);

  const onChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const numericValue = inputValue.replace(/[^\d]/g, '');

      // 빈 문자열이면 그대로 유지
      // 선행 zeros 제거 (ex. 000,000,000 -> 0)
      // => 숫자 맨 앞자리만 바꾸고 싶을 때, 0이 되어버려서 주석 처리함
      // 2025-06-06 주석 처리해제
      const cleanValue = numericValue === '' ? '' : numericValue.replace(/^0+/, '') || '0';
      const numValue = cleanValue === '' ? 0 : parseInt(cleanValue, 10);

      let validatedValue = cleanValue;
      if (typeof min === 'number' && numValue < min) {
        validatedValue = min.toString();
      } else if (typeof max === 'number' && numValue > max) {
        validatedValue = max.toString();
      }

      if (onChange) {
        const newEvent = {
          ...e,
          target: {
            ...e.target,
            value: validatedValue,
          },
        } satisfies React.ChangeEvent<HTMLInputElement>;

        onChange(newEvent);
      }

      const cursorPos = e.target.selectionStart;
      if (cursorPos === null) return;

      /**
       * 커서 위치 유지
       * 아래의 코드가 없을 경우 발생할 수 있는 문제점
       * 1. "12345"를 입력
       * 2. 커서를 "3" 뒤에 놓고 "0"을 입력하면 커서가 맨 끝으로 이동함
       */
      const formattedValue = addThousandSeparator(numericValue);
      const lengthDiff = formattedValue.length - inputValue.length;

      setTimeout(() => {
        if (inputRef.current) {
          const newCursorPos = cursorPos + lengthDiff;
          inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 0);
    },
    [onChange, min, max]
  );

  return (
    <TextInput
      {...restProps}
      ref={combinedRef}
      type="text"
      inputMode="numeric"
      onChange={onChangeValue}
      value={formattedValue}
    />
  );
}
