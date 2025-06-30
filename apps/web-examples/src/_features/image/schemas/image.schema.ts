import { z } from 'zod';

/**
 * @param message 에러 메시지
 */
export const getOptionalImageSchema = (message?: string) =>
  z
    .object(
      {
        file: z.instanceof(File).optional(),
        blobImage: z.string().optional(),
        storageImage: z.string().optional(), // 스토리지에 저장된 이미지 (ex. S3)
      },
      { message }
    )
    .optional();
export const optionalImageSchema = getOptionalImageSchema();
export type ImageSchema = z.infer<typeof optionalImageSchema>;

// 생성을 할 때와 수정을 할 때의 조건이 다름
export const getRequiredImageSchema = (message?: string) =>
  optionalImageSchema.refine(
    (data) => {
      /**
       * 수정/편집/업데이트
       * 스토리지(s3)에 저장된 이미지가 존재할 경우 = data.storageImage 가 존재할 경우
       * => file과 blobImage는 선택사항
       */
      if (data?.storageImage) return true;

      /**
       * 생성
       * 스토리지(s3)에 저장된 이미지가 존재하지 않을 경우
       * => file과 blobImage는 필수
       */
      return !!(data?.file && data?.blobImage);
    },
    { message }
  );

export const requiredImageSchema = getRequiredImageSchema();
