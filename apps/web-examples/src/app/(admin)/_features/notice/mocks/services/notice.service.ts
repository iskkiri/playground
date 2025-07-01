import db from '@/_mocks/db';
import { HttpResponse } from 'msw';
import type { QuerySelectorWhere } from '@mswjs/data/lib/query/queryTypes';
import type {
  MockCreateNoticeRequestDto,
  MockGetNoticeListRequestDto,
  MockNoticeListItemData,
  MockUpdateNoticeRequestDto,
} from '../types/mockNotice.types';
import type { MockPaginationResponseDto } from '@/_mocks/types/mock.types';
import { initializeMockNotice } from '../notice.db';

class NoticeService {
  // 공지사항 목록 조회
  getNoticeList({ page, pageSize, isShow, searchType, keyword }: MockGetNoticeListRequestDto) {
    const skip = (page - 1) * pageSize;
    const isSearchOrFilter = isShow !== undefined || (searchType === 'title' && keyword);

    const where = {
      ...(isShow !== undefined && {
        isShow: {
          equals: isShow,
        },
      }),
      ...(searchType === 'title' && {
        title: {
          contains: keyword,
        },
      }),
    } satisfies QuerySelectorWhere<MockNoticeListItemData>;

    const notices = db.notice.findMany({
      where,
      take: pageSize,
      skip,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalCount = db.notice.count();
    let searchCount = 0;
    if (isSearchOrFilter) {
      searchCount = db.notice.count({ where });
    }

    const totalPages = Math.ceil((isSearchOrFilter ? searchCount : totalCount) / pageSize);

    return HttpResponse.json({
      content: notices.map((notice) => ({
        id: notice.id,
        title: notice.title,
        createdAt: notice.createdAt,
        isShow: notice.isShow,
      })),
      currentPage: page,
      pageSize,
      totalElements: totalCount,
      totalPages,
      searchElements: searchCount,
      hasNext: page * pageSize < totalCount,
      hasPrevious: notices.length > 0 && page > 1,
    } satisfies MockPaginationResponseDto<MockNoticeListItemData>);
  }

  // 공지사항 상세 조회
  getNoticeDetail(id: number) {
    const notice = db.notice.findFirst({ where: { id: { equals: id } } });

    return HttpResponse.json(notice);
  }

  // 공지사항 생성
  createNotice(createNoticeRequestDto: MockCreateNoticeRequestDto) {
    const fileId =
      db.file.getAll().length > 0 ? Math.max(...db.file.getAll().map((file) => file.id)) + 1 : 1;
    const files = createNoticeRequestDto.files.map((file, index) =>
      db.file.create({
        id: fileId + index,
        fileName: file.fileName,
        fileUrl: file.fileUrl,
      })
    );

    const noticeId =
      db.notice.getAll().length > 0
        ? Math.max(...db.notice.getAll().map((notice) => notice.id)) + 1
        : 1;
    const createdNotice = db.notice.create({
      id: noticeId,
      title: createNoticeRequestDto.title,
      content: createNoticeRequestDto.content,
      isShow: createNoticeRequestDto.isShow,
      thumbnail: createNoticeRequestDto.thumbnail,
      files,
      createdAt: new Date().toISOString(),
    });

    return HttpResponse.json(createdNotice);
  }

  // 공지사항 수정
  updateNotice(updateNoticeRequestDto: MockUpdateNoticeRequestDto) {
    // 실제 업데이트 로직과는 상이
    const fileId =
      db.file.getAll().length > 0 ? Math.max(...db.file.getAll().map((file) => file.id)) + 1 : 1;
    const files = updateNoticeRequestDto.files.map((file, index) =>
      db.file.create({
        id: fileId + index,
        fileName: file.fileName,
        fileUrl: file.fileUrl,
      })
    );

    const updatedNotice = db.notice.update({
      where: {
        id: {
          equals: updateNoticeRequestDto.id,
        },
      },
      data: {
        title: updateNoticeRequestDto.title,
        content: updateNoticeRequestDto.content,
        isShow: updateNoticeRequestDto.isShow,
        thumbnail: updateNoticeRequestDto.thumbnail,
        files,
      },
    });

    return HttpResponse.json(updatedNotice);
  }

  // 공지사항 삭제
  deleteNotice(idList: number[]) {
    const deletedNotices = db.notice.deleteMany({
      where: {
        id: {
          in: idList,
        },
      },
    });
    const deletedIdList = deletedNotices?.map((notice) => notice.id);

    return HttpResponse.json(deletedIdList);
  }

  reset() {
    db.notice.deleteMany({ where: {} });
    initializeMockNotice(db);
  }
}

const noticeService = new NoticeService();
export default noticeService;
