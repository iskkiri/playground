import type { PaginationRequestDto } from '@/_api/dtos/pagination.dto';
import db from '@/_mocks/db';
import { HttpResponse } from 'msw';
import type { GetUsersResponseDto } from '../../api/dtos/getUser.dto';
import type { UpdateUserRequestListItem } from '../../api/dtos/updateUsers.dto';

class UserService {
  // 유저 목록 조회
  getUserList({ page, pageSize }: PaginationRequestDto) {
    const paginatedUsers = db.user.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      // orderBy: {
      //   createdAt: 'desc',
      // },
    });

    const totalCount = db.user.count();
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNextPage = page * pageSize < totalCount;

    return HttpResponse.json({
      meta: {
        totalCount,
        totalPages,
        page,
        hasNextPage,
      },
      data: paginatedUsers,
    } satisfies GetUsersResponseDto);
  }

  // 유저 업데이트
  updateUsers(updateUserRequestList: UpdateUserRequestListItem[]) {
    const updatedUsers = updateUserRequestList.map((userInfo) => {
      return db.user.update({
        where: {
          id: {
            equals: userInfo.id,
          },
        },
        data: {
          name: userInfo.name,
          phone: userInfo.phone,
          email: userInfo.email,
        },
      });
    });

    return HttpResponse.json(updatedUsers);
  }

  // 유저 삭제
  deleteUsers(idList: number[]) {
    const deletedUsers = db.user.deleteMany({
      where: {
        id: {
          in: idList,
        },
      },
    });

    return HttpResponse.json(deletedUsers);
  }
}

const userService = new UserService();
export default userService;
