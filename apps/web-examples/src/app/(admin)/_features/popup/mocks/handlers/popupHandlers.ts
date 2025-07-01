import { http } from 'msw';
import popupService from '../services/popup.service';
import type { MockCreatePopupRequestDto } from '../types/mockPopup.types';

export const adminPopupHandlers = [
  // 팝업 목록 조회
  http.get('/api/admin/popup', ({ request }) => {
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

    return popupService.getPopupList({
      page,
      pageSize,
      isShow,
      searchType,
      keyword,
    });
  }),

  // 팝업 상세 조회
  http.get('/api/admin/popup/:id', ({ params }) => {
    return popupService.getPopupDetail(Number(params.id));
  }),

  // 팝업 생성
  http.post('/api/admin/popup', async ({ request }) => {
    const body = (await request.json()) as MockCreatePopupRequestDto;

    return popupService.createPopup(body);
  }),

  // 팝업 노출 설정 및 순서 변경
  http.put('/api/admin/popup', async ({ request }) => {
    const body = (await request.json()) as { idList: number[] };

    return popupService.updatePopupOrder(body.idList);
  }),

  // 팝업 수정
  http.put('/api/admin/popup/:id', async ({ request, params }) => {
    const body = (await request.json()) as MockCreatePopupRequestDto;

    return popupService.updatePopup({
      id: Number(params.id),
      ...body,
    });
  }),

  // 팝업 삭제
  http.delete('/api/admin/popup', async ({ request }) => {
    const body = (await request.json()) as { idList: number[] };

    return popupService.deletePopup(body.idList);
  }),
];
