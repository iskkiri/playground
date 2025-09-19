'use client';

import { useCallback } from 'react';
import Button, { type ButtonProps } from '../../general/Button/Button';
import Dialog from '../../overlay/Dialog/Dialog';
import { cn } from '@repo/utils/cn';
import { useDialogDispatchContext } from '#src/overlay/Dialog/hooks/useDialogContext';
import { type OnInteractOutsideEvent } from '#src/overlay/Dialog/types/dialog.types';

export interface AlertModalProps {
  title: string;
  content: React.ReactNode;
  closeButtonText?: string;
  closeButtonType?: ButtonProps['variant'];
  isPreventOutsideClick?: boolean;
  onClose?: () => void;
  classNames?: {
    content?: string;
    header?: string;
    title?: string;
    description?: string;
    footer?: string;
  };
}

export default function AlertDialog({
  title,
  content,
  closeButtonText = '확인',
  closeButtonType = 'primary',
  isPreventOutsideClick = true,
  onClose,
  classNames,
}: AlertModalProps) {
  const { onClose: closeModal } = useDialogDispatchContext();

  const onInteractOutside = useCallback((e: OnInteractOutsideEvent) => {
    e.preventDefault();
  }, []);

  const handleClose = useCallback(() => {
    onClose?.();
    closeModal();
  }, [onClose, closeModal]);

  return (
    <Dialog.Content
      showCloseButton
      className={classNames?.content}
      onInteractOutside={isPreventOutsideClick ? onInteractOutside : undefined}
    >
      <Dialog.Header className={classNames?.header}>
        <Dialog.Title className={classNames?.title}>{title}</Dialog.Title>
      </Dialog.Header>

      <Dialog.Description
        className={cn(
          'typography-p3-16r whitespace-pre-wrap text-gray-700',
          classNames?.description
        )}
      >
        {content}
      </Dialog.Description>

      <Dialog.Footer className={classNames?.footer}>
        <Dialog.Close asChild onClick={handleClose}>
          <Button variant={closeButtonType} className="flex-1">
            {closeButtonText}
          </Button>
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog.Content>
  );
}
