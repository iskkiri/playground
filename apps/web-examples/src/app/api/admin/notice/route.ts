import { BadRequestException, HttpException } from '@/_shared/httpException';
import noticeService from '@/app/(admin)/_features/notice/services/notice.service';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * @method GET
 * @url /api/admin/notice
 * @description 공지사항 목록 조회
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const pageParam = searchParams.get('page');
    const page = pageParam ? +pageParam : 1;

    const pageSizeParam = searchParams.get('pageSize');
    const pageSize = pageSizeParam ? +pageSizeParam : 10;

    const isShowParam = searchParams.get('isShow');
    const isShow = (() => {
      if (isShowParam === 'true') return true;
      if (isShowParam === 'false') return false;
      return undefined;
    })();

    const searchTypeParam = searchParams.get('searchType');
    const searchType = searchTypeParam ? searchTypeParam : undefined;

    const keywordParam = searchParams.get('keyword');
    const keyword = keywordParam ? keywordParam : undefined;

    const result = await noticeService.getNoticeList({
      page,
      pageSize,
      isShow,
      searchType,
      keyword,
    });

    return NextResponse.json(result);
  } catch (err) {
    return HttpException.apiHandler(err);
  }
}

/**
 * @method POST
 * @url /api/admin/notice
 * @description 공지사항 등록
 */
export async function POST(request: NextRequest) {
  try {
    const createNoticeRequestDto = await request.json();

    const result = await noticeService.createNotice(createNoticeRequestDto);

    return NextResponse.json(result);
  } catch (err) {
    return HttpException.apiHandler(err);
  }
}

/**
 * @method DELETE
 * @url /api/admin/notice
 * @description 공지사항 다중 삭제
 */
export async function DELETE(request: NextRequest) {
  const { idList } = await request.json();

  if (!idList || idList.length === 0) {
    return HttpException.apiHandler(new BadRequestException('idList is required'));
  }

  try {
    const result = await noticeService.deleteNotice(idList);

    return NextResponse.json(result);
  } catch (err) {
    return HttpException.apiHandler(err);
  }
}
