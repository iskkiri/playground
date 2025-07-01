import { useCallback } from 'react';
import { useDeleteNotices as useDeleteNoticesMutation } from './react-query/useNotice';
import { useConfirmModal } from '@/_hooks/useDialogModals';

interface UseDeleteNoticesParams {
  selectedRowIdList: number[];
}

export default function useDeleteNotices({ selectedRowIdList }: UseDeleteNoticesParams) {
  const { openConfirmModal, closeConfirmModal } = useConfirmModal();

  const { mutate: deleteNotice } = useDeleteNoticesMutation();

  const onDeleteNotices = useCallback(() => {
    openConfirmModal({
      title: '삭제',
      content: '선택된 공지사항을 삭제하시겠습니까?',
      confirmButtonText: '삭제',
      confirmButtonType: 'danger',
      onClose: closeConfirmModal,
      onConfirm: () => {
        deleteNotice(selectedRowIdList, {
          onSuccess: () => {
            closeConfirmModal();
          },
        });
      },
    });
  }, [closeConfirmModal, deleteNotice, openConfirmModal, selectedRowIdList]);

  return { onDeleteNotices };
}
