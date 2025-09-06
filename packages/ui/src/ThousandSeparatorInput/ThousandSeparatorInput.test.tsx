import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ThousandSeparatorInput, { type ThousandSeparatorInputProps } from './ThousandSeparatorInput';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

// 제어 컴포넌트를 테스트하기 위한 래퍼 컴포넌트
function ControlledThousandSeparatorInput(props: ThousandSeparatorInputProps) {
  const [value, setValue] = useState('');

  return (
    <ThousandSeparatorInput
      {...props}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange?.(e);
      }}
    />
  );
}

describe('ThousandSeparatorInput', () => {
  const user = userEvent.setup();

  describe('기본 입력 기능', () => {
    it('문자를 입력해도 숫자만 남는다', async () => {
      render(<ControlledThousandSeparatorInput placeholder="금액 입력" />);

      const input = screen.getByPlaceholderText('금액 입력');

      await user.type(input, 'abc123def456ghi');
      expect(input).toHaveDisplayValue('123,456');
    });

    it('숫자를 입력하면 천 단위 구분자가 표시된다', async () => {
      render(<ControlledThousandSeparatorInput placeholder="금액을 입력해주세요" />);

      const input = screen.getByPlaceholderText('금액을 입력해주세요');

      await user.type(input, '1000');
      expect(input).toHaveDisplayValue('1,000');

      await user.clear(input);
      await user.type(input, '1234567');
      expect(input).toHaveDisplayValue('1,234,567');
    });
  });

  describe('최소값, 최대값 제한', () => {
    it('최소값보다 작은 값을 입력하면 최소값으로 제한된다', async () => {
      render(<ControlledThousandSeparatorInput placeholder="금액을 입력해주세요" min={1_000} />);

      const input = screen.getByPlaceholderText('금액을 입력해주세요');

      await user.type(input, '1');
      expect(input).toHaveDisplayValue('1,000');
    });

    it('최대값보다 큰 값을 입력하면 최대값으로 제한된다', async () => {
      render(<ControlledThousandSeparatorInput placeholder="금액을 입력해주세요" max={10_000} />);

      const input = screen.getByPlaceholderText('금액을 입력해주세요');

      await user.type(input, '50000');
      expect(input).toHaveDisplayValue('10,000');
    });
  });

  describe('커서 위치 유지', () => {
    it('중간에 숫자를 삽입할 때 커서 위치가 올바르게 유지된다', async () => {
      render(<ControlledThousandSeparatorInput placeholder="금액을 입력해주세요" />);

      const input = screen.getByPlaceholderText('금액을 입력해주세요') as HTMLInputElement;

      // 먼저 12345 입력 (12,345로 표시됨)
      await user.type(input, '12345');
      expect(input).toHaveDisplayValue('12,345');

      // 커서를 중간으로 이동 (3 뒤 위치로)
      await user.click(input);
      await user.keyboard('{ArrowLeft}{ArrowLeft}'); // 45 앞으로 이동

      // 키보드로 6 입력 (커서 위치에 삽입)
      await user.keyboard('6');
      expect(input).toHaveDisplayValue('123,645');

      // 커서가 삽입한 숫자 뒤에 있는지 확인
      expect(input.selectionStart).toBe(5);
    });

    it('중간에 숫자를 삭제할 때도 커서 위치가 올바르게 유지된다', async () => {
      render(<ControlledThousandSeparatorInput placeholder="금액을 입력해주세요" />);

      const input = screen.getByPlaceholderText('금액을 입력해주세요') as HTMLInputElement;

      // 123456 입력 (123,456으로 표시됨)
      await user.type(input, '123456');
      expect(input).toHaveDisplayValue('123,456');

      // 커서를 5 뒤로 이동 (123,45|6)
      await user.click(input);
      await user.keyboard('{ArrowLeft}'); // 6 앞으로 이동

      // Backspace로 5를 삭제
      await user.keyboard('{Backspace}');
      expect(input).toHaveDisplayValue('12,346');

      // 커서가 삭제된 위치에 있는지 확인 (12,34|6)
      expect(input.selectionStart).toBe(5);
    });
  });
});
