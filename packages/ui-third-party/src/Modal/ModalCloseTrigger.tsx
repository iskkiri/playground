import { cloneElement, isValidElement, useCallback, ElementType } from 'react';
import { useModalDispatchContext } from './hooks/useModalContext';
import { cn } from '@repo/utils/cn';
import { AsProp } from '@repo/types/react';

type ModalCloseTriggerProps<T extends ElementType = 'button'> = AsProp<T> & {
  asChild?: boolean;
};

export default function ModalCloseTrigger<T extends ElementType = 'button'>({
  children,
  asChild,
  className,
  onClick,
  as,
  ...props
}: ModalCloseTriggerProps<T>) {
  const { onClose } = useModalDispatchContext();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClose();
      onClick?.(e);
    },
    [onClose, onClick]
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      ...(typeof children.props === 'object' ? children.props : {}),
      onClick: handleClick,
    } as React.HTMLAttributes<HTMLElement>);
  }

  const Component = as || 'button';

  return (
    <Component
      onClick={handleClick}
      type={Component === 'button' ? 'button' : undefined}
      className={cn('modal__close-trigger', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
