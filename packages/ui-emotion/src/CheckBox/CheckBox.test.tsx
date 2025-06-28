import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import CheckBox from './CheckBox';
import userEvent from '@testing-library/user-event';

describe('CheckBox', () => {
  const user = userEvent.setup();

  describe('라벨과 체크박스 연결', () => {
    it('라벨 텍스트를 클릭하면 체크박스가 토글된다', async () => {
      render(<CheckBox>동의합니다</CheckBox>);

      const checkbox = screen.getByRole('checkbox');
      const labelText = screen.getByText('동의합니다');

      expect(checkbox).not.toBeChecked();

      // 라벨 텍스트 클릭으로 체크박스 토글
      await user.click(labelText);
      expect(checkbox).toBeChecked();

      await user.click(labelText);
      expect(checkbox).not.toBeChecked();
    });

    it('아이콘을 클릭해도 체크박스가 토글된다', async () => {
      render(<CheckBox>동의합니다</CheckBox>);

      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).not.toBeChecked();

      // 아이콘 영역 클릭
      // aria-hidden='true'은 스크린 리더가 읽지 않음
      // 따라서 screen 으로 접근하지 않고, document 로 접근해야 함
      const icon = document.querySelector('svg');
      expect(icon).toBeInTheDocument();

      if (icon) {
        await user.click(icon);
        expect(checkbox).toBeChecked();
      }
    });

    it('disabled 상태에서는 라벨 클릭이 동작하지 않는다', async () => {
      render(<CheckBox disabled>비활성화된 체크박스</CheckBox>);

      const checkbox = screen.getByRole('checkbox');
      const labelText = screen.getByText('비활성화된 체크박스');

      expect(checkbox).toBeDisabled();
      expect(checkbox).not.toBeChecked();

      // disabled 상태에서는 클릭해도 변경되지 않음
      await user.click(labelText);
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('콘텐츠 렌더링', () => {
    it('children 텍스트가 올바르게 표시된다', () => {
      render(<CheckBox>이용약관에 동의합니다</CheckBox>);

      expect(screen.getByText('이용약관에 동의합니다')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('children 없이도 체크박스만 렌더링된다', () => {
      render(<CheckBox />);

      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });
  });

  describe('키보드 접근성', () => {
    it('Tab 키로 체크박스에 포커스할 수 있다', async () => {
      render(<CheckBox>키보드 접근 테스트</CheckBox>);

      const checkbox = screen.getByRole('checkbox');

      await user.tab();
      expect(checkbox).toHaveFocus();
    });

    it('Space 키로 체크박스를 토글할 수 있다', async () => {
      render(<CheckBox>스페이스 키 테스트</CheckBox>);

      const checkbox = screen.getByRole('checkbox');

      await user.tab(); // 포커스
      expect(checkbox).toHaveFocus();
      expect(checkbox).not.toBeChecked();

      await user.keyboard(' '); // 스페이스로 토글
      expect(checkbox).toBeChecked();

      await user.keyboard(' '); // 다시 토글
      expect(checkbox).not.toBeChecked();
    });
  });
});
