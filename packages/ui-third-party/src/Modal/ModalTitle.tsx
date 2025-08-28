'use client';

import { cloneElement, isValidElement } from 'react';
import { cn } from '@repo/utils/cn';

interface ModalTitleProps extends React.ComponentProps<'h2'> {
  asChild?: boolean;
}

export default function ModalTitle({
  children,
  className,
  asChild = false,
  ...props
}: ModalTitleProps) {
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      ...(typeof children.props === 'object' ? children.props : {}),
    } as React.HTMLAttributes<HTMLElement>);
  }

  return (
    <h2 className={cn('modal__title', className)} {...props}>
      {children}
    </h2>
  );
}
