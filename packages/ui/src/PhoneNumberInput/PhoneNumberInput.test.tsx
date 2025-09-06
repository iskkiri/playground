import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import PhoneNumberInput, { type PhoneNumberInputProps } from './PhoneNumberInput';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

// 제어 컴포넌트를 테스트하기 위한 래퍼 컴포넌트
function ControlledPhoneNumberInput(props: PhoneNumberInputProps) {
  const [value, setValue] = useState('');

  return (
    <PhoneNumberInput
      {...props}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange?.(e);
      }}
    />
  );
}

describe('PhoneNumberInput', () => {
  const user = userEvent.setup();

  describe('기본 입력 기능', () => {
    it('문자를 입력해도 숫자만 남는다', async () => {
      render(<ControlledPhoneNumberInput placeholder="전화번호 입력" />);

      const input = screen.getByPlaceholderText('전화번호 입력');

      await user.type(input, 'abc010def1234ghi5678');
      expect(input).toHaveDisplayValue('010-1234-5678');
    });

    it('숫자를 입력하면 휴대폰 번호 형식으로 표시된다', async () => {
      render(<ControlledPhoneNumberInput placeholder="전화번호 입력" />);

      const input = screen.getByPlaceholderText('전화번호 입력');

      await user.type(input, '010');
      expect(input).toHaveDisplayValue('010');

      await user.type(input, '1234');
      expect(input).toHaveDisplayValue('010-1234');

      await user.type(input, '5678');
      expect(input).toHaveDisplayValue('010-1234-5678');
    });

    it('11자리를 초과하면 입력되지 않는다', async () => {
      render(<ControlledPhoneNumberInput placeholder="전화번호 입력" />);

      const input = screen.getByPlaceholderText('전화번호 입력');

      await user.type(input, '01012345678999');
      expect(input).toHaveDisplayValue('010-1234-5678');
    });
  });

  describe('커서 위치 유지', () => {
    it('중간에 숫자를 삽입할 때 커서 위치가 올바르게 유지된다', async () => {
      render(<ControlledPhoneNumberInput placeholder="전화번호 입력" />);

      const input = screen.getByPlaceholderText('전화번호 입력') as HTMLInputElement;

      // 먼저 0101234567 입력 (010-1234-567로 표시됨)
      await user.type(input, '0101234567');
      expect(input).toHaveDisplayValue('010-1234-567');

      // 커서를 중간으로 이동 (567의 6 앞으로)
      await user.click(input);
      await user.keyboard('{ArrowLeft}'); // 7 앞으로 이동

      // 키보드로 8 입력 (커서 위치에 삽입)
      await user.keyboard('8');
      expect(input).toHaveDisplayValue('010-1234-5687');

      // 커서가 삽입한 숫자 뒤에 있는지 확인
      expect(input.selectionStart).toBe(12);
    });

    it('중간에 숫자를 삭제할 때도 커서 위치가 올바르게 유지된다', async () => {
      render(<ControlledPhoneNumberInput placeholder="전화번호 입력" />);

      const input = screen.getByPlaceholderText('전화번호 입력') as HTMLInputElement;

      // 01012345678 입력 (010-1234-5678로 표시됨)
      await user.type(input, '01012345678');
      expect(input).toHaveDisplayValue('010-1234-5678');

      // 커서를 6 뒤로 이동 (010-1234-56|78)
      await user.click(input);
      await user.keyboard('{ArrowLeft}{ArrowLeft}'); // 78 앞으로 이동

      // Backspace로 6을 삭제
      await user.keyboard('{Backspace}');
      expect(input).toHaveDisplayValue('010-1234-578');

      // 커서가 삭제된 위치에 있는지 확인
      expect(input.selectionStart).toBe(10);
    });
  });
});
