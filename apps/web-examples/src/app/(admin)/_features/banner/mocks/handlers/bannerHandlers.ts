import { http } from 'msw';
import bannerService from '../services/banner.service';
import type { MockCreateBannerRequestDto } from '../types/mockBanner.types';

export const bannerHandlers = [
  // 배너 목록 조회
  http.get('/api/admin/banner', ({ request }) => {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    // query parameters 얻기
    const pageParam = searchParams.get('page');
    const page = pageParam ? +pageParam : 1;

    const pageSizeParam = searchParams.get('pageSize');
    const pageSize = pageSizeParam ? +pageSizeParam : 10;

    const isShowParam = searchParams.get('isShow');
    const isShow = (() => {
      if (isShowParam === undefined) return undefined;
      if (isShowParam === 'true') return true;
      if (isShowParam === 'false') return false;
      return undefined;
    })();

    const searchTypeParam = searchParams.get('searchType');
    const searchType = searchTypeParam ? searchTypeParam : undefined;

    const keywordParam = searchParams.get('keyword');
    const keyword = keywordParam ? keywordParam : undefined;

    return bannerService.getBannerList({
      page,
      pageSize,
      isShow,
      searchType,
      keyword,
    });
  }),

  // 배너 상세 조회
  http.get('/api/admin/banner/:id', ({ params }) => {
    return bannerService.getBannerDetail(Number(params.id));
  }),

  // 배너 생성
  http.post('/api/admin/banner', async ({ request }) => {
    const body = (await request.json()) as MockCreateBannerRequestDto;

    return bannerService.createBanner(body);
  }),

  // 배너 수정
  http.put('/api/admin/banner/:id', async ({ request, params }) => {
    const body = (await request.json()) as MockCreateBannerRequestDto;

    return bannerService.updateBanner({
      id: Number(params.id),
      ...body,
    });
  }),

  // 배너 삭제
  http.delete('/api/admin/banner', async ({ request }) => {
    const body = (await request.json()) as { idList: number[] };

    return bannerService.deleteBanner(body.idList);
  }),

  // 배너 노출 설정 및 순서 변경
  http.put('/api/admin/banner', async ({ request }) => {
    const body = (await request.json()) as { idList: number[] };

    return bannerService.updateBannerOrder(body.idList);
  }),
];
