'use client';

import { cloneElement, isValidElement } from 'react';
import { cn } from '@repo/utils/cn';

interface ModalBodyProps extends React.ComponentProps<'div'> {
  asChild?: boolean;
}

export default function ModalBody({
  children,
  className,
  asChild = false,
  ...props
}: ModalBodyProps) {
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      ...(typeof children.props === 'object' ? children.props : {}),
    } as React.HTMLAttributes<HTMLElement>);
  }

  return (
    <div className={cn('modal__body', className)} {...props}>
      {children}
    </div>
  );
}
