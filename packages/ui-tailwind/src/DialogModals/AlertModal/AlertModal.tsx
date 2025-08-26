'use client';

import Modal from '@repo/ui-third-party/Modal/Modal';
import Button, { type ButtonProps } from '../../Button/Button';

export interface AlertModalProps {
  title: string;
  content: React.ReactNode;
  closeButtonText?: string;
  closeButtonType?: ButtonProps['variant'];
  className?: string;
}

export default function AlertModal({
  //
  title,
  content,
  closeButtonText = '확인',
  closeButtonType = 'primary',
  className,
}: AlertModalProps) {
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
          <Button variant={closeButtonType} className="flex-1">
            {closeButtonText}
          </Button>
        </Modal.CloseTrigger>
      </Modal.Footer>
    </Modal.Content>
  );
}
