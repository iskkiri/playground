import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

export interface FileValidationOptions {
  /** 허용된 MIME 타입 목록 */
  allowedMimeTypes?: string[];
  /** 최대 파일 크기 (바이트) */
  maxSize?: number;
  /** 필수 파일 여부 */
  required?: boolean;
  /** 커스텀 에러 메시지 */
  errorMessages?: {
    required?: string;
    invalidType?: string;
    oversized?: string;
  };
}

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(private readonly options: FileValidationOptions = {}) {}

  transform(file: Express.Multer.File): Express.Multer.File {
    const { allowedMimeTypes, maxSize, required = true, errorMessages = {} } = this.options;

    // 파일 필수 여부 검증
    if (required && !file) {
      throw new BadRequestException(errorMessages.required || '파일이 제공되지 않았습니다.');
    }

    // 파일이 없고 필수가 아닌 경우 통과
    if (!file && !required) {
      return file;
    }

    // MIME 타입 검증
    if (allowedMimeTypes && !allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        errorMessages.invalidType ||
          `허용되지 않는 파일 형식입니다. 허용 형식: ${allowedMimeTypes.join(', ')}`
      );
    }

    // 파일 크기 검증
    if (maxSize !== undefined && file.size > maxSize) {
      const maxSizeMB = (maxSize / 1024 / 1024).toFixed(0);
      throw new BadRequestException(
        errorMessages.oversized || `파일 크기는 ${maxSizeMB}MB를 초과할 수 없습니다.`
      );
    }

    return file;
  }
}

// 이미지 파일 검증 옵션
export interface ImageValidationOptions {
  /** 최대 파일 크기 (바이트) */
  maxSize?: number;
  /** 허용할 특정 이미지 형식 (미지정시 모든 이미지 형식 허용) */
  allowedImageTypes?: string[];
  /** 필수 파일 여부 */
  required?: boolean;
  /** 커스텀 에러 메시지 */
  errorMessages?: {
    required?: string;
    invalidType?: string;
    oversized?: string;
  };
}

// 설정 가능한 이미지 파일 전용 파이프
@Injectable()
export class ImageValidationPipe implements PipeTransform {
  private readonly options: Required<ImageValidationOptions>;

  constructor(options: ImageValidationOptions = {}) {
    this.options = {
      maxSize: options.maxSize ?? 5 * 1024 * 1024, // 기본 5MB
      allowedImageTypes: options.allowedImageTypes ?? [], // 빈 배열이면 모든 이미지 허용
      required: options.required ?? true,
      errorMessages: {
        required: options.errorMessages?.required ?? '이미지 파일이 제공되지 않았습니다.',
        invalidType: options.errorMessages?.invalidType ?? '이미지 파일만 업로드 가능합니다.',
        oversized: options.errorMessages?.oversized ?? '파일 크기가 너무 큽니다.',
        ...options.errorMessages,
      },
    };
  }

  transform(file: Express.Multer.File): Express.Multer.File {
    // 파일 필수 여부 검증
    if (this.options.required && !file) {
      throw new BadRequestException(this.options.errorMessages.required);
    }

    // 파일이 없고 필수가 아닌 경우 통과
    if (!file && !this.options.required) {
      return file;
    }

    // 이미지 MIME 타입 검증
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException(
        `${this.options.errorMessages.invalidType} 현재 파일 타입: ${file.mimetype}`
      );
    }

    // 특정 이미지 형식 제한이 있는 경우 추가 검증
    if (this.options.allowedImageTypes.length > 0) {
      if (!this.options.allowedImageTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          `허용되지 않는 이미지 형식입니다. 허용 형식: ${this.options.allowedImageTypes.join(', ')}`
        );
      }
    }

    // 파일 크기 검증
    if (file.size > this.options.maxSize) {
      const maxSizeMB = (this.options.maxSize / 1024 / 1024).toFixed(0);
      const errorMessage =
        this.options.errorMessages.oversized?.replace('{maxSize}', maxSizeMB) ||
        `파일 크기는 ${maxSizeMB}MB를 초과할 수 없습니다.`;
      throw new BadRequestException(errorMessage);
    }

    return file;
  }
}

// 편의를 위한 사전 정의된 파이프들
export class AllImagesValidationPipe extends ImageValidationPipe {
  constructor(maxSize?: number) {
    super({
      maxSize: maxSize ?? 5 * 1024 * 1024,
      allowedImageTypes: [], // 모든 이미지 허용
      errorMessages: {
        invalidType: '이미지 파일만 업로드 가능합니다.',
        oversized: `이미지 파일 크기는 ${maxSize}MB를 초과할 수 없습니다.`,
      },
    });
  }
}
