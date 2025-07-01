import db from '@/_mocks/db';
import { HttpResponse } from 'msw';
import type {
  MockCreatePopupRequestDto,
  MockGetPopupListRequestDto,
  MockPopupListItemData,
  MockUpdatePopupRequestDto,
} from '../types/mockPopup.types';
import type { QuerySelectorWhere } from '@mswjs/data/lib/query/queryTypes';
import { initializeMockAdminPopup } from '../popup.db';

class PopupService {
  // 팝업 목록 조회
  getPopupList({ page, pageSize, isShow, searchType, keyword }: MockGetPopupListRequestDto) {
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
    } satisfies QuerySelectorWhere<MockPopupListItemData>;

    const popups = db.adminPopup.findMany({
      where,
      take: pageSize,
      skip,
      orderBy: [
        {
          order: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });

    const totalCount = db.adminPopup.count();
    let searchCount = 0;
    if (isSearchOrFilter) {
      searchCount = db.adminPopup.count({ where });
    }

    const totalPages = Math.ceil((isSearchOrFilter ? searchCount : totalCount) / pageSize);

    return HttpResponse.json({
      content: popups.map((popup) => ({
        id: popup.id,
        title: popup.title,
        displayType: popup.displayType,
        startDate: popup.startDate,
        endDate: popup.endDate,
        isShow: popup.isShow,
        order: popup.order,
        createdAt: popup.createdAt,
      })),
      currentPage: page,
      pageSize,
      totalElements: totalCount,
      totalPages,
      searchElements: searchCount,
      hasNext: page * pageSize < totalCount,
      hasPrevious: popups.length > 0 && page > 1,
    });
  }

  // 팝업 상세 조회
  getPopupDetail(id: number) {
    const popup = db.adminPopup.findFirst({ where: { id: { equals: id } } });

    return HttpResponse.json(popup);
  }

  // 팝업 생성
  createPopup(createPopupRequestDto: MockCreatePopupRequestDto) {
    const popupId =
      db.adminPopup.getAll().length > 0
        ? Math.max(...db.adminPopup.getAll().map((popup) => popup.id)) + 1
        : 1;

    const createdPopup = db.adminPopup.create({
      id: popupId,
      title: createPopupRequestDto.title,
      displayType: createPopupRequestDto.displayType,
      pcPosition: createPopupRequestDto.pcPosition,
      xCoordinate: createPopupRequestDto.xCoordinate || 0,
      yCoordinate: createPopupRequestDto.yCoordinate || 0,
      startDate: createPopupRequestDto.startDate || null,
      endDate: createPopupRequestDto.endDate || null,
      imageUrl: createPopupRequestDto.imageUrl,
      link: createPopupRequestDto.link || null,
      popupWidthStatus: createPopupRequestDto.popupWidthStatus,
      imageWidth: createPopupRequestDto.imageWidth || null,
      isShow: false,
      order: null,
      createdAt: new Date().toISOString(),
    });

    return HttpResponse.json(createdPopup);
  }

  // 팝업 수정
  updatePopup(updatePopupRequestDto: MockUpdatePopupRequestDto) {
    const updatedPopup = db.adminPopup.update({
      where: { id: { equals: updatePopupRequestDto.id } },
      data: {
        title: updatePopupRequestDto.title,
        displayType: updatePopupRequestDto.displayType,
        pcPosition: updatePopupRequestDto.pcPosition,
        xCoordinate: updatePopupRequestDto.xCoordinate || 0,
        yCoordinate: updatePopupRequestDto.yCoordinate || 0,
        startDate: updatePopupRequestDto.startDate || null,
        endDate: updatePopupRequestDto.endDate || null,
        imageUrl: updatePopupRequestDto.imageUrl,
        link: updatePopupRequestDto.link || null,
        popupWidthStatus: updatePopupRequestDto.popupWidthStatus,
        imageWidth: updatePopupRequestDto.imageWidth || null,
      },
    });

    return HttpResponse.json(updatedPopup);
  }

  // 팝업 삭제
  deletePopup(idList: number[]) {
    const deletedPopup = db.adminPopup.deleteMany({
      where: {
        id: {
          in: idList,
        },
      },
    });

    const deletedIdList = deletedPopup?.map((popup) => popup.id);

    return HttpResponse.json(deletedIdList);
  }

  // 팝업 노출 설정 및 순서 변경
  updatePopupOrder(idList: number[]) {
    // 기존 팝업의 노출 설정 및 순서 초기화
    db.adminPopup.updateMany({
      where: {
        isShow: {
          equals: true,
        },
      },
      data: {
        isShow: false,
        order: null,
      },
    });

    // 팝업의 노출 설정 및 순서 변경
    const updatedPopups = idList.map((id, index) => {
      return db.adminPopup.update({
        where: { id: { equals: id } },
        data: {
          isShow: true,
          order: index + 1,
        },
      });
    });

    return HttpResponse.json(updatedPopups);
  }

  reset() {
    db.adminPopup.deleteMany({ where: {} });
    initializeMockAdminPopup(db);
  }
}

const popupService = new PopupService();
export default popupService;
