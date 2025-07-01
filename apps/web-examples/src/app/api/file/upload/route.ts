import { BadRequestException, HttpException } from '@/_shared/httpException';
import { NextResponse, type NextRequest } from 'next/server';
import fileService from '@/_features/file/services/file.service';

/**
 *
 * @method POST
 * @url /api/file/upload
 * @description Upload file to S3
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const category = request.nextUrl.searchParams.get('category');
    if (!category) {
      throw new BadRequestException('카테고리가 존재하지 않습니다.');
    }

    const { fileUrl } = await fileService.uploadToS3({ formData, category });

    return NextResponse.json({ fileUrl });
  } catch (err) {
    return HttpException.handler(err);
  }
}
