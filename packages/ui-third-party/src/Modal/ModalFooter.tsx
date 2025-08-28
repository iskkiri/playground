'use client';

import { cloneElement, isValidElement } from 'react';
import { cn } from '@repo/utils/cn';

interface ModalFooterProps extends React.ComponentProps<'div'> {
  asChild?: boolean;
}

export default function ModalFooter({
  children,
  className,
  asChild = false,
  ...props
}: ModalFooterProps) {
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      ...(typeof children.props === 'object' ? children.props : {}),
    } as React.HTMLAttributes<HTMLElement>);
  }

  return (
    <div className={cn('modal__footer', className)} {...props}>
      {children}
    </div>
  );
}
