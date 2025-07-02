import { BadRequestException, HttpException } from '@/_shared/httpException';
import type { UpdateNoticeRequestDto } from '@/app/(admin)/_features/notice/api/dtos/updateNotice.dto';
import noticeService from '@/app/(admin)/_features/notice/services/notice.service';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * @method GET
 * @url /api/admin/notice/[id]
 * @description 공지사항 상세 조회
 */
export async function GET(_request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  if (!id) {
    return HttpException.apiHandler(new BadRequestException('id is required'));
  }

  try {
    const result = await noticeService.getNoticeDetail(id);

    return NextResponse.json(result);
  } catch (err) {
    HttpException.apiHandler(err);
  }
}

/**
 * @method PUT
 * @url /api/admin/notice/[id]
 * @description 공지사항 수정
 */
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  if (!id) {
    return HttpException.apiHandler(new BadRequestException('id is required'));
  }

  try {
    const updateNoticeRequestDto = (await request.json()) as Omit<UpdateNoticeRequestDto, 'id'>;

    const result = await noticeService.updateNotice({ id, ...updateNoticeRequestDto });

    return NextResponse.json(result);
  } catch (err) {
    return HttpException.apiHandler(err);
  }
}
