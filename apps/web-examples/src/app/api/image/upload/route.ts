import imageService from '@/_features/image/services/image.service';
import { BadRequestException, HttpException } from '@/_shared/httpException';
import { NextResponse, type NextRequest } from 'next/server';

/**
 *
 * @method POST
 * @url /api/image/upload
 * @description Upload image to S3
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const category = request.nextUrl.searchParams.get('category');
    if (!category) {
      throw new BadRequestException('카테고리가 존재하지 않습니다.');
    }

    const file = formData.get('file') as File;
    if (!file) {
      throw new BadRequestException('이미지 파일이 없습니다.');
    }

    // 파일 유효성 검사
    if (!file.type.startsWith('image/')) {
      throw new BadRequestException('이미지 파일만 업로드 가능합니다.');
    }

    // 파일 크기 제한 (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('파일 크기는 10MB 이하여야 합니다.');
    }

    const optimizedImage = await imageService.optimizeImage(file);

    const { imageUrl } = await imageService.uploadToS3({
      // buffer: Buffer.from(await file.arrayBuffer()),
      // filename: file.name,
      buffer: optimizedImage.buffer,
      filename: optimizedImage.filename,
      category,
    });

    return NextResponse.json({ imageUrl });
  } catch (err) {
    return HttpException.apiHandler(err);
  }
}
