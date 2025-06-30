import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USER_LIST } from './useGetUsers';
import { deleteUsersApi } from '../../api/user';
import type { GetUsersResponseDto } from '../../api/dtos/getUser.dto';

export default function useDeleteUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUsersApi,
    onSuccess: (_, idList) => {
      queryClient.setQueriesData<GetUsersResponseDto>(
        { queryKey: [USER_LIST] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.data.filter((user) => !idList.includes(user.id)),
          };
        }
      );
    },
  });
}
