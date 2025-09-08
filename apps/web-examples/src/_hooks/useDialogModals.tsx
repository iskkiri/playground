import type { AlertModalProps } from '@repo/ui/feedback/AlertModal/AlertModal';
import type { ConfirmModalProps } from '@repo/ui/feedback/ConfirmModal/ConfirmModal';
import Modal from '@repo/ui/overlay/Modal/Modal';
import type { BaseModalProps } from '@repo/ui/overlay/Modal/types/modal.types';
import dynamic from 'next/dynamic';
import { useModal } from 'react-use-hook-modal';

const AlertModal = dynamic(() => import('@repo/ui/feedback/AlertModal/AlertModal'), {
  ssr: false,
});

const ConfirmModal = dynamic(
  () => import('@repo/ui/feedback/ConfirmModal/ConfirmModal'),
  { ssr: false }
);

export function useAlertModal() {
  const { open: openAlertModal, close: closeAlertModal } = useModal<
    AlertModalProps & BaseModalProps
  >(({ isOpen, ...props }) => (
    <Modal isOpen={isOpen} onOpenChange={() => closeAlertModal()}>
      <AlertModal {...props} />
    </Modal>
  ));

  return { openAlertModal, closeAlertModal };
}

export function useConfirmModal() {
  const { open: openConfirmModal, close: closeConfirmModal } = useModal<
    ConfirmModalProps & BaseModalProps
  >(({ isOpen, ...props }) => (
    <Modal isOpen={isOpen} onOpenChange={() => closeConfirmModal()}>
      <ConfirmModal {...props} />
    </Modal>
  ));

  return { openConfirmModal, closeConfirmModal };
}
