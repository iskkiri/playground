'use client';

import Modal from '@repo/ui/Modal/Modal';
import { dialogModalCss } from '../styles/DialogModal.styles';
import Button, { type ButtonType } from '#src/Button/Button.js';

export interface AlertModalProps {
  title: string;
  content: React.ReactNode;
  closeButtonText?: string;
  closeButtonType?: ButtonType;
}

export default function AlertModal({
  //
  title,
  content,
  closeButtonText = '확인',
  closeButtonType = 'primary',
}: AlertModalProps) {
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
          <Button buttonType={closeButtonType} cssStyle={{ flex: 1 }}>
            {closeButtonText}
          </Button>
        </Modal.CloseTrigger>
      </Modal.Footer>
    </Modal.Content>
  );
}
