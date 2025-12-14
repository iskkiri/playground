'use client';

import { useCallback } from 'react';
import Dialog from '../../overlay/Dialog/Dialog';
import Button, { type ButtonProps } from '../../general/Button/Button';
import type { OnInteractOutsideEvent } from '#src/overlay/Dialog/types/dialog.types';
import { cn } from '@repo/utils/cn';
import type { InjectedProps } from 'react-use-hook-modal';

type ConfirmDialogResult = {
  confirmed: boolean;
};

export interface ConfirmDialogProps extends InjectedProps<ConfirmDialogResult> {
  title: string;
  content: React.ReactNode;
  closeButtonText?: string;
  confirmButtonText?: string;
  confirmButtonType?: ButtonProps['variant'];
  isPreventOutsideClick?: boolean;
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
  classNames,
  isOpen,
  close,
}: ConfirmDialogProps) {
  const onInteractOutside = useCallback((e: OnInteractOutsideEvent) => {
    e.preventDefault();
  }, []);

  const onClose = useCallback(
    (result: ConfirmDialogResult) => () => {
      close({ result });
    },
    [close]
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose({ confirmed: false })}>
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
          <Dialog.Close asChild onClick={onClose({ confirmed: false })}>
            <Button variant="gray" className="flex-1">
              {closeButtonText}
            </Button>
          </Dialog.Close>

          <Button
            variant={confirmButtonType}
            onClick={onClose({ confirmed: true })}
            className="flex-1"
          >
            {confirmButtonText}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
