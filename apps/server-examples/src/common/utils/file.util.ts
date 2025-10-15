import { nanoid } from 'nanoid';

/**
 * 고유한 파일 키 생성
 * @param originalName - 원본 파일명
 * @param category - 카테고리 (선택, 미지정시 'files' 사용)
 * @returns 저장용 파일 키 (형식: {category}/{fileNameWithoutExtension}_{nanoid}.{extension})
 * @example
 * generateUniqueFileKey('my-photo.jpg', 'profile')
 * // => 'profile/my-photo_V1StGXR8_Z5jdHi.jpg'
 */
export function generateUniqueFileKey(originalName: string, category?: string): string {
  const extension = originalName.split('.').pop();
  const fileNameWithoutExtension = originalName.replace(`.${extension}`, '');
  const uniqueId = nanoid();
  const basePath = category || 'files';
  return `${basePath}/${fileNameWithoutExtension}_${uniqueId}.${extension}`;
}

/**
 * URL에서 파일 키 추출
 * @param fileUrl - 파일 URL
 * @returns 파일 키 (추출 실패시 null)
 * @example
 * extractKeyFromUrl('https://xxx.cloudfront.net/images/photo_abc.jpg')
 * // => 'images/photo_abc.jpg'
 */
export function extractKeyFromUrl(fileUrl: string): string | null {
  try {
    const url = new URL(fileUrl);
    // URL에서 경로 추출 (첫 번째 '/' 제거)
    return url.pathname.substring(1);
  } catch {
    return null;
  }
}
