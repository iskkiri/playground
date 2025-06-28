import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  describe('콘텐츠 렌더링', () => {
    it('children 텍스트가 올바르게 표시된다', () => {
      render(<Button buttonType="primary">버튼 텍스트</Button>);

      expect(screen.getByRole('button', { name: '버튼 텍스트' })).toBeInTheDocument();
    });

    it('prefix와 suffix가 표시된다', () => {
      render(
        <Button
          buttonType="primary"
          prefix={<span data-testid="prefix">👈</span>}
          suffix={<span data-testid="suffix">👉</span>}
        >
          중간 텍스트
        </Button>
      );

      expect(screen.getByTestId('prefix')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /중간 텍스트/ })).toBeInTheDocument();
      expect(screen.getByTestId('suffix')).toBeInTheDocument();
    });
  });

  describe('HTML 속성 전달', () => {
    it('기본 button type은 "button"이다', () => {
      render(<Button buttonType="primary">기본 타입</Button>);

      const button = screen.getByRole('button', { name: '기본 타입' });
      expect(button).toHaveAttribute('type', 'button');
    });
  });
});
