import { useCallback } from 'react';
import { default as useDeleteUsersMutation } from './react-query/useDeleteUsers';

export default function useDeleteUser() {
  const { mutate: deleteUsers } = useDeleteUsersMutation();

  const onDeleteUser = useCallback(
    (id: number) => () => {
      const isConfirm = window.confirm('선택한 유저를 삭제하시겠습니까?');
      if (isConfirm === false) return;

      deleteUsers([id]);
    },
    [deleteUsers]
  );

  return { onDeleteUser };
}
