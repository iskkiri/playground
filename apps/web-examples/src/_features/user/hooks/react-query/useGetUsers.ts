import type { PaginationRequestDto } from '@/_api/dtos/pagination.dto';
import { keepPreviousData, queryOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getUsersApi } from '../../api/user';

export const USER_LIST = 'USER_LIST';

export const getUserQueryOptions = ({ page, pageSize }: Partial<PaginationRequestDto> = {}) =>
  queryOptions({
    queryKey: [USER_LIST, { page }, { pageSize }],
    queryFn: () => getUsersApi({ page: page ?? 1, pageSize: pageSize ?? 10 }),
    placeholderData: keepPreviousData,
  });

export default function useGetUsers({ page, pageSize }: PaginationRequestDto) {
  return useQuery(getUserQueryOptions({ page, pageSize }));
}

interface UseGetInfiniteUsersParams {
  pageSize?: number;
  enabled?: boolean;
}

export const useGetInfiniteUsers = ({
  pageSize = 20,
  enabled = true,
}: UseGetInfiniteUsersParams = {}) => {
  return useInfiniteQuery({
    queryKey: [USER_LIST, { pageSize }],
    queryFn: ({ pageParam }) => getUsersApi({ page: pageParam, pageSize }),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.hasNextPage === false) return;

      return lastPage.meta.page + 1;
    },
    initialPageParam: 1,
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};
