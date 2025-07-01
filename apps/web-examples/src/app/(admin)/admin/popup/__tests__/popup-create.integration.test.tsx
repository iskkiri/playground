import TestProviders from '@/__tests__/utils/TestProviders';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import AdminPopupCreatePage from '../create/page';
import { mockRouter } from '@/__tests__/setup';
import popupService from '@/app/(admin)/_features/popup/mocks/services/popup.service';

describe('팝업 생성', () => {
  const user = userEvent.setup();

  beforeEach(async () => {
    render(
      <TestProviders>
        <AdminPopupCreatePage />
      </TestProviders>
    );
  });

  describe('필수 값을 입력하지 않은 경우', () => {
    it('팝업명을 입력하지 않고 제출 시 "팝업명을 입력해 주세요" 메시지를 갖는 모달이 나타난다.', async () => {
      await user.click(screen.getByRole('button', { name: '저장하기' }));

      const modal = await screen.findByRole('dialog');
      expect(modal).toHaveTextContent('팝업명을 입력해주세요.');
    });

    it('팝업 이미지를 첨부하지 않고 제출 시 "팝업 이미지를 첨부해 주세요" 메시지를 갖는 모달이 나타난다.', async () => {
      const popupNameInput = screen.getByPlaceholderText('팝업명을 입력해 주세요');
      await user.type(popupNameInput, '팝업명');

      await user.click(screen.getByRole('button', { name: '저장하기' }));

      const modal = await screen.findByRole('dialog');
      expect(modal).toHaveTextContent('팝업 이미지를 첨부해주세요.');
    });
  });

  describe('필수값을 입력한 경우', () => {
    beforeEach(async () => {
      const popupNameInput = screen.getByPlaceholderText('팝업명을 입력해 주세요');
      await user.type(popupNameInput, '팝업명');

      const popupImageAttachment = screen.getByLabelText('이미지 첨부');
      await user.upload(
        popupImageAttachment,
        new File(['popup image'], 'popup image.png', { type: 'image/png' })
      );
    });

    afterEach(() => {
      popupService.reset();
    });

    it('팝업명, 팝업 이미지를 첨부해서 제출 시 팝업이 생성된다.', async () => {
      await user.click(screen.getByRole('button', { name: '저장하기' }));

      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith(`/admin/popup/8/edit`);
      });
    });
  });

  it('취소 버튼을 클릭하면 페이지 뒤로 이동한다.', async () => {
    const goBackButton = screen.getByRole('button', { name: '취소' });
    await user.click(goBackButton);

    expect(mockRouter.back).toHaveBeenCalled();
  });
});
