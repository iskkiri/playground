import connectToDatabase from '@/_lib/mongodb';
import type { GetNoticeListRequestDto, NoticeListItemData } from '../api/dtos/getNoticeList.dto';
import Notice from '../models/notice.model';
import type { PaginationResponseDto } from '@/_api/dtos/pagination.dto';
import type { CreateNoticeRequestDto } from '../api/dtos/createNotice.dto';
import type { UpdateNoticeRequestDto } from '../api/dtos/updateNotice.dto';

class NoticeService {
  // 공지사항 목록 조회
  async getNoticeList({ page, pageSize, isShow, searchType, keyword }: GetNoticeListRequestDto) {
    await connectToDatabase();

    const skip = (page - 1) * pageSize;
    const isSearchOrFilter = isShow !== undefined || (searchType === 'title' && keyword);
    const where = {
      ...(typeof isShow === 'boolean' && { isShow }),
      ...(searchType === 'title' &&
        keyword && {
          title: {
            $regex: keyword,
            $options: 'i',
          },
        }),
    };

    const notices = await Notice.find()
      .where(where)
      .select({
        id: true,
        title: true,
        createdAt: true,
        isShow: true,
      })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: 'desc' });
    // .populate({
    //   path: 'author',
    //   select: 'name email',
    // });

    const totalCount = await Notice.countDocuments();

    let searchCount = 0;
    if (isSearchOrFilter) {
      searchCount = await Notice.countDocuments().where(where);
    }

    const totalPages = Math.ceil((isSearchOrFilter ? searchCount : totalCount) / pageSize);

    return {
      content: notices,
      currentPage: page,
      pageSize,
      totalElements: totalCount,
      totalPages,
      searchElements: searchCount,
      hasNext: page * pageSize < totalCount,
      hasPrevious: notices.length > 0 && page > 1,
    } satisfies PaginationResponseDto<NoticeListItemData>;
  }

  // 공지사항 상세 조회
  async getNoticeDetail(id: string) {
    await connectToDatabase();

    const notice = await Notice.findById(id).populate({
      path: 'author',
      select: 'name email',
    });

    return notice;
  }

  // 공지사항 생성
  async createNotice(createNoticeRequestDto: CreateNoticeRequestDto) {
    await connectToDatabase();

    const notice = await Notice.create({
      ...createNoticeRequestDto,
      author: '6842fd0f9f53e78d34b395e9',
    });

    return notice;
  }

  // 공지사항 수정
  async updateNotice({ id, ...updatePayload }: UpdateNoticeRequestDto) {
    await connectToDatabase();

    const notice = await Notice.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true, // 스키마 유효성 검증 실행
    });

    return notice;
  }

  // 공지사항 삭제
  async deleteNotice(idList: string[]) {
    await connectToDatabase();

    await Notice.deleteMany({ _id: { $in: idList } });

    return idList;
  }

  async resetForTest() {
    await connectToDatabase();

    const now = new Date();
    const notices = [...Array(2)].map((_, i) => ({
      title: `테스트 공지사항 ${i + 100}`,
      content: `이것은 ${i + 100}번째 테스트 공지사항입니다.`,
      isShow: (i + 100) % 2 === 0,
      thumbnail: 'https://d37qx3oivk5uc5.cloudfront.net/notice/sample3_1749291660118.png',
      author: '6842fd0f9f53e78d34b395e9',
      createdAt: new Date(now.getTime() + (i + 1) * 1000 * 60 * 5), // 5분 차이
    }));

    await Notice.create(notices);
  }
}

const noticeService = new NoticeService();

export default noticeService;
