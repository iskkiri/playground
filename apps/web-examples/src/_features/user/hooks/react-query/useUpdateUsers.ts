import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { USER_LIST } from './useGetUsers';
import { updateUsersApi } from '../../api/user';
import type { GetUsersResponseDto } from '../../api/dtos/getUser.dto';

export default function useUpdateUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUsersApi,
    onSuccess: (editedUsers) => {
      queryClient.setQueriesData<GetUsersResponseDto>(
        { queryKey: [USER_LIST] },
        (oldData) =>
          produce(oldData, (draft) => {
            if (!draft) return draft;

            for (const editedUser of editedUsers) {
              const index = draft.data.findIndex(
                (user) => user.id === editedUser.id
              );
              if (index === -1) continue;
              draft.data[index] = editedUser;
            }
          })
      );
    },
  });
}
