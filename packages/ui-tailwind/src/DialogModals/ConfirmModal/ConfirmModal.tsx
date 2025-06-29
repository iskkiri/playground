'use client';

import Modal from '@repo/ui-third-party/Modal/Modal';
import type { BaseModalProps } from '@repo/ui-third-party/Modal/types/modal.types';
import Button, { type ButtonProps } from '../../Button/Button';

export interface ConfirmModalProps extends BaseModalProps {
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
  isOpen,
  title,
  content,
  closeButtonText = '닫기',
  confirmButtonText = '확인',
  confirmButtonType = 'primary',
  onClose,
  onConfirm,
  className,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} onRequestClose={onClose} className={className}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="typography-p3-16r whitespace-pre-wrap text-gray-700">{content}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="gray" onClick={onClose} className="flex-1">
          {closeButtonText}
        </Button>

        <Button variant={confirmButtonType} onClick={onConfirm} className="flex-1">
          {confirmButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
