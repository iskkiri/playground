'use client';

import { useCallback } from 'react';
import Dialog from '../../overlay/Dialog/Dialog';
import Button, { type ButtonProps } from '../../general/Button/Button';
import { useDialogDispatchContext } from '#src/overlay/Dialog/hooks/useDialogContext';
import type { OnInteractOutsideEvent } from '#src/overlay/Dialog/types/dialog.types';
import { cn } from '@repo/utils/cn';

export interface ConfirmDialogProps {
  title: string;
  content: React.ReactNode;
  closeButtonText?: string;
  confirmButtonText?: string;
  confirmButtonType?: ButtonProps['variant'];
  isPreventOutsideClick?: boolean;
  onConfirm: () => void;
  classNames?: {
    content?: string;
    header?: string;
    title?: string;
    description?: string;
    footer?: string;
  };
}

export default function ConfirmDialog({
  //
  title,
  content,
  closeButtonText = '닫기',
  confirmButtonText = '확인',
  confirmButtonType = 'primary',
  isPreventOutsideClick = true,
  onConfirm,
  classNames,
}: ConfirmDialogProps) {
  const { onClose } = useDialogDispatchContext();

  const onInteractOutside = useCallback((e: OnInteractOutsideEvent) => {
    e.preventDefault();
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

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
        <Dialog.Close asChild onClick={onClose}>
          <Button variant="gray" className="flex-1">
            {closeButtonText}
          </Button>
        </Dialog.Close>

        <Button variant={confirmButtonType} onClick={handleConfirm} className="flex-1">
          {confirmButtonText}
        </Button>
      </Dialog.Footer>
    </Dialog.Content>
  );
}
