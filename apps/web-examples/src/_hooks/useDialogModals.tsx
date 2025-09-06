import type { AlertModalProps } from '@repo/ui/DialogModals/AlertModal/AlertModal';
import type { ConfirmModalProps } from '@repo/ui/DialogModals/ConfirmModal/ConfirmModal';
import Modal from '@repo/ui-third-party/Modal/Modal';
import type { BaseModalProps } from '@repo/ui-third-party/Modal/types/modal.types';
import dynamic from 'next/dynamic';
import { useModal } from 'react-use-hook-modal';

const AlertModal = dynamic(() => import('@repo/ui/DialogModals/AlertModal/AlertModal'), {
  ssr: false,
});

const ConfirmModal = dynamic(
  () => import('@repo/ui/DialogModals/ConfirmModal/ConfirmModal'),
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
