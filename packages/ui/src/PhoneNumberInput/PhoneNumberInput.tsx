'use client';

import { useCallback, useMemo, useRef } from 'react';
import TextInput, { type TextInputProps } from '../TextInput/TextInput';
import { formatPhoneNumber } from '@repo/utils/formatPhoneNumber';

export type PhoneNumberInputProps = Omit<TextInputProps, 'type' | 'inputMode' | 'maxLength'>;

/**
 * 휴대폰 번호 입력 컴포넌트
 * - 숫자만 입력 가능
 * - 자동으로 하이픈(-) 추가
 * - 최대 11자리 (010-1234-5678 형식)
 *
 * React Hook Form과 사용할 경우
 * register는 비제어 컴포넌트 방식(uncontrolled)이므로 사용할 수 없습니다.
 * Controller 또는 useController를 이용하여 제어 컴포넌트 방식(controlled)으로 사용해야 합니다.
 */
export default function PhoneNumberInput({
  ref,
  onChange,
  value,
  ...restProps
}: PhoneNumberInputProps) {
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
    if (typeof value === 'string') {
      return formatPhoneNumber(value);
    }
    return '';
  }, [value]);

  const onChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const numericValue = inputValue.replace(/[^\d]/g, '');
      const limitedValue = numericValue.slice(0, 11);

      if (onChange) {
        const newEvent = {
          ...e,
          target: {
            ...e.target,
            // includeHyphen이 true면 하이픈이 포함된 값을, 아니면 숫자만 반환
            value: formatPhoneNumber(limitedValue),
          },
        } satisfies React.ChangeEvent<HTMLInputElement>;

        onChange(newEvent);
      }

      /**
       * 커서 위치 유지
       * 아래의 코드가 없을 경우 발생할 수 있는 문제점
       * 1. "12345"를 입력
       * 2. 커서를 "3" 뒤에 놓고 "0"을 입력하면 커서가 맨 끝으로 이동함
       */
      const cursorPos = e.target.selectionStart;
      const formattedValue = formatPhoneNumber(limitedValue);
      const lengthDiff = formattedValue.length - inputValue.length;

      setTimeout(() => {
        if (inputRef.current && cursorPos !== null) {
          const newCursorPos = cursorPos + lengthDiff;
          inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 0);
    },
    [onChange]
  );

  return (
    <TextInput
      {...restProps}
      ref={combinedRef}
      type="text"
      inputMode="numeric"
      onChange={onChangeValue}
      value={formattedValue}
      maxLength={13} // 하이픈 포함 최대 길이 (010-1234-5678)
    />
  );
}
