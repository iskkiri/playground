'use client';

import { useCallback } from 'react';
import Modal from '../../overlay/Modal/Modal';
import Button, { type ButtonProps } from '../../general/Button/Button';
import { useModalDispatchContext } from '../../overlay/Modal/hooks/useModalContext';

export interface AlertModalProps {
  title: string;
  content: React.ReactNode;
  closeButtonText?: string;
  closeButtonType?: ButtonProps['variant'];
  onClose?: () => void;
  className?: string;
}

export default function AlertModal({
  title,
  content,
  closeButtonText = '확인',
  closeButtonType = 'primary',
  onClose,
  className,
}: AlertModalProps) {
  const { onClose: closeModal } = useModalDispatchContext();

  const handleClose = useCallback(() => {
    onClose?.();
    closeModal();
  }, [onClose, closeModal]);

  return (
    <Modal.Content className={className}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="typography-p3-16r whitespace-pre-wrap text-gray-700">{content}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose} variant={closeButtonType} className="flex-1">
          {closeButtonText}
        </Button>
      </Modal.Footer>
    </Modal.Content>
  );
}
