'use client';

import { useCallback } from 'react';
import Modal from '../../overlay/Modal/Modal';
import Button, { type ButtonProps } from '../../general/Button/Button';
import type { InjectedProps } from 'react-use-hook-modal';

type ConfirmModalResult = {
  confirmed: boolean;
};

export interface ConfirmModalProps extends InjectedProps<ConfirmModalResult> {
  title: string;
  content: React.ReactNode;
  closeButtonText?: string;
  confirmButtonText?: string;
  confirmButtonType?: ButtonProps['variant'];
  className?: string;
}

export default function ConfirmModal({
  //
  title,
  content,
  closeButtonText = '닫기',
  confirmButtonText = '확인',
  confirmButtonType = 'primary',
  className,
  isOpen,
  close,
}: ConfirmModalProps) {
  const onClose = useCallback(
    (result: ConfirmModalResult) => () => {
      close({ result });
    },
    [close]
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose({ confirmed: false })}>
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

          <Button
            variant={confirmButtonType}
            onClick={onClose({ confirmed: true })}
            className="flex-1"
          >
            {confirmButtonText}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
