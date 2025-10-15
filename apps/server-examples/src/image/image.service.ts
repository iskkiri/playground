import { Injectable, BadRequestException, Inject, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { appConfig } from '../common/config/app.config';
import { generateUniqueFileKey, extractKeyFromUrl } from '../common/utils/file.util';
import { ImageOptimizationOptions, OptimizedImageResult } from './types/image-optimization.types';
import { UploadImageResponseDto } from './dtos/upload-image.dto';
import { SuccessResponseDto } from '@/common/dtos/success.dto';

@Injectable()
export class ImageService {
  private readonly logger = new Logger(ImageService.name);
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly cloudFrontUrl: string;

  constructor(@Inject(appConfig.KEY) private readonly config: ConfigType<typeof appConfig>) {
    this.bucketName = this.config.awsBucketName;
    this.cloudFrontUrl = this.config.cloudFrontUrl;

    this.s3Client = new S3Client({
      region: this.config.awsRegion,
      credentials: {
        accessKeyId: this.config.awsAccessKeyId,
        secretAccessKey: this.config.awsSecretAccessKey,
      },
    });
  }

  /**
   * 이미지 업로드
   * @param file - 업로드할 이미지 파일
   * @param category - 이미지 카테고리 (선택)
   * @returns 업로드된 이미지 URL과 S3 키
   */
  async uploadImage(file: Express.Multer.File, category?: string): Promise<UploadImageResponseDto> {
    // 이미지 최적화
    const optimized = await this.optimizeImage(file, {
      format: 'webp',
      quality: 80,
      maxWidth: 1920,
      maxHeight: 1080,
    });

    // 고유한 파일명 생성 (최적화된 확장자 사용)
    const key = generateUniqueFileKey(optimized.filename, category);

    // S3에 업로드
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: optimized.buffer,
      ContentType: optimized.contentType,
    });

    await this.s3Client.send(command);

    // CloudFront URL 생성
    const imageUrl = `${this.cloudFrontUrl}/${key}`;

    return new UploadImageResponseDto({ imageUrl });
  }

  /**
   * 이미지 삭제
   * @param imageUrl - 삭제할 이미지의 URL
   * @throws BadRequestException - URL에서 키 추출 실패시
   */
  async deleteImage(imageUrl: string): Promise<SuccessResponseDto> {
    const key = extractKeyFromUrl(imageUrl);

    if (!key) {
      throw new BadRequestException('유효하지 않은 이미지 URL입니다.');
    }

    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    await this.s3Client.send(command);

    return new SuccessResponseDto({ success: true });
  }

  /**
   * 이미지 최적화
   * @param file - 업로드된 파일 객체
   * @param options - 최적화 옵션
   * @returns 최적화된 이미지 정보
   */
  private async optimizeImage(
    file: Express.Multer.File,
    options: ImageOptimizationOptions = {}
  ): Promise<OptimizedImageResult> {
    const { quality = 80, maxWidth = 1920, maxHeight = 1080, format = 'webp' } = options;

    const originalSize = file.buffer.length;

    // Sharp 인스턴스 생성
    let sharpInstance = sharp(file.buffer);

    // 이미지 메타데이터 가져오기
    const metadata = await sharpInstance.metadata();
    this.logger.log('원본 이미지 정보:', {
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
        this.logger.log(`이미지 리사이징: 최대 ${maxWidth}x${maxHeight}`);
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
        throw new BadRequestException(`지원하지 않는 포맷: ${format}`);
    }

    const optimizedSize = optimizedBuffer.length;
    const compressionRatio = ((originalSize - optimizedSize) / originalSize) * 100;

    this.logger.log('최적화 결과:', {
      originalSize: `${(originalSize / 1024 / 1024).toFixed(2)}MB`,
      optimizedSize: `${(optimizedSize / 1024 / 1024).toFixed(2)}MB`,
      compressionRatio: `${compressionRatio.toFixed(1)}%`,
      format: format.toUpperCase(),
    });

    // 원본 파일명에서 확장자 제거 후 새 확장자 추가
    const fileNameWithoutExtension = file.originalname.replace(/\.[^/.]+$/, '');
    const filename = `${fileNameWithoutExtension}.${extension}`;

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
