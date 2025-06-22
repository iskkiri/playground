import { lazy } from 'react';
import { useModal } from 'react-use-hook-modal';

const AlertModal = lazy(() => import('#src/components/DialogModals/AlertModal/AlertModal'));
const ConfirmModal = lazy(() => import('#src/components/DialogModals/ConfirmModal/ConfirmModal'));

export function useAlertModal() {
  const { open: openAlertModal, close: closeAlertModal } = useModal(AlertModal);

  return { openAlertModal, closeAlertModal };
}

export function useConfirmModal() {
  const { open: openConfirmModal, close: closeConfirmModal } = useModal(ConfirmModal);

  return { openConfirmModal, closeConfirmModal };
}
