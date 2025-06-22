import { dialogModalCss } from '../styles/DialogModal.styles';
import type { BaseModalProps } from '#src/components/Modal/types/modal.types';
import Button, { type ButtonType } from '#src/components/Button/Button';
import Modal from '#src/components/Modal/Modal';
import { commonCss } from '#src/styles/common.styles';

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
        <Button buttonType={closeButtonType} onClick={onClose} cssStyle={commonCss.flexGrow}>
          {closeButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
