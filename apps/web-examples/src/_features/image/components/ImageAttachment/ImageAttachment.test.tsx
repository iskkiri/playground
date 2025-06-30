import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestProviders from '@/__tests__/utils/TestProviders';
import userEvent from '@testing-library/user-event';
import ImageAttachment from './ImageAttachment';
import useInsertImage from '../../hooks/useInsertImage';
import { useForm } from 'react-hook-form';
import type { ImageSchema } from '../../schemas/image.schema';

function TestWrapper() {
  const { setValue, watch } = useForm<{ thumbnail: ImageSchema }>({
    defaultValues: { thumbnail: {} },
  });

  const { insertedImageObj, onInsertImage, onRemoveImage } = useInsertImage({
    name: 'thumbnail',
    setValue,
    watch,
    storageImage: undefined,
    fileSizeLimit: 5,
  });

  return (
    <ImageAttachment
      insertedImageObj={insertedImageObj}
      onInsertImage={onInsertImage}
      onRemoveImage={onRemoveImage}
    />
  );
}

describe('이미지 업로드 및 제거', () => {
  const user = userEvent.setup();

  beforeEach(async () => {
    render(
      <TestProviders>
        <TestWrapper />
      </TestProviders>
    );

    const imageInput = screen.getByRole('button', { name: '이미지 첨부' });
    await user.click(imageInput);

    const image = new File([''], '썸네일.png', { type: 'image/png' });
    await user.upload(imageInput, image);
  });

  it('이미지 업로드 시 썸네일이 추가된다.', async () => {
    expect(await screen.findByText('썸네일.png')).toBeInTheDocument();
  });

  it('이미지를 중복으로 업로드 시 이미지가 교체된다.', async () => {
    const imageInput = screen.getByRole('button', { name: '이미지 첨부' });
    await user.click(imageInput);

    const image = new File([''], '교체 썸네일.png', { type: 'image/png' });
    await user.upload(imageInput, image);

    expect(await screen.findByText('교체 썸네일.png')).toBeInTheDocument();
  });

  it('이미지 제거 시 썸네일이 제거된다.', async () => {
    const imageRemoveButton = screen.getByRole('button', { name: '이미지 제거' });
    await user.click(imageRemoveButton);

    expect(screen.queryByAltText('업로드된 이미지: 썸네일.png')).not.toBeInTheDocument();
  });
});
