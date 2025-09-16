import { nextClient } from '@/_api/next-client';
import type { UploadImageRequestDto, UploadImageResponseDto } from './dtos/uploadImage.dto';

/**
 * @Common
 * @description 이미지 업로드
 * @param formData - 이미지 파일
 * @param category - s3 이미지 관리를 위해서 나눈 폴더 개념
 */
export async function uploadImageApi({ formData, category }: UploadImageRequestDto) {
  const { data } = await nextClient.post<UploadImageResponseDto>('/image/upload', formData, {
    params: {
      category,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data.imageUrl;
}
