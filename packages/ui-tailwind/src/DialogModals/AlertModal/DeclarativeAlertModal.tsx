import Modal, { type ModalProps } from '@repo/ui-third-party/Modal/Modal';
import AlertModal, { type AlertModalProps } from './AlertModal';

interface DeclarativeAlertModalProps extends Omit<ModalProps, 'children'>, AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeclarativeAlertModal({
  isOpen,
  onOpenChange,
  initialOpen,
  title,
  content,
  closeButtonText,
  closeButtonType,
  onClose,
  className,
}: DeclarativeAlertModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} initialOpen={initialOpen}>
      <AlertModal
        title={title}
        content={content}
        closeButtonText={closeButtonText}
        closeButtonType={closeButtonType}
        onClose={onClose}
        className={className}
      />
    </Modal>
  );
}
