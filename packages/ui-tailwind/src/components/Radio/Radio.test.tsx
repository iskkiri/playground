import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Radio from './Radio';
import userEvent from '@testing-library/user-event';

describe('Radio', () => {
  const user = userEvent.setup();

  describe('라벨과 라디오 버튼 연결', () => {
    it('라벨 텍스트를 클릭하면 라디오 버튼이 선택된다', async () => {
      render(
        <Radio name="test" value="option1">
          옵션 1
        </Radio>
      );

      const radio = screen.getByRole('radio');
      const labelText = screen.getByText('옵션 1');

      expect(radio).not.toBeChecked();

      // 라벨 텍스트 클릭으로 라디오 버튼 선택
      await user.click(labelText);
      expect(radio).toBeChecked();
    });

    it('disabled 상태에서는 라벨 클릭이 동작하지 않는다', async () => {
      render(
        <Radio name="test" value="option1" disabled>
          비활성화된 라디오
        </Radio>
      );

      const radio = screen.getByRole('radio');
      const labelText = screen.getByText('비활성화된 라디오');

      expect(radio).toBeDisabled();
      expect(radio).not.toBeChecked();

      // disabled 상태에서는 클릭해도 변경되지 않음
      await user.click(labelText);
      expect(radio).not.toBeChecked();
    });
  });

  describe('콘텐츠 렌더링', () => {
    it('children이 렌더링된다', () => {
      render(
        <Radio name="test" value="option1">
          라디오 버튼 옵션
        </Radio>
      );

      expect(screen.getByText('라디오 버튼 옵션')).toBeInTheDocument();
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('children 없이도 라디오 버튼만 렌더링된다', () => {
      render(<Radio name="test" value="option1" />);

      // 라디오 버튼이 존재하는지 확인
      expect(screen.getByRole('radio')).toBeInTheDocument();

      const label = document.querySelector('label');

      // label 안에 input 요소만 있는지 확인
      expect(label?.textContent?.trim()).toBe('');
      expect(label?.children).toHaveLength(1);
    });
  });
});
