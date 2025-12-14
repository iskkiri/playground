'use client';

import { useCallback } from 'react';
import Modal from '../../overlay/Modal/Modal';
import Button, { type ButtonProps } from '../../general/Button/Button';
import type { InjectedProps } from 'react-use-hook-modal';

type AlertModalResult = {
  reason: 'confirm' | 'overlay';
};

export interface AlertModalProps extends InjectedProps<AlertModalResult> {
  title: string;
  content: React.ReactNode;
  closeButtonText?: string;
  closeButtonType?: ButtonProps['variant'];
  className?: string;
}

export default function AlertModal({
  title,
  content,
  closeButtonText = '확인',
  closeButtonType = 'primary',
  className,
  isOpen,
  close,
}: AlertModalProps) {
  const onClose = useCallback(
    (result: AlertModalResult) => () => {
      close({ result });
    },
    [close]
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose({ reason: 'overlay' })}>
      <Modal.Content className={className}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="typography-p3-16r whitespace-pre-wrap text-gray-700">{content}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={onClose({ reason: 'confirm' })}
            variant={closeButtonType}
            className="flex-1"
          >
            {closeButtonText}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
