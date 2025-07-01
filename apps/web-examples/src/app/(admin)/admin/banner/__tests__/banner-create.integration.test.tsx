import TestProviders from '@/__tests__/utils/TestProviders';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import AdminBannerCreatePage from '../create/page';
import { mockRouter } from '@/__tests__/setup';
import bannerService from '@/app/(admin)/_features/banner/mocks/services/banner.service';

describe('배너 생성', () => {
  const user = userEvent.setup();

  beforeEach(async () => {
    render(
      <TestProviders>
        <AdminBannerCreatePage />
      </TestProviders>
    );
  });

  describe('필수 값을 입력하지 않은 경우', () => {
    it('배너명을 입력하지 않고 제출 시 "배너명을 입력해 주세요" 메시지를 갖는 모달이 나타난다.', async () => {
      await user.click(screen.getByRole('button', { name: '저장하기' }));

      const modal = await screen.findByRole('dialog');
      expect(modal).toHaveTextContent('배너명을 입력해 주세요');
    });

    it('모바일 이미지를 업로드하지 않고 제출 시 "모바일용 이미지를 업로드해 주세요" 메시지를 갖는 모달이 나타난다.', async () => {
      const bannerNameInput = screen.getByPlaceholderText('배너명을 입력해 주세요');
      await user.type(bannerNameInput, '배너명');

      await user.click(screen.getByRole('button', { name: '저장하기' }));

      const modal = await screen.findByRole('dialog');
      expect(modal).toHaveTextContent('모바일용 이미지를 업로드해 주세요');
    });

    it('PC 이미지를 업로드하지 않고 제출 시 "PC용 이미지를 업로드해 주세요" 메시지를 갖는 모달이 나타난다.', async () => {
      const bannerNameInput = screen.getByPlaceholderText('배너명을 입력해 주세요');
      await user.type(bannerNameInput, '배너명');

      const mobileImageInput = screen.getByLabelText('모바일용 배너 이미지 첨부');
      await user.upload(
        mobileImageInput,
        new File(['mobile image'], 'mobile image.png', { type: 'image/png' })
      );

      await user.click(screen.getByRole('button', { name: '저장하기' }));

      const modal = await screen.findByRole('dialog');
      expect(modal).toHaveTextContent('PC용 이미지를 업로드해 주세요');
    });
  });

  describe('필수 값을 입력한 경우', () => {
    beforeEach(async () => {
      const bannerNameInput = screen.getByPlaceholderText('배너명을 입력해 주세요');
      await user.type(bannerNameInput, '배너명');

      const mobileImageInput = screen.getByLabelText('모바일용 배너 이미지 첨부');
      await user.upload(
        mobileImageInput,
        new File(['mobile image'], 'mobile image.png', { type: 'image/png' })
      );

      const pcImageInput = screen.getByLabelText('PC용 배너 이미지 첨부');
      await user.upload(
        pcImageInput,
        new File(['pc image'], 'pc image.png', { type: 'image/png' })
      );
    });

    afterEach(() => {
      bannerService.reset();
    });

    it('배너명, 모바일 이미지, PC 이미지를 첨부해서 제출 시 배너가 생성된다.', async () => {
      await user.click(screen.getByRole('button', { name: '저장하기' }));

      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith(`/admin/banner/12/edit`);
      });
    });

    it('배너명, 모바일 이미지, PC 이미지를 첨부하고, 모바일 링크, PC 링크를 입력해서 제출 시 배너가 생성된다.', async () => {
      const mobileLinkInput = screen.getAllByPlaceholderText('링크를 입력해 주세요')[0];
      await user.type(mobileLinkInput, 'https://www.naver.com');

      const pcLinkInput = screen.getAllByPlaceholderText('링크를 입력해 주세요')[1];
      await user.type(pcLinkInput, 'https://www.google.com');

      await user.click(screen.getByRole('button', { name: '저장하기' }));

      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith(`/admin/banner/12/edit`);
      });
    });
  });

  it('취소 버튼을 클릭하면 페이지 뒤로 이동한다.', async () => {
    const cancelButton = screen.getByRole('button', { name: '취소' });
    await user.click(cancelButton);

    expect(mockRouter.back).toHaveBeenCalled();
  });
});
