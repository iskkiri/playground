import Button, { type ButtonType } from '#src/components/Button/Button';
import Modal from '#src/components/Modal/Modal';
import type { BaseModalProps } from '#src/components/Modal/types/modal.types';
import { commonCss } from '#src/styles/common.styles';
import { dialogModalCss } from '../styles/DialogModal.styles';

export interface ConfirmModalProps extends BaseModalProps {
  title: string;
  content: React.ReactNode;
  closeButtonText?: string;
  confirmButtonText?: string;
  confirmButtonType?: ButtonType;
  onConfirm: () => void;
}

export default function ConfirmModal({
  //
  isOpen,
  title,
  content,
  closeButtonText = '닫기',
  confirmButtonText = '확인',
  confirmButtonType = 'primary',
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} onRequestClose={onClose}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p css={dialogModalCss.content}>{content}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button buttonType="gray" onClick={onClose} cssStyle={commonCss.flexGrow}>
          {closeButtonText}
        </Button>

        <Button buttonType={confirmButtonType} onClick={onConfirm} cssStyle={commonCss.flexGrow}>
          {confirmButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
