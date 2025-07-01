import TestProviders from '@/__tests__/utils/TestProviders';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useParams } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NoticeEditPage from '../[id]/edit/page';

describe('공지사항 수정', () => {
  const user = userEvent.setup();

  beforeEach(async () => {
    vi.mocked(useParams).mockReturnValue({ id: '100' });

    render(
      <TestProviders>
        <NoticeEditPage />
      </TestProviders>
    );

    // API 요청 후 폼 초기화가 될 때까지 기다림
    const fileList = await screen.findAllByRole('listitem');
    expect(fileList).toHaveLength(2);
  });

  it('입력 필드의 값이 초기화되어 있다.', async () => {
    // 노출 설정
    expect(screen.getByRole('radio', { name: '숨김' })).toBeChecked();

    // 제목
    expect(screen.getByPlaceholderText('제목을 입력해 주세요')).toHaveValue('테스트 공지사항 100');

    // 파일
    const fileList = screen.getAllByRole('listitem');
    expect(fileList).toHaveLength(2);
    expect(fileList[0]).toHaveTextContent('sample1.png');
    expect(fileList[1]).toHaveTextContent('sample3.png');

    // 썸네일
    const imageSrc = screen.getByRole('img').getAttribute('src');
    expect(imageSrc).toMatch(/sample3_[A-Za-z0-9-_]+\.webp/);

    // 내용
    expect(await screen.findByRole('textbox', { name: /리치 텍스트 편집기/ })).toHaveTextContent(
      '이것은 100번째 테스트 공지사항입니다.'
    );
  });

  describe('필수 값을 입력하지 않을 경우', () => {
    it('제목을 입력하지 않고 제출 시 "제목을 입력해 주세요" 메시지를 갖는 모달이 나타난다.', async () => {
      const titleInput = screen.getByPlaceholderText('제목을 입력해 주세요');
      await user.clear(titleInput);

      await user.click(screen.getByRole('button', { name: '저장하기' }));

      const dialog = await screen.findByRole('dialog');
      expect(dialog).toHaveTextContent('제목을 입력해 주세요');
    });

    it('내용을 입력하지 않고 제출 시 "내용을 입력해 주세요" 메시지를 갖는 모달이 나타난다.', async () => {
      const contentInput = await screen.findByRole('textbox', { name: /리치 텍스트 편집기/ });
      await user.clear(contentInput);

      await user.click(screen.getByRole('button', { name: '저장하기' }));

      const dialog = await screen.findByRole('dialog');
      expect(dialog).toHaveTextContent('내용을 입력해 주세요');
    });
  });

  it('값을 수정하고 제출 시 "공지사항 수정 완료" alert 메시지가 나타난다.', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const titleInput = screen.getByPlaceholderText('제목을 입력해 주세요');
    await user.clear(titleInput);
    await user.type(titleInput, '제목 수정');

    await user.click(screen.getByRole('button', { name: '저장하기' }));

    // alert가 호출되었는지 확인
    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith('공지사항 수정 완료');
  });
});
