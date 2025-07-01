import TestProviders from '@/__tests__/utils/TestProviders';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useParams } from 'next/navigation';
import AdminPopupEditPage from '../[id]/edit/page';

describe('팝업 수정', () => {
  const user = userEvent.setup();

  beforeEach(async () => {
    vi.mocked(useParams).mockReturnValue({ id: '1' });

    render(
      <TestProviders>
        <AdminPopupEditPage />
      </TestProviders>
    );

    // API 요청 후 폼 초기화가 될 때까지 기다림
    const popupImage = await screen.findByRole('img');
    expect(popupImage).toBeInTheDocument();
  });

  it('입력 필드의 값이 초기화되어 있다.', async () => {
    // 팝업명
    const popupNameInput = screen.getByPlaceholderText('팝업명을 입력해 주세요');
    expect(popupNameInput).toHaveValue('너비/높이 1:1인 팝업');

    // 노출상태
    const displayTypeSelect = screen.getByRole('radio', { name: '전체노출' });
    expect(displayTypeSelect).toBeChecked();

    // PC 노출 위치
    const pcPositionSelect = screen.getByRole('radio', { name: '가운데' });
    expect(pcPositionSelect).toBeChecked();

    // 노출 기간
    const datepickerInput = screen.getByLabelText('날짜 입력');
    expect(datepickerInput).toHaveValue('');

    // 팝업 이미지
    const imageSrc = screen.getByRole('img').getAttribute('src');
    expect(imageSrc).toMatch(/one-to-one_[A-Za-z0-9-_]+\.png/);

    // 이미지 링크
    const imageLinkInput = screen.getByPlaceholderText('링크를 입력해 주세요');
    expect(imageLinkInput).toHaveValue('https://google.com');

    // 이미지 너비
    const imageWidthSelect = screen.getByRole('radio', { name: '자동' });
    expect(imageWidthSelect).toBeChecked();
  });

  describe('필수 값을 입력하지 않을 경우', () => {
    it('팝업명을 입력하지 않고 제출 시 "팝업명을 입력해 주세요" 메시지를 갖는 모달이 나타난다.', async () => {
      const popupNameInput = screen.getByPlaceholderText('팝업명을 입력해 주세요');
      await user.clear(popupNameInput);

      await user.click(screen.getByRole('button', { name: '저장하기' }));

      const modal = await screen.findByRole('dialog');
      expect(modal).toHaveTextContent('팝업명을 입력해주세요.');
    });
  });

  it('값을 수정하고 제출 시 "팝업 수정 완료" 모달이 나타난다.', async () => {
    const popupNameInput = screen.getByPlaceholderText('팝업명을 입력해 주세요');
    await user.clear(popupNameInput);
    await user.type(popupNameInput, '팝업명 수정');

    await user.click(screen.getByRole('button', { name: '저장하기' }));

    const modal = await screen.findByRole('dialog');
    expect(modal).toHaveTextContent('팝업 수정 완료');
  });
});
