'use client';

import { cloneElement, isValidElement, ElementType } from 'react';
import { cn } from '@repo/utils/cn';
import { AsProp } from '@repo/types/react';

type ModalBodyProps<T extends ElementType = 'div'> = AsProp<T> & {
  asChild?: boolean;
};

export default function ModalBody<T extends ElementType = 'div'>({
  children,
  className,
  asChild = false,
  as,
  ...props
}: ModalBodyProps<T>) {
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      ...(typeof children.props === 'object' ? children.props : {}),
    } as React.HTMLAttributes<HTMLElement>);
  }

  const Component = as || 'div';

  return (
    <Component className={cn('modal__body', className)} {...props}>
      {children}
    </Component>
  );
}
