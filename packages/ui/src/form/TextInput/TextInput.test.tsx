import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from './TextInput';

describe('TextInput 컴포넌트', () => {
  const user = userEvent.setup();

  describe('기본 텍스트 입력 기능', () => {
    it('사용자가 텍스트를 입력할 수 있다', async () => {
      render(<TextInput placeholder="이름을 입력하세요" />);

      const input = screen.getByPlaceholderText('이름을 입력하세요');

      await user.type(input, '홍길동');

      expect(input).toHaveValue('홍길동');
    });

    it('사용자가 입력한 텍스트를 수정할 수 있다', async () => {
      render(<TextInput defaultValue="기존 텍스트" />);

      const input = screen.getByDisplayValue('기존 텍스트');

      await user.clear(input);
      await user.type(input, '새로운 텍스트');

      expect(input).toHaveValue('새로운 텍스트');
    });

    it('비활성화된 입력 필드는 편집할 수 없다', async () => {
      render(<TextInput disabled defaultValue="비활성화" />);

      const input = screen.getByDisplayValue('비활성화');

      expect(input).toBeDisabled();

      // 비활성화된 input에 타이핑 시도
      await user.type(input, '변경시도');

      expect(input).toHaveValue('비활성화');
    });
  });

  describe('비밀번호 입력 기능', () => {
    it('비밀번호 타입일 때 가시성 토글 버튼이 나타난다', () => {
      render(<TextInput type="password" />);

      const toggleButton = screen.getByLabelText('비밀번호 보이기');
      expect(toggleButton).toBeInTheDocument();
    });

    it('사용자가 비밀번호 가시성을 토글할 수 있다', async () => {
      render(<TextInput type="password" placeholder="비밀번호를 입력하세요" />);

      const input = screen.getByPlaceholderText('비밀번호를 입력하세요');
      const toggleButton = screen.getByLabelText('비밀번호 보이기');

      expect(input).toHaveAttribute('type', 'password');
      expect(toggleButton).toBeInTheDocument();

      // 비밀번호 보기 버튼 클릭
      await user.click(toggleButton);

      // 비밀번호 보임
      expect(input).toHaveAttribute('type', 'text');

      // 다시 클릭하면 숨김
      await user.click(toggleButton);

      expect(input).toHaveAttribute('type', 'password');
    });
  });

  describe('Prefix와 Suffix', () => {
    it('Prefix가 올바르게 렌더링된다', () => {
      const prefix = <span data-testid="prefix">$</span>;
      render(<TextInput prefix={prefix} />);

      expect(screen.getByTestId('prefix')).toBeInTheDocument();
    });

    it('Suffix가 올바르게 렌더링된다', () => {
      const suffix = <span data-testid="suffix">km</span>;
      render(<TextInput suffix={suffix} />);

      expect(screen.getByTestId('suffix')).toBeInTheDocument();
    });

    it('Prefix와 Suffix가 함께 렌더링된다', () => {
      const prefix = <span data-testid="prefix">$</span>;
      const suffix = <span data-testid="suffix">.00</span>;

      render(<TextInput prefix={prefix} suffix={suffix} />);

      expect(screen.getByTestId('prefix')).toBeInTheDocument();
      expect(screen.getByTestId('suffix')).toBeInTheDocument();
    });
  });
});
