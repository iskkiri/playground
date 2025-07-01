import { http } from 'msw';
import noticeService from '../services/notice.service';
import type { MockCreateNoticeRequestDto } from '../types/mockNotice.types';

export const noticeHandlers = [
  // 공지사항 목록 조회
  http.get('/api/admin/notice', ({ request }) => {
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

    return noticeService.getNoticeList({
      page,
      pageSize,
      isShow,
      searchType,
      keyword,
    });
  }),

  // 공지사항 상세 조회
  http.get('/api/admin/notice/:id', ({ params }) => {
    return noticeService.getNoticeDetail(Number(params.id));
  }),

  // 공지사항 생성
  http.post('/api/admin/notice', async ({ request }) => {
    const body = (await request.json()) as MockCreateNoticeRequestDto;

    return noticeService.createNotice(body);
  }),

  // 공지사항 수정
  http.put('/api/admin/notice/:id', async ({ request, params }) => {
    const body = (await request.json()) as MockCreateNoticeRequestDto;

    return noticeService.updateNotice({
      id: Number(params.id),
      ...body,
    });
  }),

  // 공지사항 삭제
  http.delete('/api/admin/notice', async ({ request }) => {
    const body = (await request.json()) as { idList: number[] };

    return noticeService.deleteNotice(body.idList);
  }),
];
