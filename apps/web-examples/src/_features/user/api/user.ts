import axios from 'axios';
import { MockUser, type GetUsersResponseDto } from './dtos/getUser.dto';
import type { PaginationRequestDto } from '@/_api/dtos/pagination.dto';
import type { UpdateUserRequestListItem } from './dtos/updateUsers.dto';

export const getUsersApi = async (params: PaginationRequestDto) => {
  const { data } = await axios.get<GetUsersResponseDto>('/api/users', {
    params,
  });
  return data;
};

export const deleteUsersApi = async (idList: number[]) => {
  const { data } = await axios.delete<MockUser[]>('/api/users', {
    data: idList,
  });
  return data;
};

export const updateUsersApi = async (users: UpdateUserRequestListItem[]) => {
  const { data } = await axios.patch<MockUser[]>('/api/users', users);
  return data;
};
