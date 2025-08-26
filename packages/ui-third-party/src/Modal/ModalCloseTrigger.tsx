import { cloneElement, isValidElement, useCallback } from 'react';
import useModalContext from './hooks/useModalContext';
import { cn } from '@repo/utils/cn';

interface ModalCloseTriggerProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
}

export default function ModalCloseTrigger({
  children,
  asChild,
  className,
  onClick,
  ...props
}: ModalCloseTriggerProps) {
  const { onClose } = useModalContext();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClose();
      onClick?.(e);
    },
    [onClose, onClick]
  );

  if (asChild && isValidElement(children)) {
    const buttonProps: React.ComponentProps<'button'> = {
      ...props,
      onClick: handleClick,
    };

    return cloneElement(children, buttonProps);
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className={cn('modal__close-trigger', className)}
      {...props}
    >
      {children}
    </button>
  );
}
