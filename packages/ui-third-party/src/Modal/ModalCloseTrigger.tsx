import { cloneElement, isValidElement } from 'react';
import useModalContext from './hooks/useModalContext';
import { cn } from '@repo/utils/cn';

interface ModalCloseTriggerProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
}

export default function ModalCloseTrigger({
  children,
  asChild,
  className,
  ...props
}: ModalCloseTriggerProps) {
  const { onClose } = useModalContext();

  if (asChild && isValidElement(children)) {
    const buttonProps: React.ComponentProps<'button'> = {
      ...props,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        onClose();
        props.onClick?.(e);
      },
    };

    return cloneElement(children, buttonProps);
  }

  return (
    <button
      onClick={onClose}
      type="button"
      className={cn('modal__close-trigger', className)}
      {...props}
    >
      {children}
    </button>
  );
}
