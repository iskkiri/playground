import { nanoid } from 'nanoid';

export function generateUniqueFilename(originalFileName: string) {
  const extension = originalFileName.split('.').pop();
  const fileNameWithoutExtension = originalFileName.replace(`.${extension}`, ''); // 확장자 제외한 파일명
  const uniqueId = nanoid();

  return `${fileNameWithoutExtension}_${uniqueId}.${extension}`;
}
