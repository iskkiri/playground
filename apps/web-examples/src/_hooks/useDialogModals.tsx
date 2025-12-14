import dynamic from 'next/dynamic';
import { useModal } from 'react-use-hook-modal';

const AlertModal = dynamic(() => import('@repo/ui/feedback/AlertModal/AlertModal'), {
  ssr: false,
});

const ConfirmModal = dynamic(() => import('@repo/ui/feedback/ConfirmModal/ConfirmModal'), {
  ssr: false,
});

export function useAlertModal() {
  const { open: openAlertModal, close: closeAlertModal } = useModal(AlertModal);

  return { openAlertModal, closeAlertModal };
}

export function useConfirmModal() {
  const { open: openConfirmModal, close: closeConfirmModal } = useModal(ConfirmModal);

  return { openConfirmModal, closeConfirmModal };
}
