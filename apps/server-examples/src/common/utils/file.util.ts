import { BadRequestException } from '@nestjs/common';
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

/**
 * 파일 검증 옵션
 */
export interface FileValidationOptions {
  /** 허용된 MIME 타입 목록 (선택) */
  allowedMimeTypes?: string[];
  /** 최대 파일 크기 (바이트, 선택) */
  maxSize?: number;
  /** 커스텀 에러 메시지 */
  errorMessages?: {
    invalidType?: string;
    oversized?: string;
  };
}

/**
 * 파일 유효성 검증
 * @param file - 검증할 파일
 * @param options - 검증 옵션
 * @throws BadRequestException - 파일 형식이나 크기가 유효하지 않은 경우
 * @example
 * // MIME 타입과 크기 모두 검증
 * validateFile(file, {
 *   allowedMimeTypes: ['image/jpeg', 'image/png'],
 *   maxSize: 5 * 1024 * 1024, // 5MB
 * })
 *
 * // 크기만 검증
 * validateFile(file, {
 *   maxSize: 10 * 1024 * 1024, // 10MB
 * })
 *
 * // MIME 타입만 검증
 * validateFile(file, {
 *   allowedMimeTypes: ['application/pdf'],
 * })
 */
export function validateFile(file: Express.Multer.File, options: FileValidationOptions): void {
  const { allowedMimeTypes, maxSize, errorMessages } = options;

  // MIME 타입 검증 (옵션이 제공된 경우에만)
  if (allowedMimeTypes && !allowedMimeTypes.includes(file.mimetype)) {
    throw new BadRequestException(
      errorMessages?.invalidType || `허용되지 않는 파일 형식입니다. 허용 형식: ${allowedMimeTypes.join(', ')}`
    );
  }

  // 파일 크기 검증 (옵션이 제공된 경우에만)
  if (maxSize !== undefined && file.size > maxSize) {
    const maxSizeMB = (maxSize / 1024 / 1024).toFixed(0);
    throw new BadRequestException(
      errorMessages?.oversized || `파일 크기는 ${maxSizeMB}MB를 초과할 수 없습니다.`
    );
  }
}
