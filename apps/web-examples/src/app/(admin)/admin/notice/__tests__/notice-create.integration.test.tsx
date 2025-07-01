import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import TestProviders from '@/__tests__/utils/TestProviders';
import userEvent from '@testing-library/user-event';
import NoticeCreatePage from '../create/page';
import { mockRouter } from '@/__tests__/setup';
import React from 'react';
import noticeService from '@/app/(admin)/_features/notice/mocks/services/notice.service';

describe('공지사항 생성', () => {
  const user = userEvent.setup();

  beforeEach(async () => {
    render(
      <TestProviders>
        <NoticeCreatePage />
      </TestProviders>
    );
  });

  describe('필수 값을 입력하지 않은 경우', () => {
    it('제목을 입력하지 않고 제출 시 "제목을 입력해 주세요" 메시지를 갖는 모달이 나타난다.', async () => {
      await user.click(screen.getByRole('button', { name: '저장하기' }));

      const modal = await screen.findByRole('dialog');
      expect(modal).toHaveTextContent('제목을 입력해 주세요');
    });

    it('내용을 입력하지 않고 제출 시 "내용을 입력해 주세요" 메시지를 갖는 모달이 나타난다.', async () => {
      const titleInput = screen.getByPlaceholderText('제목을 입력해 주세요');
      await user.type(titleInput, '제목');

      await user.click(screen.getByRole('button', { name: '저장하기' }));

      const modal = await screen.findByRole('dialog');
      expect(modal).toHaveTextContent('내용을 입력해 주세요');
    });

    it('썸네일을 업로드하지 않고 제출 시 "썸네일을 업로드해 주세요" 메시지를 갖는 모달이 나타난다.', async () => {
      const titleInput = screen.getByPlaceholderText('제목을 입력해 주세요');
      await user.type(titleInput, '제목');

      // dynamic import 때문에 비동기로 처리해야함
      const contentInput = await screen.findByRole('textbox', { name: /리치 텍스트 편집기/ });
      await user.type(contentInput, '내용');

      await user.click(screen.getByRole('button', { name: '저장하기' }));

      const modal = await screen.findByRole('dialog');
      expect(modal).toHaveTextContent('썸네일을 업로드해 주세요');
    });
  });

  describe('필수값을 입력한 경우', () => {
    beforeEach(async () => {
      const titleInput = screen.getByPlaceholderText('제목을 입력해 주세요');
      await user.type(titleInput, '제목');

      // dynamic import 때문에 비동기로 처리해야함
      const contentInput = await screen.findByRole('textbox', { name: /리치 텍스트 편집기/ });
      await user.type(contentInput, '내용');

      const thumbnailAttachment = screen.getByLabelText('이미지 첨부');
      await user.upload(
        thumbnailAttachment,
        new File(['thumbnail'], '썸네일.png', { type: 'image/png' })
      );
    });

    afterEach(() => {
      noticeService.reset();
    });

    it('제목, 내용을 입력하고, 썸네일을 첨부해서 제출 시 공지사항이 생성된다.', async () => {
      await user.click(screen.getByRole('button', { name: '저장하기' }));

      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith(`/admin/notice/102/edit`);
      });
    });

    it('제목, 내용을 입력하고, 썸네일, 파일을 첨부해서 제출 시 공지사항이 생성된다.', async () => {
      const fileInput = screen.getByLabelText('파일 첨부');
      await user.upload(fileInput, new File(['file'], 'file.png', { type: 'image/png' }));

      await user.click(screen.getByRole('button', { name: '저장하기' }));

      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith(`/admin/notice/102/edit`);
      });
    });
  });

  it('취소 버튼을 클릭하면 페이지 뒤로 이동한다.', async () => {
    const goBackButton = screen.getByRole('button', { name: '취소' });
    await user.click(goBackButton);

    expect(mockRouter.back).toHaveBeenCalled();
  });
});
