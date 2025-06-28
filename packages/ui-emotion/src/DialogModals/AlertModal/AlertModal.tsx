import Modal from '@repo/ui-third-party/Modal/Modal';
import type { BaseModalProps } from '@repo/ui-third-party/Modal/types/modal.types';
import { dialogModalCss } from '../styles/DialogModal.styles';
import Button, { type ButtonType } from '#src/Button/Button.js';

export interface AlertModalProps extends BaseModalProps {
  title: string;
  content: React.ReactNode;
  closeButtonText?: string;
  closeButtonType?: ButtonType;
}

export default function AlertModal({
  //
  isOpen,
  title,
  content,
  closeButtonText = '확인',
  closeButtonType = 'primary',
  onClose,
}: AlertModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} onRequestClose={onClose}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p css={dialogModalCss.content}>{content}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button buttonType={closeButtonType} onClick={onClose} cssStyle={{ flex: 1 }}>
          {closeButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
