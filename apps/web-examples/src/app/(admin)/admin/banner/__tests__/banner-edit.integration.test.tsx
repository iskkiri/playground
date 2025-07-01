import TestProviders from '@/__tests__/utils/TestProviders';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useParams } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AdminBannerEditPage from '../[id]/edit/page';

describe('배너 수정', () => {
  const user = userEvent.setup();

  beforeEach(async () => {
    vi.mocked(useParams).mockReturnValue({ id: '10' });

    render(
      <TestProviders>
        <AdminBannerEditPage />
      </TestProviders>
    );

    // API 요청 후 초기화가 될 때까지 기다림
    expect(await screen.findByPlaceholderText('배너명을 입력해 주세요')).toHaveValue(
      '테스트 배너 10'
    );
  });

  it('입력 필드의 값이 초기화되어 있다.', async () => {
    // 배너명
    expect(screen.getByPlaceholderText('배너명을 입력해 주세요')).toHaveValue('테스트 배너 10');

    // '모바일용 이미지'를 포함하는 div를 찾는다.
    const mobileImageField = screen.getByText('모바일용 이미지').closest('div')?.parentElement;
    if (!mobileImageField) throw new Error('mobileImageField not found');

    // 모바일용 이미지
    const imageSrc = within(mobileImageField).getByRole('img').getAttribute('src');
    expect(imageSrc).toMatch(/sample5_[A-Za-z0-9-_]+\.webp/);

    // 모바일용 이미지 링크
    const mobileLinkInput = within(mobileImageField).getByPlaceholderText('링크를 입력해 주세요');
    expect(mobileLinkInput).toHaveValue('https://naver.com');

    // 'PC용 이미지'를 포함하는 div를 찾는다.
    const pcImageField = screen.getByText('PC용 이미지').closest('div')?.parentElement;
    if (!pcImageField) throw new Error('pcImageField not found');

    // PC용 이미지
    const pcImageSrc = within(pcImageField).getByRole('img').getAttribute('src');
    expect(pcImageSrc).toMatch(/sample6_[A-Za-z0-9-_]+\.webp/);

    // PC용 이미지 링크
    const pcLinkInput = within(pcImageField).getByPlaceholderText('링크를 입력해 주세요');
    expect(pcLinkInput).toHaveValue('https://google.com');
  });

  describe('필수 값을 입력하지 않을 경우', () => {
    it('배너명을 입력하지 않고 제출 시 "배너명을 입력해 주세요" 메시지를 갖는 모달이 나타난다.', async () => {
      await user.clear(screen.getByPlaceholderText('배너명을 입력해 주세요'));

      await user.click(screen.getByRole('button', { name: '저장하기' }));

      const dialog = await screen.findByRole('dialog');
      expect(dialog).toHaveTextContent('배너명을 입력해 주세요');
    });
  });

  it('값을 수정하고 제출 시 "배너 수정 완료" 모달이 나타난다.', async () => {
    const bannerNameInput = screen.getByPlaceholderText('배너명을 입력해 주세요');
    await user.clear(bannerNameInput);
    await user.type(bannerNameInput, '배너명 수정');

    await user.click(screen.getByRole('button', { name: '저장하기' }));

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveTextContent('배너 수정 완료');
  });
});
