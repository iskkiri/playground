import { useCallback } from 'react';
import { useDeleteBannersMutation } from './react-query/useBanner';
import { useConfirmModal } from '@/_hooks/useDialogModals';

interface UseDeleteBannersParams {
  selectedRowIdList: string[];
  resetRowSelection: () => void;
}

export default function useDeleteBanners({
  selectedRowIdList,
  resetRowSelection,
}: UseDeleteBannersParams) {
  const { openConfirmModal, closeConfirmModal } = useConfirmModal();

  const { mutate: deleteBanners } = useDeleteBannersMutation();

  const onDeleteBanners = useCallback(() => {
    openConfirmModal({
      title: '삭제',
      content: '선택된 배너를 삭제하시겠습니까?',
      confirmButtonText: '삭제',
      confirmButtonType: 'danger',
      onClose: closeConfirmModal,
      onConfirm: () => {
        deleteBanners(selectedRowIdList, {
          onSuccess: () => {
            resetRowSelection();
            closeConfirmModal();
          },
        });
      },
    });
  }, [closeConfirmModal, deleteBanners, openConfirmModal, resetRowSelection, selectedRowIdList]);

  return { onDeleteBanners };
}
