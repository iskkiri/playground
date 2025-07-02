import { BadRequestException } from '@/_shared/httpException';
import fileService from '@/_features/file/services/file.service';
import { NextResponse, type NextRequest } from 'next/server';

/**
 *
 * @method GET
 * @url /api/file/download
 * @description Download file from S3
 */

export async function GET(req: NextRequest) {
  try {
    const url = req?.nextUrl.searchParams.get('url');
    if (!url) {
      return BadRequestException.apiHandler('파일 URL을 입력해주세요.');
    }

    const { blob, arrayBuffer } = await fileService.downloadFromS3(url);

    return NextResponse.json({
      type: blob.type,
      arrayBuffer: Object.values(new Uint8Array(arrayBuffer)),
    });
  } catch (_err) {
    return BadRequestException.apiHandler('파일 다운로드에 실패했습니다.');
  }
}
