import Modal from '@repo/ui-third-party/Modal/Modal';
import type { BaseModalProps } from '@repo/ui-third-party/Modal/types/modal.types';
import Button, { type ButtonProps } from '../../Button/Button';

export interface AlertModalProps extends BaseModalProps {
  title: string;
  content: React.ReactNode;
  closeButtonText?: string;
  closeButtonType?: ButtonProps['variant'];
  className?: string;
}

export default function AlertModal({
  //
  isOpen,
  title,
  content,
  closeButtonText = '확인',
  closeButtonType = 'primary',
  onClose,
  className,
}: AlertModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} onRequestClose={onClose} className={className}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="typography-p3-16r whitespace-pre-wrap text-gray-700">{content}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant={closeButtonType} onClick={onClose} className="flex-1">
          {closeButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
