import { default as useDeleteUsersMutation } from './react-query/useDeleteUsers';
import { useCallback } from 'react';

interface UseDeleteUsersParams {
  selectedRowIds: number[];
}

export default function useDeleteUsers({
  selectedRowIds,
}: UseDeleteUsersParams) {
  const { mutate: deleteUsers } = useDeleteUsersMutation();

  const onDeleteUsers = useCallback(() => {
    const isConfirm = window.confirm('선택한 유저를 삭제하시겠습니까?');
    if (isConfirm === false) return;

    deleteUsers(selectedRowIds);
  }, [deleteUsers, selectedRowIds]);

  return { onDeleteUsers };
}
