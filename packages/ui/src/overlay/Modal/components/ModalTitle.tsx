'use client';

import { cloneElement, isValidElement, ElementType } from 'react';
import { cn } from '@repo/utils/cn';
import { AsProp } from '@repo/types/react';

type ModalTitleProps<T extends ElementType = 'h2'> = AsProp<T> & {
  asChild?: boolean;
};

export default function ModalTitle<T extends ElementType = 'h2'>({
  children,
  className,
  asChild = false,
  as,
  ...props
}: ModalTitleProps<T>) {
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      ...(typeof children.props === 'object' ? children.props : {}),
    } as React.HTMLAttributes<HTMLElement>);
  }

  const Component = as || 'h2';

  return (
    <Component className={cn('typography-p2-18b', className)} {...props}>
      {children}
    </Component>
  );
}
