import { useRef, useCallback } from 'react';
import { formatDateInput } from '@repo/utils/formatDateInput';

type UseDateInputFormatterProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function useDateInputFormatter({ onChange }: UseDateInputFormatterProps) {
  const previousValueRef = useRef<string>('');

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      const inputValue = target.value;
      const previousValue = previousValueRef.current;

      // 삭제 동작인지 확인 (이전 값보다 길이가 짧아졌는지)
      const isDeleting = inputValue.length < previousValue.length;

      const formattedValue = formatDateInput({ value: inputValue, isDeleting });

      if (formattedValue !== inputValue) {
        const cursorPosition = target.selectionStart || 0;
        target.value = formattedValue;

        // 커서 위치 조정
        let newCursorPosition = cursorPosition;
        if (formattedValue.length > inputValue.length) {
          newCursorPosition = cursorPosition + 1;
        }

        target.setSelectionRange(newCursorPosition, newCursorPosition);
      }

      // 현재 값을 이전 값으로 저장
      previousValueRef.current = target.value;

      // 원래 onChange 이벤트 호출
      if (onChange) {
        onChange(event);
      }
    },
    [onChange]
  );

  return {
    onInputChange,
  };
}
