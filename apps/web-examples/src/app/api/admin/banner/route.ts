import { BadRequestException, HttpException } from '@/_shared/httpException';
import bannerService from '@/app/(admin)/_features/banner/services/banner.service';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * @method GET
 * @url /api/admin/banner
 * @description 배너 목록 조회
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

    const result = await bannerService.getBannerList({
      page,
      pageSize,
      isShow,
      searchType,
      keyword,
    });

    return NextResponse.json(result);
  } catch (err) {
    return HttpException.handler(err);
  }
}

/**
 * @method POST
 * @url /api/admin/banner
 * @description 배너 등록
 */
export async function POST(request: NextRequest) {
  try {
    const createNoticeRequestDto = await request.json();

    const result = await bannerService.createBanner(createNoticeRequestDto);

    return NextResponse.json(result);
  } catch (err) {
    return HttpException.handler(err);
  }
}

/**
 * @method DELETE
 * @url /api/admin/banner
 * @description 배너 다중 삭제
 */
export async function DELETE(request: NextRequest) {
  const { idList } = await request.json();

  if (!idList || idList.length === 0) {
    return HttpException.handler(new BadRequestException('idList is required'));
  }

  try {
    const result = await bannerService.deleteBanner(idList);

    return NextResponse.json(result);
  } catch (err) {
    return HttpException.handler(err);
  }
}

/**
 * @method PUT
 * @url /api/admin/banner
 * @description 배너 노출 설정 및 순서 변경
 */
export async function PUT(request: NextRequest) {
  const { idList } = await request.json();

  if (!idList || idList.length === 0) {
    return HttpException.handler(new BadRequestException('idList is required'));
  }

  try {
    const result = await bannerService.updateBannerOrder(idList);

    return NextResponse.json(result);
  } catch (err) {
    HttpException.handler(err);
  }
}
