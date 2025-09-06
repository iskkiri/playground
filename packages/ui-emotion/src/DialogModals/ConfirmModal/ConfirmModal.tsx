'use client';

import { useCallback } from 'react';
import Modal from '@repo/ui/Modal/Modal';
import { useModalDispatchContext } from '@repo/ui/Modal/hooks/useModalContext';
import Button, { type ButtonType } from '#src/Button/Button.js';
import { dialogModalCss } from '../styles/DialogModal.styles';

export interface ConfirmModalProps {
  title: string;
  content: React.ReactNode;
  closeButtonText?: string;
  confirmButtonText?: string;
  confirmButtonType?: ButtonType;
  onConfirm: () => void;
}

export default function ConfirmModal({
  //
  title,
  content,
  closeButtonText = '닫기',
  confirmButtonText = '확인',
  confirmButtonType = 'primary',
  onConfirm,
}: ConfirmModalProps) {
  const { onClose } = useModalDispatchContext();

  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  return (
    <Modal.Content>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p css={dialogModalCss.content}>{content}</p>
      </Modal.Body>

      <Modal.Footer>
        <Modal.CloseTrigger asChild>
          <Button buttonType="gray" cssStyle={{ flex: 1 }}>
            {closeButtonText}
          </Button>
        </Modal.CloseTrigger>

        <Button buttonType={confirmButtonType} onClick={handleConfirm} cssStyle={{ flex: 1 }}>
          {confirmButtonText}
        </Button>
      </Modal.Footer>
    </Modal.Content>
  );
}
