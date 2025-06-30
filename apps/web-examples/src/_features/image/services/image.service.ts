import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { generateUniqueFilename } from '@repo/utils/generateUniqueFilename';
import type { UploadImageResponseDto } from '../api/dtos/uploadImage.dto';
import { appEnv } from '@/_schemas/env.schema';
import sharp from 'sharp';
import type {
  ImageOptimizationOptions,
  OptimizedImageResult,
  UploadToS3Params,
} from '../types/image.types';

class ImageService {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: appEnv.AWS_REGION,
      credentials: {
        accessKeyId: appEnv.AWS_ACCESS_KEY_ID,
        secretAccessKey: appEnv.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  /**
   * @description 이미지 업로드
   * @param buffer - 이미지 버퍼
   * @param filename - 이미지 파일명
   * @param category - 이미지 카테고리
   * @returns 업로드된 이미지 URL
   */
  async uploadToS3({
    buffer,
    filename,
    category,
  }: UploadToS3Params): Promise<UploadImageResponseDto> {
    const uniqueFilename = generateUniqueFilename(filename);

    await this.s3.send(
      new PutObjectCommand({
        Bucket: appEnv.AWS_BUCKET_NAME,
        Key: `${category}/${uniqueFilename}`,
        Body: buffer,
        // ContentType: file.type,
      })
    );

    return { imageUrl: `${appEnv.CLOUDFRONT_URL}/${category}/${uniqueFilename}` };
  }

  /**
   * @description 이미지 최적화
   * @param file - 원본 파일 (File 또는 Buffer)
   * @param options - 최적화 옵션
   * @returns 최적화된 이미지 정보
   */
  async optimizeImage(
    file: File | Buffer,
    options: ImageOptimizationOptions = {}
  ): Promise<OptimizedImageResult> {
    const { quality = 80, maxWidth = 1920, maxHeight = 1080, format = 'webp' } = options;

    // 파일을 Buffer로 변환
    const isBuffer = (file: File | Buffer): file is Buffer => file instanceof Buffer;
    const inputBuffer = isBuffer(file) ? file : Buffer.from(await file.arrayBuffer());
    const originalSize = inputBuffer.length;

    // Sharp 인스턴스 생성
    let sharpInstance = sharp(inputBuffer);

    // 이미지 메타데이터 가져오기
    const metadata = await sharpInstance.metadata();
    console.log('원본 이미지 정보:', {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: `${(originalSize / 1024 / 1024).toFixed(2)}MB`,
    });

    // 리사이징 (비율 유지)
    if (metadata.width && metadata.height) {
      if (metadata.width > maxWidth || metadata.height > maxHeight) {
        sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
          fit: 'inside', // 'inside' - 비율 유지하며 안에 맞춤
          withoutEnlargement: true, // 원본 이미지보다 크게 리사이징하지 않음
        });
        console.log(`이미지 리사이징: 최대 ${maxWidth}x${maxHeight}`);
      }
    }

    // 포맷 변환 및 품질 설정
    let optimizedBuffer: Buffer;
    let contentType: string;
    let extension: string;

    switch (format) {
      case 'webp':
        optimizedBuffer = await sharpInstance.webp({ quality, effort: 6 }).toBuffer();
        contentType = 'image/webp';
        extension = 'webp';
        break;

      case 'jpeg':
        optimizedBuffer = await sharpInstance.jpeg({ quality, progressive: true }).toBuffer();
        contentType = 'image/jpeg';
        extension = 'jpg';
        break;

      case 'png':
        optimizedBuffer = await sharpInstance.png({ quality, progressive: true }).toBuffer();
        contentType = 'image/png';
        extension = 'png';
        break;

      default:
        throw new Error(`지원하지 않는 포맷: ${format}`);
    }

    const optimizedSize = optimizedBuffer.length;
    const compressionRatio = ((originalSize - optimizedSize) / originalSize) * 100;

    // 원본 파일명에서 확장자 제거하고 새 확장자 추가
    const originalFilename = file instanceof File ? file.name : 'image';
    const fileNameWithoutExtension = originalFilename.replace(/\.[^/.]+$/, '');
    const filename = `${fileNameWithoutExtension}.${extension}`;

    console.log('최적화 결과:', {
      originalSize: `${(originalSize / 1024 / 1024).toFixed(2)}MB`,
      optimizedSize: `${(optimizedSize / 1024 / 1024).toFixed(2)}MB`,
      compressionRatio: `${compressionRatio.toFixed(1)}%`,
      format: format.toUpperCase(),
    });

    return {
      buffer: optimizedBuffer,
      filename,
      contentType,
      originalSize,
      optimizedSize,
      compressionRatio,
    };
  }
}

const imageService = new ImageService();
export default imageService;
