import connectToDatabase from '@/_lib/mongodb';
import type { GetPopupListRequestDto, PopupListItemData } from '../api/dtos/getPopupList.dto';
import Popup from '../models/popup.model';
import type { PaginationResponseDto } from '@/_api/dtos/pagination.dto';
import type { CreatePopupRequestDto } from '../api/dtos/createPopup.dto';
import type { UpdatePopupRequestDto } from '../api/dtos/updatePopup.dto';
import mongoose from 'mongoose';

class PopupService {
  // 팝업 목록 조회
  async getPopupList({ page, pageSize, isShow, searchType, keyword }: GetPopupListRequestDto) {
    await connectToDatabase();

    const skip = (page - 1) * pageSize;
    const isSearchOrFilter = isShow !== undefined || (searchType === 'title' && keyword);

    const popups = await Popup.find()
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
        displayType: true,
        startDate: true,
        endDate: true,
        isShow: true,
        order: true,
        createdAt: true,
      })
      .skip(skip)
      .limit(pageSize)
      .sort({ order: 'asc', createdAt: 'desc' });

    const totalCount = await Popup.countDocuments();

    let searchCount = 0;
    if (isSearchOrFilter) {
      searchCount = await Popup.countDocuments().where({
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
      content: popups,
      currentPage: page,
      pageSize,
      totalElements: totalCount,
      totalPages,
      searchElements: searchCount,
      hasNext: page * pageSize < totalCount,
      hasPrevious: popups.length > 0 && page > 1,
    } satisfies PaginationResponseDto<PopupListItemData>;
  }

  // 팝업 상세 조회
  async getPopupDetail(id: string) {
    await connectToDatabase();

    const popup = await Popup.findById(id).populate({
      path: 'author',
      select: 'name email',
    });

    return popup;
  }

  // 팝업 생성
  async createPopup(createPopupRequestDto: CreatePopupRequestDto) {
    await connectToDatabase();

    const popup = await Popup.create({
      ...createPopupRequestDto,
      author: '6842fd0f9f53e78d34b395e9',
    });

    return popup;
  }

  // 팝업 수정
  async updatePopup({ id, ...updatePayload }: UpdatePopupRequestDto) {
    await connectToDatabase();

    const popup = await Popup.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    });

    return popup;
  }

  // 팝업 삭제
  async deletePopup(idList: string[]) {
    await connectToDatabase();

    await Popup.deleteMany({ _id: { $in: idList } });

    return idList;
  }

  // 팝업 노출 설정 및 순서 변경
  async updatePopupOrder(idList: string[]) {
    await connectToDatabase();

    await mongoose.connection.transaction(async (session) => {
      // 1. 현재 노출 중인 배너들만 비노출로 변경 + order null로 초기화
      await Popup.updateMany(
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

      await Popup.bulkWrite(bulkOps, { session });
    });

    return idList;
  }

  async resetForTest() {
    await connectToDatabase();

    const now = new Date();
    const popups = [
      {
        title: '너비/높이 1:1인 팝업',
        displayType: 'ALL',
        pcPosition: 'CENTER',
        xCoordinate: 0,
        yCoordinate: 0,
        startDate: null,
        endDate: null,
        imageUrl: 'https://d37qx3oivk5uc5.cloudfront.net/popup/one-to-one_1749320673232.png',
        link: 'https://naver.com',
        popupWidthStatus: 'AUTO',
        imageWidth: 0,
        isShow: true,
        order: 1,
        author: '6842fd0f9f53e78d34b395e9',
      },
      {
        title: '너비/높이 2:1인 팝업',
        displayType: 'ALL',
        pcPosition: 'CENTER',
        xCoordinate: 0,
        yCoordinate: 0,
        startDate: null,
        endDate: null,
        imageUrl: 'https://d37qx3oivk5uc5.cloudfront.net/popup/two-to-one_1749320711335.png',
        link: 'https://naver.com',
        popupWidthStatus: 'AUTO',
        imageWidth: 0,
        isShow: true,
        order: 2,
        author: '6842fd0f9f53e78d34b395e9',
        createdAt: new Date(now.getTime() + 1 * 1000 * 60 * 5), // 5분 차이
      },
    ];

    await Popup.create(popups);
  }
}

const popupService = new PopupService();

export default popupService;
