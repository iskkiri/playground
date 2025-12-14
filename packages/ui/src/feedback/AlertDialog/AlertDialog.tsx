'use client';

import { useCallback } from 'react';
import Button, { type ButtonProps } from '../../general/Button/Button';
import Dialog from '../../overlay/Dialog/Dialog';
import { cn } from '@repo/utils/cn';
import { type OnInteractOutsideEvent } from '#src/overlay/Dialog/types/dialog.types';
import type { InjectedProps } from 'react-use-hook-modal';

type AlertDialogResult = {
  reason: 'confirm' | 'close';
};

export interface AlertDialogProps extends InjectedProps<AlertDialogResult> {
  title: string;
  content: React.ReactNode;
  closeButtonText?: string;
  closeButtonType?: ButtonProps['variant'];
  isPreventOutsideClick?: boolean;
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
  classNames,
  isOpen,
  close,
}: AlertDialogProps) {
  const onInteractOutside = useCallback((e: OnInteractOutsideEvent) => {
    e.preventDefault();
  }, []);

  const onClose = useCallback(
    (result: AlertDialogResult) => () => {
      close({ result });
    },
    [close]
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose({ reason: 'close' })}>
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
          <Dialog.Close asChild onClick={onClose({ reason: 'confirm' })}>
            <Button variant={closeButtonType} className="flex-1">
              {closeButtonText}
            </Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
