import { http } from 'msw';
import type { MockUser } from '../../api/dtos/getUser.dto';
import userService from '../service/user.service';

export const userHandlers = [
  // 유저 목록 조회
  http.get('/api/users', ({ request }) => {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    // query parameters 얻기
    const pageParams = searchParams.get('page');
    const page = pageParams ? +pageParams : 1;

    const pageSizeParams = searchParams.get('pageSize');
    const pageSize = pageSizeParams ? +pageSizeParams : 10;

    return userService.getUserList({ page, pageSize });
  }),

  // 유저 수정
  http.patch('/api/users', async ({ request }) => {
    const editedUserInfoList = (await request.json()) as MockUser[];

    return userService.updateUsers(editedUserInfoList);
  }),

  // 유저 삭제
  http.delete('/api/users', async ({ request }) => {
    const idList = (await request.json()) as number[];

    return userService.deleteUsers(idList);
  }),
];
