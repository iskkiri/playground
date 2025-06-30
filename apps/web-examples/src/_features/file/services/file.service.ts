import { DeleteObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { generateUniqueFilename } from '@repo/utils/generateUniqueFilename';
import type { UploadFileRequestDto, UploadFileResponseDto } from '../api/dtos/uploadFile.dto';
import { appEnv } from '@/_schemas/env.schema';

class FileService {
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

  async uploadToS3({ formData, category }: UploadFileRequestDto): Promise<UploadFileResponseDto> {
    const files = formData.getAll('file') as File[];
    const file = files[0];
    const filename = generateUniqueFilename(file.name);
    const Body = Buffer.from(await file.arrayBuffer());

    await this.s3.send(
      new PutObjectCommand({
        Bucket: appEnv.AWS_BUCKET_NAME,
        Key: `${category}/${filename}`,
        Body,
      })
    );

    return { fileUrl: `${appEnv.CLOUDFRONT_URL}/${category}/${filename}` };
  }

  async downloadFromS3(url: string) {
    const data = await fetch(url);
    const blob = await data.blob();
    const arrayBuffer = await blob.arrayBuffer();

    return { blob, arrayBuffer };
  }

  async deleteFiles(filenames: string[]) {
    await this.s3.send(
      new DeleteObjectsCommand({
        Bucket: appEnv.AWS_BUCKET_NAME,
        Delete: {
          Objects: filenames.map((filename) => ({ Key: filename })),
        },
      })
    );

    return { message: '파일이 성공적으로 삭제되었습니다.' };
  }
}

const fileService = new FileService();
export default fileService;
