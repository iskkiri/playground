import { queryOptions, useQuery } from '@tanstack/react-query';
import { getMeApi } from '../_api/user.api';
import authStorage from '../_storages/authStorage';
import type { GetMeResponseDto } from '../_api/dtos/getMe.dto';

const GET_ME = 'GET_ME';

export const getMeQueryOptions = queryOptions<GetMeResponseDto | null>({
  queryKey: [GET_ME],
  queryFn: () => {
    /**
     * 불필요한 API 요청을 줄이기 위해
     * 액세스 토큰이 존재하지 않는 경우에는 API 요청을 보내지 않음
     */
    const accessToken = authStorage.getAccessToken();
    if (!accessToken) throw null;
    return getMeApi();
  },
  staleTime: 1000 * 60 * 5,
});

export default function useGetMe() {
  return useQuery(getMeQueryOptions);
}
