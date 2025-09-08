'use client';

import { useCallback } from 'react';
import Modal from '../../overlay/Modal/Modal';
import { useModalDispatchContext } from '../../overlay/Modal/hooks/useModalContext';
import Button, { type ButtonProps } from '../../general/Button/Button';

export interface ConfirmModalProps {
  title: string;
  content: React.ReactNode;
  closeButtonText?: string;
  confirmButtonText?: string;
  confirmButtonType?: ButtonProps['variant'];
  onConfirm: () => void;
  className?: string;
}

export default function ConfirmModal({
  //
  title,
  content,
  closeButtonText = '닫기',
  confirmButtonText = '확인',
  confirmButtonType = 'primary',
  onConfirm,
  className,
}: ConfirmModalProps) {
  const { onClose } = useModalDispatchContext();

  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  return (
    <Modal.Content className={className}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="typography-p3-16r whitespace-pre-wrap text-gray-700">{content}</p>
      </Modal.Body>

      <Modal.Footer>
        <Modal.CloseTrigger asChild>
          <Button variant="gray" className="flex-1">
            {closeButtonText}
          </Button>
        </Modal.CloseTrigger>

        <Button variant={confirmButtonType} onClick={handleConfirm} className="flex-1">
          {confirmButtonText}
        </Button>
      </Modal.Footer>
    </Modal.Content>
  );
}
