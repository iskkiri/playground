'use client';

import { cloneElement, isValidElement } from 'react';
import { cn } from '@repo/utils/cn';

interface ModalHeaderProps extends React.ComponentProps<'div'> {
  asChild?: boolean;
}

export default function ModalHeader({
  children,
  className,
  asChild = false,
  ...props
}: ModalHeaderProps) {
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      ...(typeof children.props === 'object' ? children.props : {}),
    } as React.HTMLAttributes<HTMLElement>);
  }

  return (
    <div className={cn('modal__header', className)} {...props}>
      {children}
    </div>
  );
}
