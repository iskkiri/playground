import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import TestProviders from '@/__tests__/utils/TestProviders';
import userEvent from '@testing-library/user-event';
import MultipleFileAttachment from './MultipleFileAttachment';
import useInsertFiles from '../../hooks/useInsertFiles';
import { useFieldArray, useForm } from 'react-hook-form';
import type { FileSchema } from '../../schemas/file.schema';

function TestWrapper() {
  const { control } = useForm<{ files: FileSchema[] }>({
    defaultValues: { files: [] },
  });
  const { fields, append, remove } = useFieldArray({ name: 'files', control });
  const { onInsertFiles, onRemoveFile } = useInsertFiles({ append, remove });

  return (
    <MultipleFileAttachment
      fields={fields}
      onInsertFiles={onInsertFiles}
      onRemoveFile={onRemoveFile}
    />
  );
}

describe('파일 업로드 및 제거', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    render(
      <TestProviders>
        <TestWrapper />
      </TestProviders>
    );
  });

  describe('한 번에 여러 개 파일 업로드', () => {
    beforeEach(async () => {
      const fileInput = screen.getByRole('button', { name: '파일 첨부' });
      await user.click(fileInput);

      const file1 = new File([''], 'file1.png', { type: 'image/png' });
      const file2 = new File([''], 'file2.png', { type: 'image/png' });
      await user.upload(fileInput, [file1, file2]);
    });

    it('파일을 여러 개 업로드 시 파일 목록에 추가된다.', async () => {
      expect(await screen.findByText('file1.png')).toBeInTheDocument();
      expect(await screen.findByText('file2.png')).toBeInTheDocument();
    });

    it('파일을 제거 시 파일 목록에서 제거된다.', async () => {
      const fileRemoveButton = screen.getAllByRole('button', { name: '파일 제거' })[0];
      await user.click(fileRemoveButton);

      await waitFor(() => {
        expect(screen.queryByText('file1.png')).not.toBeInTheDocument();
        expect(screen.queryByText('file2.png')).toBeInTheDocument();
      });
    });
  });

  it('파일을 여러 번 나눠서 업로드 시 파일 목록에 추가된다.', async () => {
    // 첫 번째 파일 업로드
    const file1 = new File(['content1'], 'file1.png', { type: 'image/png' });
    const fileInput = screen.getByRole('button', { name: '파일 첨부' });

    await userEvent.upload(fileInput, file1);
    expect(await screen.findByText('file1.png')).toBeInTheDocument();

    // 두 번째 파일 업로드
    const file2 = new File(['content2'], 'file2.png', { type: 'image/png' });

    // 컴포넌트가 re-render된 후 새로운 입력 요소 찾기
    const newFileInput = screen.getByRole('button', { name: '파일 첨부' });
    await userEvent.upload(newFileInput, file2);

    // 두 파일 모두 존재하는지 확인
    expect(screen.getByText('file1.png')).toBeInTheDocument();
    expect(screen.getByText('file2.png')).toBeInTheDocument();
  });
});
