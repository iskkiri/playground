import { useCallback } from 'react';
import { useConfirmModal } from '@/_hooks/useDialogModals';
import { useDeletePopupsMutation } from './react-query/useAdminPopup';

interface UseDeletePopupsParams {
  selectedRowIdList: string[];
  resetRowSelection: () => void;
}

export default function useDeletePopups({
  selectedRowIdList,
  resetRowSelection,
}: UseDeletePopupsParams) {
  const { openConfirmModal, closeConfirmModal } = useConfirmModal();

  const { mutate: deletePopups } = useDeletePopupsMutation();

  const onDeletePopups = useCallback(() => {
    openConfirmModal({
      title: '삭제',
      content: '선택된 팝업을 삭제하시겠습니까?',
      confirmButtonText: '삭제',
      confirmButtonType: 'danger',
      onClose: closeConfirmModal,
      onConfirm: () => {
        deletePopups(selectedRowIdList, {
          onSuccess: () => {
            resetRowSelection();
            closeConfirmModal();
          },
        });
      },
    });
  }, [closeConfirmModal, deletePopups, openConfirmModal, resetRowSelection, selectedRowIdList]);

  return { onDeletePopups };
}
