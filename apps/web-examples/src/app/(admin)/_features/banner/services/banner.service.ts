import mongoose from 'mongoose';
import connectToDatabase from '@/_lib/mongodb';
import type { BannerListItemData, GetBannerListRequestDto } from '../api/dtos/getBannerList.dto';
import Banner from '../models/banner.model';
import type { PaginationResponseDto } from '@/_api/dtos/pagination.dto';
import type { CreateBannerRequestDto } from '../api/dtos/createBanner.dto';
import type { UpdateBannerRequestDto } from '../api/dtos/updateBanner.dto';

class BannerService {
  // 배너 목록 조회
  async getBannerList({ page, pageSize, isShow, searchType, keyword }: GetBannerListRequestDto) {
    await connectToDatabase();

    const skip = (page - 1) * pageSize;
    const isSearchOrFilter = isShow !== undefined || (searchType === 'title' && keyword);

    const banners = await Banner.find()
      .where({
        ...(typeof isShow === 'boolean' && { isShow }),
        ...(searchType === 'title' &&
          keyword && {
            title: {
              $regex: keyword,
              $options: 'i',
            },
          }),
      })
      .select({
        _id: true,
        title: true,
        isShow: true,
        order: true,
        createdAt: true,
      })
      .skip(skip)
      .limit(pageSize)
      .sort({ order: 'desc', createdAt: 'desc' });

    const totalCount = await Banner.countDocuments();

    let searchCount = 0;
    if (isSearchOrFilter) {
      searchCount = await Banner.countDocuments().where({
        ...(typeof isShow === 'boolean' && { isShow }),
        ...(searchType === 'title' &&
          keyword && {
            title: {
              $regex: keyword,
              $options: 'i',
            },
          }),
      });
    }

    const totalPages = Math.ceil((isSearchOrFilter ? searchCount : totalCount) / pageSize);

    return {
      content: banners,
      currentPage: page,
      pageSize,
      totalElements: totalCount,
      totalPages,
      searchElements: searchCount,
      hasNext: page * pageSize < totalCount,
      hasPrevious: banners.length > 0 && page > 1,
    } satisfies PaginationResponseDto<BannerListItemData>;
  }

  // 배너 상세 조회
  async getBannerDetail(id: string) {
    await connectToDatabase();

    const banner = await Banner.findById(id).populate({
      path: 'author',
      select: 'name email',
    });

    return banner;
  }

  // 배너 생성
  async createBanner(createBannerRequestDto: CreateBannerRequestDto) {
    await connectToDatabase();

    const banner = await Banner.create({
      ...createBannerRequestDto,
      author: '6842fd0f9f53e78d34b395e9',
    });

    return banner;
  }

  // 배너 수정
  async updateBanner({ id, ...updatePayload }: UpdateBannerRequestDto) {
    await connectToDatabase();

    const banner = await Banner.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    });

    return banner;
  }

  // 배너 삭제
  async deleteBanner(idList: number[]) {
    await connectToDatabase();

    await Banner.deleteMany({ _id: { $in: idList } });

    return idList;
  }

  // 배너 노출 설정 및 순서 변경
  async updateBannerOrder(idList: string[]) {
    await connectToDatabase();

    await mongoose.connection.transaction(async (session) => {
      // 1. 현재 노출 중인 배너들만 비노출로 변경 + order null로 초기화
      await Banner.updateMany(
        {
          isShow: true,
          order: { $ne: null }, // order가 null이 아닌 것들만
        },
        {
          $set: {
            isShow: false,
            order: null,
          },
        },
        { session }
      );

      // 2. 선택된 배너들만 isShow: true + 순서 설정
      const bulkOps = idList.map((id, index) => ({
        updateOne: {
          filter: { _id: id },
          update: {
            $set: {
              isShow: true,
              order: index + 1,
            },
          },
        },
      }));

      await Banner.bulkWrite(bulkOps, { session });
    });

    return idList;
  }

  async resetForTest() {
    await connectToDatabase();

    const now = new Date();
    const banners = [...Array(2)].map((_, i) => ({
      title: `테스트 배너 ${i + 1}`,
      mobileImage: 'https://d37qx3oivk5uc5.cloudfront.net/banner/sample6_1749305613679.png',
      mobileLink: 'https://naver.com',
      pcImage: 'https://d37qx3oivk5uc5.cloudfront.net/banner/sample5_1749305613833.png',
      pcLink: 'https://google.com',
      isShow: i < 5,
      order: i < 5 ? i + 1 : null,
      author: '6842fd0f9f53e78d34b395e9',
      createdAt: new Date(now.getTime() + (i + 1) * 1000 * 60 * 5), // 5분 차이
    }));

    await Banner.create(banners);
  }
}

const bannerService = new BannerService();

export default bannerService;
