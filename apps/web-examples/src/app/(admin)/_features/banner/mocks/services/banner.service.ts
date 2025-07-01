import db from '@/_mocks/db';
import { HttpResponse } from 'msw';
import type {
  MockBannerListItemData,
  MockCreateBannerRequestDto,
  MockGetBannerListRequestDto,
  MockUpdateBannerRequestDto,
} from '../types/mockBanner.types';
import type { QuerySelectorWhere } from '@mswjs/data/lib/query/queryTypes';
import type { MockPaginationResponseDto } from '@/_mocks/types/mock.types';
import { initializeMockBanners } from '../banner.db';

class BannerService {
  // 배너 목록 조회
  getBannerList({ page, pageSize, isShow, searchType, keyword }: MockGetBannerListRequestDto) {
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
    } satisfies QuerySelectorWhere<MockBannerListItemData>;

    const banners = db.banner.findMany({
      where,
      take: pageSize,
      skip,
      orderBy: [
        {
          isShow: 'desc',
        },
        {
          order: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });

    const totalCount = db.banner.count();
    let searchCount = 0;
    if (isSearchOrFilter) {
      searchCount = db.banner.count({ where });
    }

    const totalPages = Math.ceil((isSearchOrFilter ? searchCount : totalCount) / pageSize);

    return HttpResponse.json({
      content: banners.map((banner) => ({
        id: banner.id,
        title: banner.title,
        isShow: banner.isShow,
        order: banner.order,
        createdAt: banner.createdAt,
      })),
      currentPage: page,
      pageSize,
      totalElements: totalCount,
      totalPages,
      searchElements: searchCount,
      hasNext: page * pageSize < totalCount,
      hasPrevious: banners.length > 0 && page > 1,
    } satisfies MockPaginationResponseDto<MockBannerListItemData>);
  }

  // 배너 상세 조회
  getBannerDetail(id: number) {
    const banner = db.banner.findFirst({ where: { id: { equals: id } } });

    return HttpResponse.json(banner);
  }

  // 배너 생성
  createBanner(createBannerRequestDto: MockCreateBannerRequestDto) {
    const bannerId =
      db.banner.getAll().length > 0
        ? Math.max(...db.banner.getAll().map((banner) => banner.id)) + 1
        : 1;

    const createdBanner = db.banner.create({
      id: bannerId,
      title: createBannerRequestDto.title,
      mobileImage: createBannerRequestDto.mobileImage,
      mobileLink: createBannerRequestDto.mobileLink,
      pcImage: createBannerRequestDto.pcImage,
      pcLink: createBannerRequestDto.pcLink,
      isShow: false,
      order: null,
      createdAt: new Date().toISOString(),
    });

    return HttpResponse.json(createdBanner);
  }

  // 배너 수정
  updateBanner(updateBannerRequestDto: MockUpdateBannerRequestDto) {
    const updatedBanner = db.banner.update({
      where: { id: { equals: updateBannerRequestDto.id } },
      data: {
        title: updateBannerRequestDto.title,
        mobileImage: updateBannerRequestDto.mobileImage,
        mobileLink: updateBannerRequestDto.mobileLink,
        pcImage: updateBannerRequestDto.pcImage,
        pcLink: updateBannerRequestDto.pcLink,
      },
    });
    return HttpResponse.json(updatedBanner);
  }

  // 배너 삭제
  deleteBanner(idList: number[]) {
    const deletedBanners = db.banner.deleteMany({
      where: {
        id: {
          in: idList,
        },
      },
    });
    const deletedIdList = deletedBanners?.map((banner) => banner.id);

    return HttpResponse.json(deletedIdList);
  }

  // 배너 노출 설정 및 순서 변경
  updateBannerOrder(idList: number[]) {
    // 기존 배너의 노출 설정 및 순서 초기화
    db.banner.updateMany({
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

    // 배너의 노출 설정 및 순서 변경
    const updatedBanners = idList.map((id, index) => {
      return db.banner.update({
        where: { id: { equals: id } },
        data: {
          isShow: true,
          order: index + 1,
        },
      });
    });

    return HttpResponse.json(updatedBanners);
  }

  reset() {
    db.banner.deleteMany({ where: {} });
    initializeMockBanners(db);
  }
}

const bannerService = new BannerService();
export default bannerService;
